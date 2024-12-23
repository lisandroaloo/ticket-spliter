import React from 'react'
import { IPagoPendienteByProjectCardProps} from "../../../interfaces"
import { useAuthContext } from '../../context/AuthContext'
import useMarkAsSent from '../../hooks/pagos/useMarkAsSent'
import useMarkAsRecieved from '../../hooks/pagos/useMarkAsRecieved'

const PagoPendienteByProjectCard = ({ p, updateProject }: IPagoPendienteByProjectCardProps) => {
  const { authUser } = useAuthContext()

  const { loading: loadingSent, markAsSent } = useMarkAsSent()
  const { loading: loadingRecieved, markAsRecieved } = useMarkAsRecieved()

  const handleClickSent = async () => {
    await markAsSent(p.pa_id)
    updateProject()
  }

  const handleClickRecieved = async () => {
    await markAsRecieved(p.pa_id)
    updateProject()
  }

  return (
    <div className="flex justify-between mb-2 items-center bg-gradient-to-br from-emerald-500 to-green-700 text-green-100 p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{p.Emisor?.us_nombre + ' --> ' + p.Receptor?.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        {!p.pa_isEnviado && p.pa_us_emisor_id === authUser && <button className='mr-2 hover:text-white' onClick={handleClickSent}>Pago enviado</button>}
        {p.pa_isEnviado && !p.pa_isRecibido && p.pa_us_receptor_id === authUser && <button className='mr-2 hover:text-white'  onClick={handleClickRecieved}>Pago recibido</button>}
        <span className='text-greem-800'>${p.pa_monto}</span>
        <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{p.pa_fecha.split('T')[0]}</span>
      </div>
    </div>
  )
}

export default PagoPendienteByProjectCard

