import prisma from "../models/prismaClient"

export const getPagosByEmisor = async (req: any, res: any) => {
  try {
    const { usId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_us_emisor_id: usId,
      },
      include: {
       Receptor:{
        select:{
          us_nombre:true
        }
       }
      },
    })

    res.json(pagos)
  } catch (error: any) {
    console.error('Error getPagosByEmisor controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getPagosByReceptor = async (req: any, res: any) => {
  try {
    const { usId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_us_receptor_id: usId,
      },
      include: {
        Emisor: {
          select: {
            us_nombre: true,
          },
        },
      },
    })

    res.json(pagos)
  } catch (error: any) {
    console.error('Error getPagosByReceptor controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getPagosByProyectoId = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_pr_id: +prId,
      },
      include: {
        Emisor: true,
        Receptor: true
      }
    })

    res.json(pagos)
  } catch (error: any) {
    console.error('Error getPagosByProyectoId controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const setPagoAsSent = async (req: any, res: any) => {
  try {
    const { paId } = req.params

    const pago = await prisma.pago.update({where:{pa_id: +paId},data:{pa_isEnviado: true}})

    res.json(pago)
  } catch (error: any) {
    console.error('Error setPagoAsSent controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const setPagoAsRecieved = async (req: any, res: any) => {
  try {
    const { paId } = req.params

    const pago = await prisma.pago.update({ where: { pa_id: +paId }, data: { pa_isRecibido: true } })

    res.json(pago)
  } catch (error: any) {
    console.error('Error setPagoAsRecieved controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


