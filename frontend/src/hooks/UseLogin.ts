import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { ILogin } from "../../interfaces";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ us_email, us_password }: ILogin) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ us_email, us_password }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error)
      }
      else{

        localStorage.setItem("app-user", JSON.stringify(data));
        
        setAuthUser(data);
      }



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
  return { loading, login };
};

export default useLogin;
