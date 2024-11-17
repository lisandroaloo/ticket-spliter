import { useState } from 'react'
import { IProjectForm } from '../../../interfaces'

const useCloseProject = () => {
    const [loading, setLoading] = useState(false)

    const closeProject = async (_pr_id: string) => {
        try {
            setLoading(true)

            const _res = await fetch(`http://localhost:5000/api/projects/detail/${_pr_id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pr_id: _pr_id,
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
    return { loading, closeProject }
}

export default useCloseProject
