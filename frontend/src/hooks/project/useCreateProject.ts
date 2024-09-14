import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { IProjectForm } from '../../components/project/ProjectForm'

const useCreateProject = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()

  const createProject = async ({ _pr_id, _pr_nombre, _pr_descripcion }: IProjectForm) => {
    try {
      if (_pr_id === '') {
        setLoading(true)
        
        const _res = await fetch(`http://localhost:5000/api/projects/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            us_email: authUser,
            pr_nombre: _pr_nombre,
            pr_descripcion: _pr_descripcion,
          }),
        })

        const res = await _res.json()

        return res
      } else {
        throw new Error('Id must be "" to create a project')
      }
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
  return { loading, createProject }
}

export default useCreateProject
