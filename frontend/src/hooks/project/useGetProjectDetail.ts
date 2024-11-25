import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const useGetProjectDetail = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const getProjectDetail = async (pr_id: number) => {


    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/projects/detail/${pr_id}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
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
  return { loading, getProjectDetail }
}

export default useGetProjectDetail
