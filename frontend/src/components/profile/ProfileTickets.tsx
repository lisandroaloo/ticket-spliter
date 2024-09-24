import React from 'react'
import { ITicket } from '../../../interfaces'
import TicketCards from './TicketCards'

export interface IProfileTickets {
    tickets: ITicket[]
}

const ProfileTickets = ({ tickets }: IProfileTickets) => {
    return (
        <div className='m-2'>
            <TicketCards tickets={tickets} />
        </div>

    )
}

export default ProfileTickets