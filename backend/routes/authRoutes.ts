import express from "express";
import { checkEmail, login, logout, signUp } from "../controllers/authController";


const authRouter = express.Router();

authRouter.post("/login", login, )

authRouter.post("/signup", signUp)

authRouter.post("/logout", logout)

authRouter.post("/checkEmail", checkEmail)

export default authRouter;