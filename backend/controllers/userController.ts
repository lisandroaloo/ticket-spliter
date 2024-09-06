import prisma from '../models/prismaClient'

export const getUsersByProjectId = async (req: any, res: any) => {
  try {
    const { prId } = req.params
    
    const users = await prisma.usuarioXProyecto.findMany({
      where: {
        uxp_pr_id: +prId
      },
    })

    res.json(users)
  } catch (error: any) {
    console.error('Error getUsersByProjectId controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}