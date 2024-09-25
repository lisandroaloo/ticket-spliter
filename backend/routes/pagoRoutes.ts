import express from 'express'
import { createPago, getPagosByEmisor, getPagosByReceptor, getSaldoPagosByProjectId } from '../controllers/pagoController'

const pagoRoutes = express.Router()

pagoRoutes.get('/byEmisorUserId/:usId', getPagosByEmisor)
pagoRoutes.get('/byReceptorUserId/:usId', getPagosByReceptor)
pagoRoutes.post('/:prId', createPago)
pagoRoutes.get('/saldoByUserAndProjectId/:prId', getSaldoPagosByProjectId)

export default pagoRoutes
