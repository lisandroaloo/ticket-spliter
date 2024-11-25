import express from 'express'
import { getPagosByEmisor, getPagosByProyectoId, getPagosByReceptor, setPagoAsRecieved, setPagoAsSent } from '../controllers/pagoController'

const pagoRoutes = express.Router()

pagoRoutes.get('/byEmisorUserId/:usId', getPagosByEmisor)

pagoRoutes.get('/byReceptorUserId/:usId', getPagosByReceptor)

pagoRoutes.get('/byProyectoId/:prId', getPagosByProyectoId)

pagoRoutes.get('/markAsSent/:paId', setPagoAsSent)

pagoRoutes.get('/markAsRecieved/:paId', setPagoAsRecieved)

export default pagoRoutes
