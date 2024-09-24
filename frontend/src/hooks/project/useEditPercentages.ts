import { useState } from 'react'
import { IPercentageByUser } from '../../../interfaces'

const useEditProjectPercentages = () => {
  const [loading, setLoading] = useState(false)

  const editProjectPercentages = async (usuariosXProyectos: IPercentageByUser[], prId:string) => {
    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/projects/percentage/${prId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuariosXProyectos),
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

  return { loading, editProjectPercentages }
}

export default useEditProjectPercentages
