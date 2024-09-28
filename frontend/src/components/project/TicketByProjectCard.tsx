import React from 'react'
import { ITicketByProjectCardProps } from '../../../interfaces'

const TicketByProjectCard = ({ t }: ITicketByProjectCardProps) => {
  return (
    <div className="flex justify-between items-center bg-green-700 text-green-100 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{t.Usuario.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>${t.ti_monto}</span>
        <span>{t.ti_descripcion}</span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{t.ti_fecha.split('T')[0]}</span>
      </div>
    </div>
  )
}

export default TicketByProjectCard
