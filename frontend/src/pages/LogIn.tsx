import React from 'react'
import { Link } from 'react-router-dom'

export interface ILogin {
  email: string
  password: string
}

const LogIn = () => {
  const [inputs, setInputs] = React.useState<ILogin>({
    email: '',
    password: '',
  })

  return (
    <section className="bg-gradient-to-r from-white to-white py-12">
      <div className="px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Inicia Sesion</h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <form className="w-full max-w-md space-y-4">
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu email"
                  required
                  value={inputs.email}
                  onChange={(e) => {
                    setInputs({ ...inputs, email: e.target.value })
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
                  value={inputs.password}
                  onChange={(e) => {
                    setInputs({ ...inputs, password: e.target.value })
                  }}
                  className="w-full rounded-md border border-gray-500 px-4 py-2 text-gray-900 "
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Iniciar Sesion
              </button>
            </form>
            <div className="text-sm text-gray-700">
              No tenes una cuenta?{' '}
              <Link
                to="/signup"
                className="font-medium hover:text-gray-900"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn
