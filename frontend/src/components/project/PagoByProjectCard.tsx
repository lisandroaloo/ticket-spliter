import React from 'react'
import { IPago } from '../../pages/UserProfile'

interface IPagoByProjectCardProps {
  p: IPago
}

const PagoByProjectCard = ({ p }: IPagoByProjectCardProps) => {
  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{p.emisor?.us_nombre + " --> " + p.receptor?.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>${p.pa_monto}</span>
        <span className="bg-[#4fd1c5] text-[#1e293b] px-2 py-1 rounded-full text-xs">{p.pa_fecha.split('T')[0]}</span>
      </div>
    </div>
  )
}

export default PagoByProjectCard
