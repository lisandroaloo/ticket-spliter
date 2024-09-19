import { useState } from 'react'

export interface ITicketForm {
  _pr_id: string
  _us_email: string
  _ti_monto: string
  _ti_descripcion: string
  _ti_fecha: Date
}

const useCreateTicket = () => {
  const [loading, setLoading] = useState(false)

  const createTicket = async ({ _pr_id,_us_email, _ti_monto, _ti_descripcion, _ti_fecha }: ITicketForm) => {
    try {
        setLoading(true)

        const _res = await fetch(`http://localhost:5000/api/tickets/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            us_email: _us_email,
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
