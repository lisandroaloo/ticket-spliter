import prisma from '../models/prismaClient'
import bcrypt from "bcryptjs";

// ===============================
// SERVICIO DE USUARIOS X PROYECTO
// ===============================

export const getUsersByProjectId = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    // Trae los usuarios_x_proyecto pertenecientes al proyecto
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

// ============================================
// SERVICIO DE GASTADO POR USUARIO POR PROYECTO
// ============================================

export const getSpentByProjectId = async (req: any, res: any) => {
  try {
    const { prId } = req.params
    const { us_email} = req.body

    // Trae los tickets del usuario para el proyecto seleccionado
    const tickets = await prisma.ticket.findMany({
      where: {
        ti_pr_id: +prId,
        ti_us_id: us_email
      },
    })

    // Calcula el monto total de los tickets
     const montoTotal = tickets.reduce((sum, ticket) => sum + ticket.ti_monto, 0)

    res.json(montoTotal)
  } catch (error: any) {
    console.error('Error getSpentByProjectId controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


// =============================
// SERVICIO DE USUARIO POR US_ID
// =============================

export const getUserById = async (req: any, res: any) => {
  try {
    const { usId } = req.params;


    // Trae el usuario que coincide con el us_id
    const user = await prisma.usuario.findUnique({
      where: {
        us_email: usId
      },
      select: {
        us_email: true,
        us_nombre: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error: any) {
    console.error('Error getUserById controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// ==============================
// SERVICIO DE EDICION DE USUARIO
// ==============================

export const editUser = async (req: any, res: any) => {
  try {
    const { us_nombre, us_email, us_password } = req.body

    if (!us_password) {
      // Si la edicion no incluye edicion de contraseña
      const user = await prisma.usuario.update({
        where: { us_email },
        data: {
          us_email: us_email,
          us_nombre: us_nombre,
          
        }
      })
      res.json(user)
    }
    else {
      // Si la edicion incluye edicion de contraseña
      // Hasheo de la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(us_password, salt);

      const user = await prisma.usuario.update({
        where: { us_email },
        data: {
          us_email: us_email,
          us_nombre: us_nombre,
          us_password: hashedPassword
        }
      })
      res.json(user)
    }




  } catch (error: any) {
    console.error('Error editProyect controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}
