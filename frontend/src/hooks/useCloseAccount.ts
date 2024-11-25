import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast';

const useCloseAccount = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();


    const closeAccount = async (us_email: string) => {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/closeAccount", {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ us_email }),
            })
            const data = await res.json();
            if (data.error) {
                toast.error(data.error)
            } else {

                localStorage.removeItem("app-user")
                setAuthUser(null)
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

    return { loading, closeAccount }
}

export default useCloseAccount