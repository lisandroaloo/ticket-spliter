import { useState } from 'react'

const useGetUsersByPrId = () => {
  const [loading, setLoading] = useState(false)

  const getUsersByPrId = async ( _pr_id: string ) => {
    try {
      setLoading(true)

      const _res = await fetch(`http://localhost:5000/api/users/byProjectId/${_pr_id}`, {
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
  return { loading, getUsersByPrId }
}

export default useGetUsersByPrId
