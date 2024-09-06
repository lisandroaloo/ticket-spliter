import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from './routes/authRoutes';
import proyectRoutes from './routes/proyectRoutes';


dotenv.config();

const PORT = process.env.PORT

const app = express();

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use("/api/auth", authRoutes);
app.use("/api/proyects", proyectRoutes);



app.listen(PORT, () => {
    console.log(`alleluyah - ${PORT}`);
});