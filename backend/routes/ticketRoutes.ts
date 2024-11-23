import express from 'express'
import { createTicket, getTicketsByUserId } from '../controllers/ticketController'
import { uploadImage } from '../services/cloudinary';
import multer from 'multer';

const ticketRoutes = express.Router()

// Configuración de almacenamiento en memoria (se carga en memoria RAM)
const storage = multer.memoryStorage();

// Instancia de multer configurada para almacenar los archivos en memoria
const upload = multer({ storage: storage });

ticketRoutes.post('/', createTicket); 

ticketRoutes.get('/getList/:usId', getTicketsByUserId); 

// Ruta para subir imágenes usando el middleware de multer
ticketRoutes.post('/upload', upload.single('file'), uploadImage);

export default ticketRoutes;
