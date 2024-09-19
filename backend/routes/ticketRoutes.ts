import express from 'express'
import { createTicket } from '../controllers/ticketController'

const ticketRoutes = express.Router()

ticketRoutes.post('/', createTicket)

export default ticketRoutes
