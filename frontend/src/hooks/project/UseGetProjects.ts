import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'

const useGetProjects = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()

  const getProjects = async () => {
    try {
      console.log(authUser);
      
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/projects/${authUser}`, {
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
  return { loading, getProjects }
}

export default useGetProjects
