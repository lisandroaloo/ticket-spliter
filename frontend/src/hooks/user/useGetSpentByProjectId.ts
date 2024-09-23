import { useState } from 'react'
import { IGetSpentByProjectId } from '../../../interfaces'

const useGetSpentByProjectId = () => {
  const [loading, setLoading] = useState(false)

  const getSpentByProjectId = async ({ _pr_id, _us_email }: IGetSpentByProjectId) => {
    try {
      setLoading(true)

      const _res = await fetch(`http://localhost:5000/api/users/spentByProjectId/${_pr_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          us_email: _us_email,
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
  return { loading, getSpentByProjectId }
}

export default useGetSpentByProjectId
