import express from 'express'
import { createProyect, editProyect, getProyects } from '../controllers/proyectController'

const proyectRoutes = express.Router()

proyectRoutes.get('/:userId', getProyects)
proyectRoutes.post('/', createProyect)
proyectRoutes.patch('/', editProyect)

export default proyectRoutes
