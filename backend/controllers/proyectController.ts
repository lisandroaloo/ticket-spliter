import prisma from '../models/prismaClient'

export const getProyects = async (req: any, res: any) => {
  try {
    const { us_email } = req.params.userId

    const proyects = await prisma.proyecto.findMany({
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

    res.json(proyects)
  } catch (error: any) {
    console.error('Error getProyects controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const createProyect = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, pr_nombre, pr_descripcion } = req.body

    const proyect = await prisma.proyecto.create({
      data: {
        pr_id: pr_id,
        pr_nombre: pr_nombre,
        pr_descripcion: pr_descripcion,
        UsuarioXProyecto: {
          create: {
            uxp_us_id: us_email,
            uxp_porcentaje: 100
          }
        }
      }
    })

    res.json(proyect)
  } catch (error: any) {
    console.error('Error createProyect controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}