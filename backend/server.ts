import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";


dotenv.config();

const PORT = process.env.PORT

const app = express();
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    console.log(`alleluyah - ${PORT}`);
});