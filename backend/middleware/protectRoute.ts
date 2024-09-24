import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import prisma from "../models/prismaClient";

const protectRoute = async (req: any, res: any, next: any) => {
  try {

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;


    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

    const user = await prisma.usuario.findUnique({
      where: { us_email: decoded.email },
      select: { us_email: true }
    });

 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const {prId} = req.params;
  
    const usuarioXProyecto = await prisma.usuarioXProyecto.findUnique({
      where: {
        uxp_us_id_uxp_pr_id: {
          uxp_us_id: user.us_email,
          uxp_pr_id: +prId
        }
      }
    });


    if (!usuarioXProyecto) {
      return res.status(403).json({ error: 'User not part of the project' });
    }

    req.user = user;
    next();
    
  } catch (error: any) {
    res.status(500).json({ error: "ERROR MIDDDDLWARE" });
  }
};

export default protectRoute;
