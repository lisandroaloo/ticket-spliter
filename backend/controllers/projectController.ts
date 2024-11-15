
import { log } from 'console'
import prisma from '../models/prismaClient'

import { sendMail } from "../services/mail"

export const getProjects = async (req: any, res: any) => {
  try {
    const { userId: us_email } = req.params

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
      },
    })

    res.json(projects)
  } catch (error: any) {
    console.error('Error getProjects controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectDetail = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const project = await prisma.proyecto.findUnique({
      where: {
        pr_id: +prId,
      },
      select: {
        pr_id: true,
        pr_nombre: true,
        pr_descripcion: true,
      },
    })

    res.json(project)
  } catch (error: any) {
    console.error('Error getProjectDetail controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectUsers = async (req: any, res: any) => {
  try {
    const { prId } = req.params

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

export const getProjectTickets = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const tickets = await prisma.ticket.findMany({
      where: {
        ti_pr_id: +prId,
      },
      include: {
        Usuario: true,
      },
    })

    const montoTotal = tickets?.reduce((sum, ticket) => sum + ticket.ti_monto, 0)

    const ticketsYTotal = {
      Ticket: [...tickets],
      montoTotal
    }

    res.json(ticketsYTotal)
  } catch (error: any) {
    console.error('Error getProjectTickets controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getProjectPagos = async (req: any, res: any) => {
  try {
    const { prId } = req.params

    const pagos = await prisma.pago.findMany({
      where: {
        pa_pr_id: +prId,
      },
      include: {
        emisor: true,
        receptor: true
      }
    })

    res.json(pagos)
  } catch (error: any) {
    console.error('Error getProjectPagos controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const getUsersNotInProject = async (req: any, res: any) => {
  try {
    const { prId } = req.params

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

export const createProject = async (req: any, res: any) => {
  try {
    const { us_email, pr_id, pr_nombre, pr_descripcion } = req.body

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

export const editProject = async (req: any, res: any) => {
  try {
    const { pr_id, pr_nombre, pr_descripcion } = req.body

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

export const addUserToProject = async (req: any, res: any) => {
  try {
    const { us_email } = req.body;
    const { prId } = req.params;

    // Crea la entrada en UsuarioXProyecto sin asignar un porcentaje
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


// export const editProjectPercentages = async (req: any, res: any) => {
//   try {
//     const usuariosProyectos = req.body;
//     const { prId } = req.params

//     let totalPercentage = 0;

//     for (let i = 0; i < usuariosProyectos.length; i++) {
//       totalPercentage += usuariosProyectos[i].uxp_porcentaje;
//     }


//     if (totalPercentage > 100) {
//       throw new Error('La suma de los porcentajes no debe exceder el 100%');
//     }


//     const updatedProjects = await Promise.all(
//       usuariosProyectos.map(async (uxp: any) => {
//         const { us_email: uxp_us_id, uxp_porcentaje } = uxp;

//         return await prisma.usuarioXProyecto.update({
//           where: {
//             uxp_us_id_uxp_pr_id: {
//               uxp_us_id: uxp_us_id,
//               uxp_pr_id: +prId
//             },
//           },
//           data: {
//             uxp_porcentaje: uxp_porcentaje,  // El nuevo porcentaje específico para ese usuario
//           },
//         });
//       })
//     );

//     res.json(updatedProjects);
//   } catch (error: any) {
//     console.error('Error editProjectPercentages controller', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// export const generateDetailedPaymentPlan = async (req: any, res: any) => {
//   try {
//     const { prId } = req.params;

//     // 1. Obtener los usuarios del proyecto con sus porcentajes y calcular contribuciones esperadas
//     const usuariosConPorcentajes = await prisma.usuarioXProyecto.findMany({
//       where: { uxp_pr_id: +prId },
//       select: {
//         Usuario: {
//           select: { us_nombre: true, us_email: true },
//         },
//         uxp_porcentaje: true,
//       },
//     });

//     // 2. Calcular el monto total del proyecto sumando los montos de los tickets
//     const tickets = await prisma.ticket.findMany({
//       where: { ti_pr_id: +prId },
//       select: {
//         ti_monto: true,
//         ti_us_id: true
//       },
//     });
//     const montoTotal = tickets.reduce((sum, ticket) => sum + ticket.ti_monto, 0);

//     // 3. Definir cuánto debería pagar cada usuario según su porcentaje
//     const contribuciones = usuariosConPorcentajes.map((uxp) => ({
//       usuario: uxp.Usuario,
//       montoEsperado: Math.floor((montoTotal * uxp.uxp_porcentaje) / 100),
//     }));

//     // 4. Obtener los pagos ya realizados entre los usuarios
//     const pagosRealizados = await prisma.pago.findMany({
//       where: { pa_pr_id: +prId },
//       select: {
//         pa_monto: true,
//         emisor: { select: { us_email: true, us_nombre: true } },
//         receptor: { select: { us_email: true, us_nombre: true } },
//       },
//     });

//     // 5. Calcular el saldo final de cada usuario teniendo en cuenta pagos y contribución esperada
//     const saldoUsuarios: { [email: string]: number } = {};
//     contribuciones.forEach((contrib) => {
//       saldoUsuarios[contrib.usuario.us_email] = -contrib.montoEsperado;
//     });

//     tickets.forEach((ticket) => {
//       saldoUsuarios[ticket.ti_us_id] += ticket.ti_monto
//     })


//     pagosRealizados.forEach((pago) => {
//       saldoUsuarios[pago.receptor.us_email] -= pago.pa_monto; // Reduce el saldo del emisor
//       saldoUsuarios[pago.emisor.us_email] += pago.pa_monto; // Aumenta el saldo del receptor
//     });

//     // 6. Separar usuarios que deben pagar y los que deben recibir
//     const deudores: any[] = [];
//     const acreedores: any[] = [];

//     Object.entries(saldoUsuarios).forEach(([email, saldo]) => {
//       if (saldo < 0) {
//         deudores.push({ email, saldo: Math.abs(saldo) });
//       } else if (saldo > 0) {
//         acreedores.push({ email, saldo });
//       }
//     });

//     // 7. Crear el plan de pagos para equilibrar las deudas
//     const planDePago: any[] = [];

//     for (const deudor of deudores) {
//       for (const acreedor of acreedores) {
//         if (deudor.saldo === 0) break;

//         const pago = Math.min(deudor.saldo, acreedor.saldo);

//         planDePago.push({
//           deudor: deudor.email,
//           acreedor: acreedor.email,
//           monto: pago,
//         });

//         deudor.saldo -= pago;
//         acreedor.saldo -= pago;
//       }
//     }

//     res.json(planDePago);
//   } catch (error: any) {
//     console.error('Error generateDetailedPaymentPlan controller', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };