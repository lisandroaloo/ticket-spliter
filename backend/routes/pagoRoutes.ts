import express from 'express'
import { getPagosByEmisor, getPagosByReceptor } from '../controllers/pagoController'

const pagoRoutes = express.Router()

pagoRoutes.get('/byEmisorUserId/:usId', getPagosByEmisor)

pagoRoutes.get('/byReceptorUserId/:usId', getPagosByReceptor)



export default pagoRoutes
