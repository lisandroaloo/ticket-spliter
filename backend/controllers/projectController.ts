
import { log } from 'console'
import prisma from '../models/prismaClient'

import { sendMail } from "../services/mail"



// ==============================
// SERVICIO DE LISTA DE PROYECTOS
// ==============================

export const getProjects = async (req: any, res: any) => {
  try {
    const { userId: us_email } = req.params


    // Trae los proyectos del usuario loggeadoo
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
        pr_abierto:true
      },
    })

    res.json(projects)
  } catch (error: any) {
    console.error('Error getProjects controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


// ===============================
// SERVICIO DE CERRADO DE PROYECTO
// ===============================

export const closeProject = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    // Cambio de estado del proyecto
    const updatedProject = await prisma.proyecto.update({
      where: {
        pr_id: +prId,
      },
      data: {
        pr_abierto: false,
      },
    })

    // 1. Obtener los tickets del proyecto junto con los usuarios relacionados y sus porcentajes
    const ticketsConUsuarios = await prisma.ticket.findMany({
      where: { ti_pr_id: +prId },
      include: {
        UsuarioXTicket: {
          select: {
            Usuario: {
              select: { us_nombre: true, us_email: true },
            },
            uxt_porcentaje: true,
          },
        },
      },
    });

    // 2. Calcular la contribución esperada de cada usuario según su porcentaje por ticket
    const contribuciones: { [email: string]: number } = {};

    ticketsConUsuarios.forEach((ticket) => {
      ticket.UsuarioXTicket.forEach((uxt) => {
        const contribucion = (ticket.ti_monto * uxt.uxt_porcentaje) / 100;
        contribuciones[uxt.Usuario.us_email] =
          (contribuciones[uxt.Usuario.us_email] || 0) - contribucion; // Monto esperado negativo
      });
    });

    // 3. Calcular cuánto ha contribuido cada usuario directamente con tickets
    ticketsConUsuarios.forEach((ticket) => {
      const usuarioCreador = ticket.ti_us_id;
      contribuciones[usuarioCreador] =
        (contribuciones[usuarioCreador] || 0) + ticket.ti_monto; // Suma su contribución real
    });

    // 4. Separar usuarios que deben pagar y los que deben recibir
    const deudores: any[] = [];
    const acreedores: any[] = [];

    Object.entries(contribuciones).forEach(([email, saldo]) => {
      if (saldo < 0) {
        deudores.push({ email, saldo: Math.abs(saldo) }); // Saldo negativo, debe pagar
      } else if (saldo > 0) {
        acreedores.push({ email, saldo }); // Saldo positivo, debe recibir
      }
    });

   // 5. Crear los pagos necesarios en la base de datos
const pagosCreados: any[] = [];

for (const deudor of deudores) {
  for (const acreedor of acreedores) {
    if (deudor.saldo === 0) break;

    const monto = Math.min(deudor.saldo, acreedor.saldo);

    // Solo crear el pago si el monto es mayor que 0
    if (monto > 0) {
      // Crear el registro de pago en la base de datos
      const nuevoPago = await prisma.pago.create({
        data: {
          pa_us_emisor_id: deudor.email,
          pa_us_receptor_id: acreedor.email,
          pa_monto: monto,
          pa_fecha: new Date(),
          pa_pr_id: +prId,
          pa_isEnviado: false,
          pa_isRecibido: false,
        },
      });

      pagosCreados.push(nuevoPago);

      deudor.saldo -= monto;
      acreedor.saldo -= monto;
    }
  }
}



    res.json(

      updatedProject,
    )
  } catch (error: any) {
    console.error('Error in closeProject controller', error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


// ===============================
// SERVICIO DE DETALLE DE PROYECTO
// ===============================


export const getProjectDetail = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    // Trae el proyecto que coincide con el id 
    const project = await prisma.proyecto.findUnique({
      where: {
        pr_id: +prId,
      },
      select: {
        pr_id: true,
        pr_nombre: true,
        pr_descripcion: true,
        pr_abierto: true
      },
    })

    res.json(project)
  } catch (error: any) {
    console.error('Error getProjectDetail controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


// ================================
// SERVICIO DE USUARIOS DE PROYECTO
// ================================

export const getProjectUsers = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    // Trae los usuarios del proyecto
    const uxp = await prisma.usuarioXProyecto.findMany({
      where: {
        uxp_pr_id: +prId,
      },
      select: {

        Usuario: true
      }
    })

    res.json(uxp)
  } catch (error: any) {
    console.error('Error getProjectUsers controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

// ===============================
// SERVICIO DE TICKETS DE PROYECTO
// ===============================

export const getProjectTickets = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    // Trae los tickets del proyecto
    const tickets = await prisma.ticket.findMany({
      where: {
        ti_pr_id: +prId,
      },
      include: {
        Usuario: true,
        UsuarioXTicket: {
          select: {
            uxt_porcentaje: true,
            Usuario: true,
          },
        },
      },
    })

    // Calcula el monto total de los tickets del proyecto
    const montoTotal = tickets?.reduce((sum, ticket) => sum + ticket.ti_monto, 0)

    const ticketsYTotal = {
      Ticket: [...tickets],
      montoTotal,
    }

    res.json(ticketsYTotal)
  } catch (error: any) {
    console.error('Error getProjectTickets controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}



// ==================================================
// SERVICIO DE USUARIOS QUE NO PERTENECEN AL PROYECTO
// ==================================================

export const getUsersNotInProject = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    // Trae los usuarios que no pertenecen al proyecto
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

// ================================
// SERVICIO DE CREACION DE PROYECTO
// ================================

export const createProject = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, pr_nombre, pr_descripcion } = req.body


    // Creacion de proyecto
    const project = await prisma.proyecto.create({
      data: {
        pr_id: pr_id,
        pr_nombre: pr_nombre,
        pr_descripcion: pr_descripcion,
        UsuarioXProyecto: {
          create: {
            uxp_us_id: us_email,

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


// ===============================
// SERVICIO DE EDICION DE PROYECTO
// ===============================

export const editProject = async (req: any, res: any) => {
  try {
    const { pr_id, pr_nombre, pr_descripcion } = req.body

    // Edicion de proyecto
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


// ===========================================
// SERVICIO DE AGREGADO DE USUARIO AL PROYECTO
// ===========================================

export const addUserToProject = async (req: any, res: any) => {
  try {
    const { us_email } = req.body;
    const { prId } = req.params;

    // Crea el usuario_x_proyecto
    const uxp = await prisma.usuarioXProyecto.create({
      data: {
        uxp_us_id: us_email,
        uxp_pr_id: +prId,
      },
    });

    // Enviar un correo al usuario añadido al proyecto
    await sendMail({
      email: us_email,
      subject: "Te han añadido a un nuevo proyecto",
      htmlTemplate: `Hola, has sido añadido al proyecto ${prId}`,
    });

    res.json(uxp);
  } catch (error: any) {
    console.error('Error addUserToProject controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ===============================================
// SERVICIO DE ELIMINADO DE USUARIO DE UN PROYECTO
// ===============================================

export const deleteUserFromProject = async (req: any, res: any) => {
  try {
    const { us_email } = req.body;
    const { prId } = req.params;

    // Elimina el usuario_x_proyecto
    const deleted = await prisma.usuarioXProyecto.deleteMany({
      where: {
        uxp_us_id: us_email,
        uxp_pr_id: +prId,   
      },
    });
    

    // Enviar un correo al usuario eliminado del proyecto
    await sendMail({
      email: us_email,
      subject: "Se te ha eliminado de un proyecto",
      htmlTemplate: `Hola, has sido eliminado del proyecto ${prId}`,
    });

    res.json(deleted);
  } catch (error: any) {
    console.error('Error deleteUserFromProject controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

