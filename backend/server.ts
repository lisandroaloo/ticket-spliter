import express from 'express';
import dotenv from "dotenv";
import cors from "cors"
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';


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
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);



app.listen(PORT, () => {
    console.log(`alleluyah - ${PORT}`);
});