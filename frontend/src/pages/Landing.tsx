import React from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from '../components/FeatureCard'
import Footer from '../components/Footer'

const Landing = () => {
  const scrollDown = () => {
    const destino = document.getElementById('destino')
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="w-full flex justify-around items-center h-[50vh] bg-green-100">
        <div className="w-2/5">
          <img
            src="/landing1.png"
            alt="Imagen ilustrativa del uso de la app"
          />
        </div>
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-green-950">Gestiona tus Gastos Compartidos</h1>
          <p className="mt-4 text-green-700">
            Lleva un control fácil, divide y liquida los gastos de tu grupo <br /> con nuestra intuitiva aplicación de gestión de gastos.
          </p>

          <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4 sm:justify-center">
            <Link
              to="/signup"
              className="no-underline inline-block px-6 py-3 text-green-200 bg-green-900 rounded-md hover:bg-green-800"
            >
              Comenzar
            </Link>
            <button
              onClick={scrollDown}
              className="no-underline inline-block px-6 py-3 text-green-950 border border-green-900 rounded-md hover:bg-green-100"
            >
              Saber Más
            </button>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-around items-center bg-green-900">
        <div
          id="destino"
          className="w-3/5 flex-col flex justify-center text-center items-center my-28"
        >
          <h1 className="text-3xl font-bold text-green-200">Características</h1>
          <p className="mt-4 text-green-200">Nuestra aplicación de seguimiento de gastos ofrece una variedad de características para hacer que la gestión de gastos compartidos sea fácil.</p>

          <div className="mt-8 w-11/12 flex flex-col gap-4 ">
            <FeatureCard
              icon={'bi bi-folder'}
              title={'Gestión de Proyectos'}
              description={'Crea y gestiona proyectos con nombre, descripción y asignación de miembros.'}
            />

            <FeatureCard
              icon={'bi bi-calculator-fill'}
              title={'Seguimiento de Contribuciones'}
              description={'Determina cuánto debe pagar o recibir cada miembro en función de la distribución de gastos.'}
            />
            <FeatureCard
              icon={'bi bi-bar-chart-fill'}
              title={'Informes e Historial'}
              description={'Visualiza informes detallados e historial de transacciones para tus proyectos y gastos.'}
            />
          </div>
        </div>
        <div className="w-2/5 h-50 ">
          <img
            src="/landing2.png"
            alt="Imagen ilustrativa del uso de la app"
          />
          <img
            src="/landing3.png"
            alt="Imagen ilustrativa del uso de la app"
          />
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Landing
