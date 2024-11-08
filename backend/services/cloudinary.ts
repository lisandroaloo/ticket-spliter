import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

cloudinary.config({
  cloud_name: 'dljyjtvnv',
  api_key: '786316729697877',
  api_secret: process.env.CLOUDINARY_API_KEY!,
});

export const uploadImage = (req: Request, res: Response) => {
  const file = req.file; // Debes usar 'file' porque solo se permite un archivo por 'upload.single'

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Subir la imagen desde el buffer
  cloudinary.uploader.upload_stream(
    {
      resource_type: 'auto', // Esto detecta automáticamente el tipo de archivo (imagen, video, etc.)
    },
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Aquí puedes devolver el resultado con la URL de la imagen subida
      res.json({ url: result?.secure_url });
    }
  ).end(file.buffer); // El archivo se encuentra en 'file.buffer' cuando usas 'memoryStorage'
};
