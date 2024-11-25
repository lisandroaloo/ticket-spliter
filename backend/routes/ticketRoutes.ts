import express from 'express'
import { createTicket, getTicketsByUserId } from '../controllers/ticketController'
import { uploadImage } from '../services/cloudinary';
import multer from 'multer';
import protectRoute from '../middleware/protectRoute';

const ticketRoutes = express.Router()

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

ticketRoutes.post('/', createTicket); 

ticketRoutes.get('/getList/:usId', protectRoute, getTicketsByUserId); 

// Ruta para subir imágenes usando el middleware de multer
ticketRoutes.post('/upload', upload.single('file'), uploadImage);

export default ticketRoutes;
