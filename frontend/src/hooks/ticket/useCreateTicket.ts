import { useState } from 'react'
import { ITicketForm } from '../../../interfaces'
import { useAuthContext } from '../../context/AuthContext'

const useCreateTicket = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()
  
  const createTicket = async ({ _pr_id, _ti_monto, _ti_descripcion, _ti_fecha }: ITicketForm) => {
    try {
        setLoading(true)

        const _res = await fetch(`http://localhost:5000/api/tickets/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            us_email: authUser,
            pr_id: _pr_id,
            ti_monto: _ti_monto,
            ti_descripcion: _ti_descripcion,
            ti_fecha: _ti_fecha,
          }),
        })

        const res = await _res.json()

        return res
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }
  return { loading, createTicket }
}

export default useCreateTicket
