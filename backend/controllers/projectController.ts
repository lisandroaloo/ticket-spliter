import { log } from 'console'
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
                us_email: true
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
        Pago: {
          include: {
            emisor:true,
            receptor:true
          }
        }
      },
    })

    const usersNotInProject = await prisma.usuario.findMany({
      where: {
        UsuarioXProyecto: {
          none: { uxp_pr_id: +prId },
        },
      },
      select: {
        us_nombre: true,
        us_email: true,
      },
    })

    const montoTotal = project?.Ticket.reduce((sum, ticket) => sum + ticket.ti_monto, 0)

    const projectWithTotal = {
      ...project,
      usersNotInProject,
      montoTotal
    }

    res.json(projectWithTotal)
  } catch (error: any) {
    console.error('Error getProjectDeep controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectDetail = async (req: any, res: any) => {
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
      },
    })

    res.json(project)
  } catch (error: any) {
    console.error('Error getProjectDetail controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectUsers = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const uxp = await prisma.usuarioXProyecto.findMany({
      where: {
        uxp_pr_id: +prId,
      },
      select: {
        uxp_porcentaje: true,
        Usuario:true
      }
    })

    res.json(uxp)
  } catch (error: any) {
    console.error('Error getProjectUsers controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectTickets = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const tickets = await prisma.ticket.findMany({
      where: {
        ti_pr_id: +prId,
      },
      include: {
        Usuario: true,
      },
    })

    const montoTotal = tickets?.reduce((sum, ticket) => sum + ticket.ti_monto, 0)

    const ticketsYTotal = {
      ...tickets,
      montoTotal
    }

    res.json(ticketsYTotal)
  } catch (error: any) {
    console.error('Error getProjectTickets controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectPagos = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_pr_id: +prId,
      },
      include: {
        emisor:true,
        receptor:true
      }
    })

    res.json(pagos)
  } catch (error: any) {
    console.error('Error getProjectPagos controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getUsersNotInProject = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const usersNotInProject = await prisma.usuario.findMany({
      where: {
        UsuarioXProyecto: {
          none: { uxp_pr_id: +prId },
        },
      },
      select: {
        us_nombre: true,
        us_email: true,
      },
    })

    res.json(usersNotInProject)
  } catch (error: any) {
    console.error('Error getUsersNotInProject controller', error.message)
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

export const editProjectPercentages = async (req: any, res: any) => {
  try {
    const usuariosProyectos = req.body;
    const { prId } = req.params

    let totalPercentage = 0;

    for (let i = 0; i < usuariosProyectos.length; i++) {
      totalPercentage += usuariosProyectos[i].uxp_porcentaje;
    }


    if (totalPercentage > 100) {
      throw new Error('La suma de los porcentajes no debe exceder el 100%');
    }


    const updatedProjects = await Promise.all(
      usuariosProyectos.map(async (uxp: any) => {
        const { us_email: uxp_us_id, uxp_porcentaje } = uxp;

        return await prisma.usuarioXProyecto.update({
          where: {
            uxp_us_id_uxp_pr_id: {
              uxp_us_id: uxp_us_id,
              uxp_pr_id: +prId
            },
          },
          data: {
            uxp_porcentaje: uxp_porcentaje,  // El nuevo porcentaje específico para ese usuario
          },
        });
      })
    );

    res.json(updatedProjects);
  } catch (error: any) {
    console.error('Error editProjectPercentages controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
