import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useGetProyectByIDDeep = () => {
  const [loading, setLoading] = useState(false)


  const getProyectsByIDDeep = async (pr_id: number) => {
    try {


      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/proyects/detail/${pr_id}`, {
        method: 'GET',
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
  return { loading, getProyectsByIDDeep }
}

export default useGetProyectByIDDeep