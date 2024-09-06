import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TextInput from '../TextInput'
import useCreateProyect from '../../hooks/useCreateProyect'
import { IProyect } from '../../pages/Proyects'
import useEditProyect from '../../hooks/useEditProyect'
import useGetProyects from '../../hooks/UseGetProyects'

export interface IProyectFormProps {
  setProjects: Dispatch<SetStateAction<IProyect[]>>
  projects: IProyect[]
  projectForEdit: IProyect | null
  setProjectForEdit: Dispatch<SetStateAction<IProyect | null>>
}

export interface IProyectForm {
  _pr_id: string
  _pr_nombre: string
  _pr_descripcion: string
}

const initializeProyectForm = (): IProyectForm => {
  const form = {
    _pr_id: '',
    _pr_nombre: '',
    _pr_descripcion: '',
  }

  return form
}

const IProyectToIProyectForm = (ip: IProyect): IProyectForm => {
  return {
    _pr_id: ip.pr_id,
    _pr_nombre: ip.pr_nombre,
    _pr_descripcion: ip.pr_descripcion,
  }
}

const ProyectForm = ({ setProjects, projects, projectForEdit, setProjectForEdit }: IProyectFormProps) => {
  const { loading: loadingC, createProyect } = useCreateProyect()
  const { loading: loadingE, editProyect } = useEditProyect()
  const { loading: loadingG, getProyects } = useGetProyects()

  const [formState, setFormState] = useState<IProyectForm>(projectForEdit ? IProyectToIProyectForm(projectForEdit) : initializeProyectForm())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCreateProyect = async () => {
    await createProyect(formState)
    const _proyects = await getProyects()
    setProjects(_proyects) 
    setFormState(initializeProyectForm())
  }

  const handleEditProyect = async () => {
    await editProyect(formState)
    const _proyects = await getProyects()
    setProjects(_proyects)
    setFormState(initializeProyectForm())
  }

  useEffect(() => {
    setFormState(projectForEdit ? IProyectToIProyectForm(projectForEdit) : initializeProyectForm())
  }, [projectForEdit])

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
      {projectForEdit ? (
        <div className="flex justify-around">
          <button
            className="bg-slate-300 rounded p-2 my-1 w-5/12"
            onClick={() => setProjectForEdit(null)}
          >
            Cancelar
          </button>
          <button
            className="bg-slate-300 rounded p-2 my-1 w-5/12"
            onClick={handleEditProyect}
          >
            Editar
          </button>
        </div>
      ) : (
        <button
          className="bg-slate-300 rounded p-2 my-1"
          onClick={handleCreateProyect}
        >
          Crear
        </button>
      )}
    </div>
  )
}

export default ProyectForm
