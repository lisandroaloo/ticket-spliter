import React from 'react'
import { ITicket } from '../../pages/ProjectDetail'

interface ITicketByProjectCardProps {
  t: ITicket
}

const TicketByProjectCard = ({ t }: ITicketByProjectCardProps) => {
  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{t.Usuario.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>${t.ti_monto}</span>
        <span>{t.ti_descripcion}</span>
        <span className="bg-[#4fd1c5] text-[#1e293b] px-2 py-1 rounded-full text-xs">{t.ti_fecha.split("T")[0]}</span>
      </div>
    </div>
  )
}

export default TicketByProjectCard
