import prisma from "../models/prismaClient"

export const createTicket = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, ti_monto, ti_descripcion,ti_fecha } = req.body

    const ticket = await prisma.ticket.create({
      data: {
        ti_us_id: us_email,
        ti_pr_id: +pr_id,
        ti_monto: +ti_monto,
        ti_descripcion: ti_descripcion,
        ti_fecha: ti_fecha
      },
    })

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