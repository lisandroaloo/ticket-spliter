import { useState } from 'react'

const useMarkAsRecieved = () => {
  const [loading, setLoading] = useState(false)

  const markAsRecieved = async (pa_id: number) => {
    try {
      setLoading(true)
      const _res = await fetch(`http://localhost:5000/api/pagos/markAsRecieved/${pa_id}`, {
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
  return { loading, markAsRecieved }
}

export default useMarkAsRecieved
