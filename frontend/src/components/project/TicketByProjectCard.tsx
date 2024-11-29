import React, { useState } from 'react';
import { ITicketByProjectCardProps } from '../../../interfaces';

const TicketByProjectCard = ({ t, onClickRow }: ITicketByProjectCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  return (
    <>
      <div className="flex justify-between items-center bg-gradient-to-br from-emerald-500 to-green-700 text-green-100 p-3 rounded-lg">
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
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="cursor-pointer"
            >
              📷
            </span>
          )}
          <span>${t.ti_monto}</span>
          <span>{t.ti_descripcion}</span>
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
            {t.ti_fecha.split('T')[0]}
          </span>
        </div>
      </div>

   
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center mt-0 justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white  rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsPopupOpen(!isPopupOpen)}
              className="absolute top-2 right-2 text-black font-bold text-xl"
            >
              ×
            </button>
            <img
              src={t.ti_image_url}
              alt="Ticket"
              className="max-w-full max-h-96 rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TicketByProjectCard;
