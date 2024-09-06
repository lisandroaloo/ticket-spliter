import express from 'express'
import { createProyect, getProyects } from '../controllers/proyectController'

const proyectRoutes = express.Router()

proyectRoutes.get('/:userId', getProyects)
proyectRoutes.post('/', createProyect)

export default proyectRoutes
