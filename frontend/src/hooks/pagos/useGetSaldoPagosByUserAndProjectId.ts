import { useState } from 'react'

const useGetSaldoPagosByUserAndProjectId = () => {
  const [loading, setLoading] = useState(false)

  const getSaldoPagosByUserAndProjectId = async (pr_id: string) => {
    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/pagos/saldoByUserAndProjectId/${pr_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
  return { loading, getSaldoPagosByUserAndProjectId }
}

export default useGetSaldoPagosByUserAndProjectId
