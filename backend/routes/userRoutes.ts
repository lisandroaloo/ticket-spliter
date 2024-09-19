import express from "express";
import { editUser, getSpentByProjectId, getUserById, getUsersByProjectId } from "../controllers/userController";


const userRoutes = express.Router();

userRoutes.get("/byProjectId/:prId", getUsersByProjectId)
userRoutes.post("/spentByProjectId/:prId", getSpentByProjectId)
userRoutes.get("/:usId", getUserById)
userRoutes.patch("/", editUser)


export default userRoutes;