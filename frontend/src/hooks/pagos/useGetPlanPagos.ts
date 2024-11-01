import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'

const useGetPlanPagos = () => {
  const [loading, setLoading] = useState(false)


  const getPlanPagos = async (pr_id: number) => {
    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/projects/detailedPlan/${pr_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      const res = await _res.json()

      console.log(res);
      
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
  return { loading, getPlanPagos }
}

export default useGetPlanPagos
