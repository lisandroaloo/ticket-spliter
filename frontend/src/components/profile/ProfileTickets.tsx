import React from 'react'
import { IProfileTickets } from '../../../interfaces'
import TicketCards from './TicketCards'

const ProfileTickets = ({ tickets }: IProfileTickets) => {
    return (
        <div className='m-2'>
            <TicketCards tickets={tickets} />
        </div>

    )
}

export default ProfileTickets