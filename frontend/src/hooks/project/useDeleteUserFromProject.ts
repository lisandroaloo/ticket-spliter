import { useState } from "react"
import { IUserByProjectForm } from "../../../interfaces"

const useDeleteUserFromProject = () => {
  
  const [loading, setLoading] = useState(false)

  const deleteUserFromProject = async ({ _pr_id, _uxp_us_id }: IUserByProjectForm) => {
    try {
      setLoading(true)

      const _res = await fetch(`http://localhost:5000/api/projects/detail/delete/${_pr_id}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          us_email: _uxp_us_id,
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
  return { loading, deleteUserFromProject }
}

export default useDeleteUserFromProject
