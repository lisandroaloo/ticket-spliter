import bcrypt from 'bcryptjs'
import prisma from '../models/prismaClient'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie'

export const signUp = async (req: any, res: any) => {
  try {
    const { us_nombre, us_email, us_password, confirmPassword } = req.body

    if (us_password != confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(us_password, salt)

    const newUser = await prisma.usuario.create({
      data: { us_nombre, us_email, us_password: hashedPassword, us_role: 'usuario_general', us_estado: 'Activo' },
    })
    res.json(newUser)
  } catch (error: any) {
    console.error('Error signup controller', error.message)
    res.status(500).json({ error: 'internal Server Error' })
  }
}

export const login = async (req: any, res: any) => {
  try {
    const { us_email, us_password: pw } = req.body

    const user = await prisma.usuario.findUnique({ where: { us_email } })

    if (user) {
      const { us_password } = user
      const passwordMatch = await bcrypt.compare(pw, us_password)
      if (passwordMatch) {
        generateTokenAndSetCookie(us_email, res)
      }
    } else {
      throw Error('No se encontro el usuario')
    }

    res.json(user)
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
