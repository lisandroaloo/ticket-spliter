import React from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/UseLogin";

export interface ILogin {
  us_email: string;
  us_password: string;
}

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
    <section className="bg-gradient-to-r from-white to-white py-12">
      <div className="px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Inicia Sesion
          </h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <form className="w-full max-w-md space-y-4" onSubmit={formSubmit}>
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu email"
                  required
                  value={inputs.us_email}
                  onChange={(e) => {
                    setInputs({ ...inputs, us_email: e.target.value });
                  }}
                  className="w-full rounded-md border border-gray-500 px-4 py-2 text-gray-900"
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
                  className="w-full rounded-md border border-gray-500 px-4 py-2 text-gray-900 "
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Iniciar Sesion"
                )}
              </button>
            </form>
            <div className="text-sm text-gray-700">
              No tenes una cuenta?{" "}
              <Link to="/signup" className="font-medium hover:text-gray-900">
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
