import express from 'express'
import { createProyect, editProyect, getProyectByIDDeep, getProyects } from '../controllers/proyectController'

const proyectRoutes = express.Router()

proyectRoutes.get('/:userId', getProyects)
proyectRoutes.post('/', createProyect)
proyectRoutes.patch('/', editProyect)
proyectRoutes.get('/detail/:prId', getProyectByIDDeep)

export default proyectRoutes
 