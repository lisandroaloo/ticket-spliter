import React from 'react'
import { IProfileTickets } from '../../../interfaces'

const TicketCards = ({ tickets }: IProfileTickets) => {
    return (
      <>
        {tickets.map((t, index) => (
          <div
            key={index}
            className="rounded-lg p-2 mb-1 shadow-sm bg-green-700"
          >
            <div>{t.ti_descripcion + ' - ' + t.ti_fecha.split('T')[0] + ' - $' + t.ti_monto}</div>
          </div>
        ))}
      </>
    )
}

export default TicketCards