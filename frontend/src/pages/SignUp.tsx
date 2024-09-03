import React from "react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/UseSignup";

export interface IRegisterInputs {
  us_nombre: string;
  us_email: string;
  us_password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const { signup, loading } = useSignUp();

  const [inputs, setInputs] = React.useState<IRegisterInputs>({
    us_nombre: "",
    us_email: "",
    us_password: "",
    confirmPassword: "",
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <section className="bg-gradient-to-r from-white to-white py-12">
      <div className="px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Registrate
          </h1>
          <p className="mt-4 text-lg text-gray-700">
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
                  className="w-full rounded-md border border-gray-500 px-4 py-2 text-gray-900"
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
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={inputs.confirmPassword}
                  onChange={(e) => {
                    setInputs({ ...inputs, confirmPassword: e.target.value });
                  }}
                  required
                  className="w-full rounded-md border border-gray-500 px-4 py-2 text-gray-900"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Registrarse"
                )}
              </button>
            </form>
            <div className="text-sm text-gray-700">
              Ya tenes una cuenta?{" "}
              <Link to="/login" className="font-medium hover:text-gray-900">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
