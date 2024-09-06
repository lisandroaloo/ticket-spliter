import React, { useEffect } from 'react'
import useGetProyects from '../hooks/UseGetProyects'
import ProyectForm from '../components/proyect/ProyectForm'

export interface IGetProyects {
  us_email: string
}

const Proyects = () => {

  const {loading, getProyects} = useGetProyects()

  useEffect(()=> {
    getProyects()
  }, [])

  return (
    <ProyectForm />
  )
}

export default Proyects