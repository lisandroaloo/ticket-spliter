import prisma from '../models/prismaClient'
import { sendMail } from '../services/mail'

export const createTicket = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, ti_monto, ti_descripcion, ti_fecha, ti_image_url, userPercentage, ti_id } = req.body

    const ticket = ti_id
      ? await prisma.ticket.update({
          where: {
            ti_id,
          },
          data: {
            ti_us_id: us_email,
            ti_pr_id: +pr_id,
            ti_monto: +ti_monto,
            ti_descripcion: ti_descripcion,
            ti_fecha: ti_fecha,
            ti_image_url: ti_image_url,
          },
        })
      : await prisma.ticket.create({
          data: {
            ti_us_id: us_email,
            ti_pr_id: +pr_id,
            ti_monto: +ti_monto,
            ti_descripcion: ti_descripcion,
            ti_fecha: ti_fecha,
            ti_image_url: ti_image_url,
          },
        })

    const usuariosConPorcentajePromises = userPercentage.map(async (usuario: any) => {
      ti_id
        ? await prisma.usuarioXTicket.update({
            where: {
              uxt_us_id_uxt_ti_id: {
                uxt_us_id: usuario.us_email, // Asumiendo que `us_email` es el identificador de usuario
                uxt_ti_id: ticket.ti_id, // El ID del ticket recién creado
              },
            },
            data: {
              uxt_porcentaje: +usuario.percentage, // El porcentaje que debe pagar este usuario
            },
          })
        : await prisma.usuarioXTicket.create({
            data: {
              uxt_us_id: usuario.us_email, // Asumiendo que `us_email` es el identificador de usuario
              uxt_ti_id: ticket.ti_id, // El ID del ticket recién creado
              uxt_porcentaje: +usuario.percentage, // El porcentaje que debe pagar este usuario
            },
          })
    })

    const usuariosEnElProyecto = await prisma.usuario.findMany(
      {
        where: {
          UsuarioXProyecto: {
            some: {
              uxp_pr_id: +pr_id
            }
          }
        }
      }
    )

    const _proyecto = await prisma.proyecto.findUnique({where: {pr_id: +pr_id}, select:{pr_nombre: true}})

    ti_id
      ? usuariosEnElProyecto.forEach((us) => {
          sendMail({
            email: us.us_email,
            subject: `Se edito un ticket en el proyecto ${_proyecto!.pr_nombre}`,
            htmlTemplate: `Hola, se edito el ticket ${ti_id} en el proyecto ${_proyecto!.pr_nombre}`,
          })
        })
      : usuariosEnElProyecto.forEach((us) => {sendMail({
          email: us.us_email,
          subject: `Se añadio un ticket en el proyecto ${_proyecto!.pr_nombre}`,
          htmlTemplate: `Hola, se añadio un ticket de $${ti_monto} en el proyecto ${_proyecto!.pr_nombre}`,
        })})

    await Promise.all(usuariosConPorcentajePromises)

    res.json(ticket)
  } catch (error: any) {
    console.error('Error createTicket controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getTicketsByUserId = async (req: any, res: any) => {
  try {
    const { usId } = req.params

    const tickets = await prisma.ticket.findMany({
      where: {
        ti_us_id: usId,
      },
    })

    res.json(tickets)
  } catch (error: any) {
    console.error('Error getTicketsByUsId controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}
