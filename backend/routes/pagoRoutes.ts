import express from 'express'
import { createPago, getPagosByEmisor, getPagosByReceptor } from '../controllers/pagoController'

const pagoRoutes = express.Router()

pagoRoutes.get('/byEmisorUserId/:usId', getPagosByEmisor)
pagoRoutes.get('/byReceptorUserId/:usId', getPagosByReceptor)
pagoRoutes.post('/:prId', createPago)

export default pagoRoutes
