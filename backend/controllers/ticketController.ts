import prisma from '../models/prismaClient'
import { sendMail } from '../services/mail'



// ========================================
// SERVICIO DE CREACION / EDICION DE TICKET
// ========================================

export const createTicket = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, ti_monto, ti_descripcion, ti_fecha, ti_image_url, userPercentage, ti_id } = req.body

    // Dependiendo si recibe un id edita o crea un ticket
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

    // Dependiendo si recibe un id edita o crea los porcentajes
    const usuariosConPorcentajePromises = userPercentage.map(async (usuario: any) => {
      ti_id
        ? await prisma.usuarioXTicket.update({
          where: {
            uxt_us_id_uxt_ti_id: {
              uxt_us_id: usuario.us_email,
              uxt_ti_id: ticket.ti_id,
            },
          },
          data: {
            uxt_porcentaje: +usuario.percentage,
          },
        })
        : await prisma.usuarioXTicket.create({
          data: {
            uxt_us_id: usuario.us_email,
            uxt_ti_id: ticket.ti_id,
            uxt_porcentaje: +usuario.percentage,
          },
        })
    })

    // Listado de usuarios en el proyecto para enviarles mails
    const usuariosEnElProyecto = await prisma.usuario.findMany({
      where: {
        UsuarioXProyecto: {
          some: {
            uxp_pr_id: +pr_id,
          },
        },
      },
    })

    const _proyecto = await prisma.proyecto.findUnique({ where: { pr_id: +pr_id }, select: { pr_nombre: true } })

    // Envio de mails
    ti_id
      ? usuariosEnElProyecto.forEach((us) => {
        sendMail({
          email: us.us_email,
          subject: `Se edito un ticket en el proyecto ${_proyecto!.pr_nombre}`,
          htmlTemplate: `Hola, se edito el ticket ${ti_id} en el proyecto ${_proyecto!.pr_nombre}`,
        })
      })
      : usuariosEnElProyecto.forEach((us) => {
        sendMail({
          email: us.us_email,
          subject: `Se añadio un ticket en el proyecto ${_proyecto!.pr_nombre}`,
          htmlTemplate: `Hola, se añadio un ticket de $${ti_monto} en el proyecto ${_proyecto!.pr_nombre}`,
        })
      })

    await Promise.all(usuariosConPorcentajePromises)

    res.json(ticket)
  } catch (error: any) {
    console.error('Error createTicket controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}



// ===============================
// SERVICIO DE TICKETS POR USUARIO
// ===============================

export const getTicketsByUserId = async (req: any, res: any) => {
  try {
    const { usId } = req.params

    // Trae los tickets del usuario
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


// ===============================
// SERVICIO DE TICKETS EQUITATIVOS
// ===============================

export const setEqualPercentages = async (req: any, res: any) => {
  try {
    const {userPercentage, ti_id} = req.body

    userPercentage.map(async (usuario: any) => {
      await prisma.usuarioXTicket.update({
        where: {
          uxt_us_id_uxt_ti_id: {
            uxt_us_id: usuario.us_email,
            uxt_ti_id: ti_id,
          },
        },
        data: {
          uxt_porcentaje: +usuario.percentage,
        },
      })

    })

  } catch (error: any) {
    console.error('Error getTicketsByUsId controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
} 
