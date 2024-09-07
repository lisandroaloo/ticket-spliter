import { useState } from 'react'
import { IUser } from '../pages/UserProfile'


const useEditUser = () => {
    const [loading, setLoading] = useState(false)

    const editUser = async ({ us_email, us_nombre, us_password }: IUser) => {
        try {
            setLoading(true)

            const _res = await fetch(`http://localhost:5000/api/users/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    us_email: us_email,
                    us_nombre: us_nombre,
                    us_password: us_password
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
    return { loading, editUser }
}

export default useEditUser
