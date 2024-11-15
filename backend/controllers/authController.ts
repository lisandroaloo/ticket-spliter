import bcrypt from 'bcryptjs'
import prisma from '../models/prismaClient'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie'
import { sendMail } from '../services/mail'

export const signUp = async (req: any, res: any) => {
  try {
    const { us_nombre, us_email, us_password, confirmPassword } = req.body

    if (us_password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(us_password, salt)

    const newUser = await prisma.usuario.create({
      data: {
        us_nombre,
        us_email,
        us_password: hashedPassword,
        us_estado: 'Activo',
      },
    })

    await sendMail({
      email: us_email,
      subject: "Bienvenido a Ticket Spliter",
      htmlTemplate: `Hola, ${us_nombre}, nos alegra que seas parte de la comunidad spliteadora`,
    });

    generateTokenAndSetCookie(newUser.us_email, res)

    res.json(us_email)
  } catch (error: any) {
    console.error('Error signup controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const login = async (req: any, res: any) => {
  try {
    const { us_email, us_password: pw } = req.body

    const user = await prisma.usuario.findUnique({ where: { us_email } })

    const passwordMatch = await bcrypt.compare(pw, user?.us_password || '')

    if (!user || !passwordMatch) {
      return res.status(400).json({ error: 'Invalid user or password' })
    }

    generateTokenAndSetCookie(us_email, res)

    res.json(us_email)
  } catch (error: any) {
    console.error('Error login controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const logout = async (req: any, res: any) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error: any) {
    console.error('Error logout controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}


export const checkEmail = async (req: any, res: any) => {
  try {
    const { us_email } = req.body


    const checkUser = await prisma.usuario.findUnique({
      where: {
        us_email: us_email
      },
    })

    
    res.json(checkUser ? false : true)
  } catch (error: any) {
    console.error('Error signup controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}