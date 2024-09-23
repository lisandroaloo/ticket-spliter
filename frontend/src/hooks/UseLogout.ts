import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useLogOut = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();


    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem("app-user")
            setAuthUser(null)
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

    return {loading, logout}
}

export default useLogOut