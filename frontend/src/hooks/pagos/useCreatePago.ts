import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { ICreatePago } from '../../../interfaces'

const useCreatePago = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()

  const createPago = async ({ pr_id, receptor_us_email, pa_monto, pa_fecha }: ICreatePago) => {
    try {
      setLoading(true)

      const _res = await fetch(`http://localhost:5000/api/pagos/${pr_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emisor_us_email: authUser,
          receptor_us_email: receptor_us_email,
          pa_monto: pa_monto,
          pa_fecha: pa_fecha,
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
  return { loading, createPago }
}

export default useCreatePago
