import express from 'express'
import { createTicket, getTicketsByUserId } from '../controllers/ticketController'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicket)
ticketRoutes.get('/getList/:usId', getTicketsByUserId)

export default ticketRoutes
