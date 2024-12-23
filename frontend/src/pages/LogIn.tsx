import React from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/UseLogin";
import { ILogin } from "../../interfaces";

const LogIn = () => {
  const [inputs, setInputs] = React.useState<ILogin>({
    us_email: "",
    us_password: "",
  });

  const { login, loading } = useLogin();

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(inputs);
  };

  return (
    <section className="h-[92vh] bg-green-100 text-green-950 placeholder-green-100 relative">
      <div className=" absolute px-2 md:px-0 inset-0 top-[15%] ">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight ">Inicia Sesion</h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <form
              className="w-full max-w-md space-y-4"
              onSubmit={formSubmit}
            >
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu email"
                  required
                  value={inputs.us_email}
                  onChange={(e) => {
                    setInputs({ ...inputs, us_email: e.target.value })
                  }}
                  className="w-full rounded-md bg-green-300 border-green-800 px-4 py-2 text-green-950 placeholder-green-100"
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
                    setInputs({ ...inputs, us_password: e.target.value })
                  }}
                  className="w-full rounded-md bg-green-300  border-green-800 px-4 py-2 text-green-950 placeholder-green-100"
                />
              </div>

              <button
                type="submit"
                className="relative w-full h-10 rounded-md bg-green-400 px-4 py-2 text-green-950 transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <span className={`${loading ? 'invisible' : 'visible'}`}>Iniciar Sesión</span>
                {loading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="sr-only">Cargando...</span>
                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  </span>
                )}
              </button>
            </form>
            <div className="text-sm text-green-950">
              No tenes una cuenta?
              <Link
                to="/signup"
                className="font-medium ml-2 text-green-950 hover:text-green-500"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default LogIn;
