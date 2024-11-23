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


