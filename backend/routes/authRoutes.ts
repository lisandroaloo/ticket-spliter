import express from "express";
import { login, logout, signUp } from "../controllers/authController";


const authRouter = express.Router();

authRouter.post("/login", login)

authRouter.post("/signup", signUp)

authRouter.post("/logout", logout)

export default authRouter;