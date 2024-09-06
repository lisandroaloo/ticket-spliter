import express from "express";
import { getUsersByProjectId } from "../controllers/userController";


const userRoutes = express.Router();

userRoutes.get("/byProjectId/:prId", getUsersByProjectId)

export default userRoutes;