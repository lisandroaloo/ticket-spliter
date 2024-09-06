import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useGetProyects = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()

  const getProyects = async () => {
    try {

      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/proyects/${authUser}`, {
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
  return { loading, getProyects }
}

export default useGetProyects
