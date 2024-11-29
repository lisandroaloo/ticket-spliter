import React from 'react'
import { ITicketByProjectCardProps } from '../../../interfaces'

const TicketByProjectCard = ({ t, onClickRow }: ITicketByProjectCardProps) => {
  const redirectImage = () => {
    window.open(t.ti_image_url, '_blank')
  }

  return (
    <div className="flex justify-between items-center bg-gradient-to-br from-emerald-500 to-green-700 text-green-100 p-3 rounded-lg" >
      <div className="flex items-center space-x-3">
        <span>{t.Usuario.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
     
        <span
          onClick={() => onClickRow(t)}
          className="cursor-pointer"
        >
          ✏️
        </span>
        {t.ti_image_url && (
          <span
            onClick={redirectImage}
            className="cursor-pointer"
          >
            📷
          </span>
        )}
        <span>${t.ti_monto}</span>
        <span>{t.ti_descripcion}</span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{t.ti_fecha.split('T')[0]}</span>
      </div>
    </div>
  )
}

export default TicketByProjectCard
