import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { IRegisterInputs } from "../../interfaces";
import toast from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    us_nombre,
    us_email,
    us_password,
    confirmPassword,
  }: IRegisterInputs) => {
    const success = handleInputErrors({
      us_nombre,
      us_email,
      us_password,
      confirmPassword,
    });

    if (!success) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          us_nombre,
          us_email,
          us_password,
          confirmPassword,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("app-user", JSON.stringify(data));
      setAuthUser(data);
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
  return { loading, signup };
};

const handleInputErrors = ({
  us_nombre,
  us_email,
  us_password,
  confirmPassword,
}: IRegisterInputs) => {
  if (!us_nombre || !us_email || !us_password || !confirmPassword) {
    toast.error("Todos los campos deben estar llenos")
    return false;
  }

  if (us_password !== confirmPassword) {
    toast.error("Las contraseñas no coinciden")

    return false;
  }

  if (us_password.length < 6) {
    toast.error("Las contraseñas deben tener mas de 6 caracteres")
    return false;
  }

  return true;
};

export default useSignUp;
