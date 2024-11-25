import bcrypt from 'bcryptjs'
import prisma from '../models/prismaClient'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie'
import { sendMail } from '../services/mail'


// ====================
// SERVICIO DE REGISTRO
// ====================

export const signUp = async (req: any, res: any) => {
  try {
    const { us_nombre, us_email, us_password, confirmPassword } = req.body

    if (us_password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" })
    }

    // Hasheo de la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(us_password, salt)


    // Creacion del usuario
    const newUser = await prisma.usuario.create({
      data: {
        us_nombre,
        us_email,
        us_password: hashedPassword,
      },
    })

    // Envio de mail de bienvenida
    await sendMail({
      email: us_email,
      subject: "Bienvenido a Ticket Spliter",
      htmlTemplate: `Hola, ${us_nombre}, nos alegra que seas parte de la comunidad spliteadora`,
    });

    // Cookie de loggeo
    generateTokenAndSetCookie(newUser.us_email, res)

    res.json(us_email)
  } catch (error: any) {
    console.error('Error signup controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


// ==================
// SERVICIO DE LOGGEO
// ==================

export const login = async (req: any, res: any) => {
  try {
    const { us_email, us_password: pw } = req.body;

    // Buscar usuario por correo
    const user = await prisma.usuario.findUnique({
      where: { us_email },
    });

    // Verificar si el usuario existe y está activo
    if (!user || !user.us_activo) {
      return res.status(400).json({ error: 'El usuario fue deshabilitado permanentemente' });
    }


    // Comparación de contraseña
    const passwordMatch = await bcrypt.compare(pw, user.us_password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid user or password' });
    }

    // Generar cookie de inicio de sesión
    generateTokenAndSetCookie(us_email, res);



    res.json(us_email);
  } catch (error: any) {
    console.error('Error login controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// ==================
// SERVICIO DE LOGOUT
// ==================

export const logout = async (req: any, res: any) => {
  try {

    // Limpiado de cookie de loggeo
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error: any) {
    console.error('Error logout controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


// ======================================
// SERVICIO DE CHEQUEO DE EMAIL YA EN USO
// ======================================

export const checkEmail = async (req: any, res: any) => {
  try {
    const { us_email } = req.body


    // Buscado de usuario por email
    const checkUser = await prisma.usuario.findUnique({
      where: {
        us_email: us_email
      },
    })


    // Devuelve true o false dependiendo si el mail ya esta en uso
    res.json(checkUser ? false : true)
  } catch (error: any) {
    console.error('Error signup controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


export const closeAccount = async (req: any, res: any) => {
  try {
    const { us_email } = req.body

    const [canClose, msg] = await canCloseAccount(us_email);

    if (!canClose) {
      return res
        .status(400)
        .json({ error: msg });
    }


    await prisma.usuario.update({
      where: { us_email },
      data: { us_activo: false },
    });

    res.status(200).json({ message: 'Closed successfully' })
  } catch (error: any) {
    console.error('Error in deactivateUser service:', error.message);
    res.status(500).json({ error: 'internal Server Error' })
  }
};


const canCloseAccount = async (us_email: string) => {
  try {
    // Verificar si hay pagos emitidos no enviados
    const pendingEmittedPayments = await prisma.pago.findMany({
      where: {
        pa_us_emisor_id: us_email,
        pa_isEnviado: false,
      },
    });

    if (pendingEmittedPayments.length > 0) {
      return [false, "No se puede cerrar teniendo pagos pendientes"];
    }

    // Verificar si hay pagos recibidos no marcados como recibidos
    const pendingReceivedPayments = await prisma.pago.findMany({
      where: {
        pa_us_receptor_id: us_email,
        pa_isRecibido: false,
      },
    });

    if (pendingReceivedPayments.length > 0) {
      return [false, "No se puede cerrar teniendo pagos pendientes"];
    }

    // Verificar si hay proyectos abiertos

    const openProjects = await prisma.usuarioXProyecto.findMany({
      where: {
        uxp_us_id: us_email,
        Proyecto: {
          pr_abierto: true
        }
      },
    });

    if (openProjects.length > 0) {
      return [false, "No se puede cerrar teniendo proyectos abiertos"];
    }

    return [true,""];



  } catch (error: any) {
    console.error("Error in canCloseAccount service:", error.message);
    throw new Error("Internal Server Error");
  }
};