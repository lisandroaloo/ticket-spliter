import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
const useGetPagosByProjectId = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const getPagosByProjectId = async (pr_id: string) => {
    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/pagos/byProyectoId/${pr_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      if (!_res.ok) {
        throw new Error(`Error ${_res.status}: ${_res.statusText}`);
      }
      const res = await _res.json()

      return res
    } catch (error: unknown) {
      toast.error("No perteneces a este proyecto")
      navigate("/projects/");
      throw error
    } finally {
      setLoading(false)
    }
  }
  return { loading, getPagosByProjectId }
}

export default useGetPagosByProjectId
