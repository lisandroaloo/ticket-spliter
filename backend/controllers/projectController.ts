import prisma from '../models/prismaClient'

export const getProjects = async (req: any, res: any) => {
  try {
    const { userId: us_email } = req.params

    const projects = await prisma.proyecto.findMany({
      where: {
        UsuarioXProyecto: {
          some: { uxp_us_id: us_email },
        },
      },
      select: {
        pr_id: true,
        pr_nombre: true,
        pr_descripcion: true,
      },
    })

    res.json(projects)
  } catch (error: any) {
    console.error('Error getProjects controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectByIDDeep = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const project = await prisma.proyecto.findUnique({
      where: {
        pr_id: +prId,
      },
      select: {
        pr_id: true,
        pr_nombre: true,
        pr_descripcion: true,
        UsuarioXProyecto: {
          select: {
            Usuario: {
              select: {
                us_nombre: true,
              },
            },
            uxp_porcentaje: true,
          },
        },
        Ticket: {
          select: {
            ti_us_id: true,
            ti_descripcion: true,
            ti_fecha: true,
            ti_id: true,
            ti_monto: true,
            ti_pr_id: true,
            Usuario: {
              select: {
                us_nombre: true,
              },
            },
          },
        },
      },
    })

    const montoTotal = project?.Ticket.reduce((sum, ticket) => sum + ticket.ti_monto, 0)
    
    const projectWithTotal = {
      ...project,
      montoTotal
    }

    res.json(projectWithTotal)
  } catch (error: any) {
    console.error('Error getProjectDeep controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const createProject = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, pr_nombre, pr_descripcion } = req.body

    const project = await prisma.proyecto.create({
      data: {
        pr_id: pr_id,
        pr_nombre: pr_nombre,
        pr_descripcion: pr_descripcion,
        UsuarioXProyecto: {
          create: {
            uxp_us_id: us_email,
            uxp_porcentaje: 100,
          },
        },
      },
    })

    res.json(project)
  } catch (error: any) {
    console.error('Error createProject controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const editProject = async (req: any, res: any) => {
  try {
    const { pr_id, pr_nombre, pr_descripcion } = req.body

    const project = await prisma.proyecto.update({
      where: { pr_id },
      data: {
        pr_id: pr_id,
        pr_nombre: pr_nombre,
        pr_descripcion: pr_descripcion,
      },
    })

    res.json(project)
  } catch (error: any) {
    console.error('Error editProject controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const addUserToProject = async (req: any, res: any) => {
  try {
    const { us_email } = req.body
    const { prId } = req.params

    const totalPercentage = await prisma.usuarioXProyecto.aggregate({
      where: { uxp_pr_id: +prId },
      _sum: {
        uxp_porcentaje: true,
      },
    })

    const uxp = await prisma.usuarioXProyecto.create({
      data: {
        uxp_us_id: us_email,
        uxp_pr_id: +prId,
        uxp_porcentaje: 100 - (totalPercentage._sum.uxp_porcentaje || 0),
      },
    })

    res.json(uxp)
  } catch (error: any) {
    console.error('Error addUserToProject controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}
