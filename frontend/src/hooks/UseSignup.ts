import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { IRegisterInputs } from "../../interfaces";

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
    alert("Please fill all the fields");
    return false;
  }

  if (us_password !== confirmPassword) {
    alert("Passwords don't match");

    return false;
  }

  if (us_password.length < 6) {
    alert("Passwords must be at least 6 characters long");
    return false;
  }

  return true;
};

export default useSignUp;
