import prisma from "../models/prismaClient"

export const getPagosByEmisor = async (req: any, res: any) => {
  try {
    const { usId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_us_emisor_id: usId,
      },
      include: {
       receptor:{
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
        emisor: {
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

export const createPago = async (req: any, res: any) => {
  try {
    const { prId} = req.params
    const { emisor_us_email,receptor_us_email, pa_monto, pa_fecha} = req.body
    
    const pago = await prisma.pago.create({
      data: {
        pa_estado: "Pago",
        pa_fecha: pa_fecha,
        pa_us_emisor_id: emisor_us_email,
        pa_us_receptor_id: receptor_us_email,
        pa_monto: +pa_monto,
        pa_pr_id: +prId
      },
    })
    
    res.json(pago)
  } catch (error: any) {
    console.error('Error createPago controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getSaldoPagosByProjectId = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_pr_id: +prId,
      },
      select: {
        pa_monto: true,
        pa_us_emisor_id: true,
        pa_us_receptor_id: true,
      },
    })

    // Crear un mapa para almacenar los montos por usuario
    const balances = new Map<string, number>()

    pagos.forEach((pago) => {
      const { pa_monto, pa_us_emisor_id, pa_us_receptor_id } = pago

      // Restar el monto al usuario que envía (emisor)
      if (balances.has(pa_us_emisor_id)) {
        balances.set(pa_us_emisor_id, balances.get(pa_us_emisor_id)! + pa_monto)
      } else {
        balances.set(pa_us_emisor_id, pa_monto)
      }

      // Sumar el monto al usuario que recibe (receptor)
      if (balances.has(pa_us_receptor_id)) {
        balances.set(pa_us_receptor_id, balances.get(pa_us_receptor_id)! - pa_monto)
      } else {
        balances.set(pa_us_receptor_id, -pa_monto)
      }
    })

    const saldos = Object.fromEntries(balances)

    res.json(saldos)
  } catch (error: any) {
    console.error('Error getSaldoPagosByProjectId controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}