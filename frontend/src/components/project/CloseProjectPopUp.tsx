import React from 'react'
import { ICloseProject } from '../../../interfaces'


const closeProjectPopUp = ({cerrar, cancelar} : ICloseProject) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Cerrar Proyecto</h2>
        <p className="text-lg mb-4">¿Desea cerrar el proyecto?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
            onClick={cerrar}
          >
            Cerrar
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={cancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default closeProjectPopUp
