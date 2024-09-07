import express from "express";
import { editUser, getUserById, getUsersByProjectId } from "../controllers/userController";


const userRoutes = express.Router();

userRoutes.get("/byProjectId/:prId", getUsersByProjectId)

userRoutes.get("/:usId", getUserById)
userRoutes.patch("/", editUser)


export default userRoutes;