import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { ILogin } from "../../interfaces";

const useCheckEmail = () => {
    const [loading, setLoading] = useState(false);

    const checkEmail = async (us_email: string) => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/auth/checkEmail", {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({us_email}),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }
            
            return data
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };
    return { loading, checkEmail };
};

export default useCheckEmail;
