import React from 'react'
import {IPagoByProjectCardProps} from "../../../interfaces"
import { useAuthContext } from '../../context/AuthContext'

const PagoPendienteByProjectCard = ({ p }: IPagoByProjectCardProps) => {

  const { authUser } = useAuthContext()

  return (
    <div className="flex justify-between mb-2 items-center bg-gradient-to-br from-emerald-500 to-green-700 text-green-100 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{p.Emisor?.us_nombre + ' --> ' + p.Receptor?.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        {!p.pa_is_enviado && p.pa_us_emisor_id === authUser && <button>Pago enviado</button>}
        {p.pa_is_enviado && !p.pa_is_recibido && p.pa_us_receptor_id === authUser && <button>Pago recibido</button>}
        <span>${p.pa_monto}</span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{p.pa_fecha.split('T')[0]}</span>
      </div>
    </div>
  )
}

export default PagoPendienteByProjectCard
