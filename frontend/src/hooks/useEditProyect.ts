import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { IProyectForm } from '../components/proyect/ProyectForm'

const useEditProyect = () => {
  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()

  const editProyect = async ({ _pr_id, _pr_nombre, _pr_descripcion }: IProyectForm) => {
    try {
        setLoading(true)

        const _res = await fetch(`http://localhost:5000/api/proyects/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pr_id:_pr_id,
            pr_nombre: _pr_nombre,
            pr_descripcion: _pr_descripcion,
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
  return { loading, editProyect }
}

export default useEditProyect
