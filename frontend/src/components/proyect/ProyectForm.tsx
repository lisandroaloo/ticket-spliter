import React, { useState } from 'react'
import TextInput from '../TextInput'
import useCreateProyect from '../../hooks/useCreateProyect'

export interface IProyectForm {
  _pr_id: string,
  _pr_nombre: string,
  _pr_descripcion: string
}

const initializeProyectForm = (): IProyectForm => {
  const form = {
    _pr_id: "",
    _pr_nombre: "",
    _pr_descripcion: ""
  }

  return form
}

const ProyectForm = () => {
  
const {loading, createProyect} = useCreateProyect()

  const [formState, setFormState] = useState<IProyectForm>(initializeProyectForm())
  
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target

     setFormState((prevState) => ({
       ...prevState, 
       [name]: value,
     }))
   }

   const handleCreateProyect = () => {
    createProyect(formState)
   }

  return (
    <div className="flex flex-col p-4 bg-slate-500">
      <TextInput
        type="text"
        name="_pr_id"
        value={formState._pr_id}
        placeholder="ID"
        readOnly
      />
      <TextInput
        type="text"
        name="_pr_nombre"
        value={formState._pr_nombre}
        handleInputChange={handleInputChange}
        placeholder="Nombre"
      />
      <TextInput
        type="text"
        name="_pr_descripcion"
        value={formState._pr_descripcion}
        handleInputChange={handleInputChange}
        placeholder="Descripcion"
      />
      <button className="bg-slate-300 rounded p-2 my-1" onClick={handleCreateProyect}>Crear</button>
    </div>
  )
}

export default ProyectForm