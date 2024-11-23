import express from 'express'
import { getPagosByEmisor, getPagosByProyectoId, getPagosByReceptor } from '../controllers/pagoController'

const pagoRoutes = express.Router()

pagoRoutes.get('/byEmisorUserId/:usId', getPagosByEmisor)

pagoRoutes.get('/byReceptorUserId/:usId', getPagosByReceptor)

pagoRoutes.get('/byProyectoId/:prId', getPagosByProyectoId)



export default pagoRoutes
