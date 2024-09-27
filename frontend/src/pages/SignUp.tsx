import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/UseSignup";
import { IRegisterInputs } from "../../interfaces";
import useCheckEmail from "../hooks/UseCheckEmail";
import toast from "react-hot-toast";

const SignUp = () => {
  const { signup, loading } = useSignUp();
  const { checkEmail } = useCheckEmail()

  const [inputs, setInputs] = React.useState<IRegisterInputs>({
    us_nombre: "",
    us_email: "",
    us_password: "",
    confirmPassword: "",
  });


  const checkUser = async () => {
    const valid = await checkEmail(inputs.us_email)
    return valid
  }

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.us_password !== inputs.confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return;
    }

    const valid = await checkUser()

    if (valid) {


      await signup(inputs);
    }
    else {
      toast.error("El email ya esta en uso")
    }

  };

  return (
    <section className="h-[92vh] bg-gray-900 text-white relative">
      <div className="absolute inset-0 px-2 md:px-0 top-[15%]">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight ">
            Regístrate
          </h1>
          <p className="mt-4 text-lg ">
            Crea una cuenta para empezar a gestionar tus gastos.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <form className="w-full max-w-md space-y-4" onSubmit={formSubmit}>
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  required
                  value={inputs.us_nombre}
                  onChange={(e) => {
                    setInputs({ ...inputs, us_nombre: e.target.value });
                  }}
                  className="w-full rounded-md border bg-slate-500 border-gray-500 px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu email"
                  required
                  value={inputs.us_email}
                  onChange={(e) => {
                    setInputs({ ...inputs, us_email: e.target.value });
                  }}
                  className="w-full rounded-md border bg-slate-500 border-gray-500 px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa una contraseña"
                  required
                  value={inputs.us_password}
                  onChange={(e) => {
                    setInputs({ ...inputs, us_password: e.target.value });
                  }}
                  className="w-full rounded-md border bg-slate-500 border-gray-500 px-4 py-2 text-gray-900"
                />
              </div>
              <div>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={inputs.confirmPassword}
                  onChange={(e) => {
                    setInputs({ ...inputs, confirmPassword: e.target.value });
                  }}
                  required
                  className="w-full rounded-md border bg-slate-500 border-gray-500 px-4 py-2 text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="relative w-full h-10 rounded-md bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}

              >
                <span className={`${loading ? 'invisible' : 'visible'}`}>
                  Registrarse
                </span>
                {loading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="sr-only">Cargando...</span>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </span>
                )}
              </button>
            </form>
            <div className="text-sm text-gray-700">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium hover:text-white">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
