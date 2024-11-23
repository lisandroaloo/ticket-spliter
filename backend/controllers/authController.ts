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
        us_estado: 'Activo',
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
    const { us_email, us_password: pw } = req.body
    
    const user = await prisma.usuario.findUnique({ where: { us_email } })
    
    // Comparacion de contraseña
    const passwordMatch = await bcrypt.compare(pw, user?.us_password || '')
    
    if (!user || !passwordMatch) {
      return res.status(400).json({ error: 'Invalid user or password' })
    }
    
    // Cookie de loggeo
    generateTokenAndSetCookie(us_email, res)
    
    res.json(us_email)
  } catch (error: any) {
    console.error('Error login controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


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