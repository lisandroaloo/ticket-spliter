import express from 'express'
import { getPagosByEmisor, getPagosByProyectoId, getPagosByReceptor, setPagoAsRecieved, setPagoAsSent } from '../controllers/pagoController'
import protectRoute from '../middleware/protectRoute'

const pagoRoutes = express.Router()

pagoRoutes.get('/byEmisorUserId/:usId',protectRoute, getPagosByEmisor)

pagoRoutes.get('/byReceptorUserId/:usId',protectRoute, getPagosByReceptor)

pagoRoutes.get('/byProyectoId/:prId',protectRoute, getPagosByProyectoId)

pagoRoutes.get('/markAsSent/:paId', setPagoAsSent)

pagoRoutes.get('/markAsRecieved/:paId', setPagoAsRecieved)

export default pagoRoutes
