import { useState } from 'react'

const useGetProjectPagos = () => {
  const [loading, setLoading] = useState(false)

  const getProjectPagos = async (pr_id: number) => {
    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/projects/pagos/${pr_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
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
  return { loading, getProjectPagos }
}

export default useGetProjectPagos