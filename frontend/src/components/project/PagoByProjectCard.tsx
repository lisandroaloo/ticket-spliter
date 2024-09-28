import React from 'react'
import {IPagoByProjectCardProps} from "../../../interfaces"

const PagoByProjectCard = ({ p }: IPagoByProjectCardProps) => {
  return (
    <div className="flex justify-between items-center bg-green-700 text-green-100 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{p.emisor?.us_nombre + ' --> ' + p.receptor?.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>${p.pa_monto}</span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{p.pa_fecha.split('T')[0]}</span>
      </div>
    </div>
  )
}

export default PagoByProjectCard
