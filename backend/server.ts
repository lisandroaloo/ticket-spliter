import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes";
import cors from "cors"


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



app.listen(PORT, () => {
    console.log(`alleluyah - ${PORT}`);
});