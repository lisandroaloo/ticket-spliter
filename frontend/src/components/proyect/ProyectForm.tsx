import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TextInput from '../TextInput'
import useCreateProyect from '../../hooks/useCreateProyect'
import { IProyect, IUserByProject } from '../../pages/Proyects'
import useEditProyect from '../../hooks/useEditProyect'
import useGetProyects from '../../hooks/UseGetProyects'
import useGetUsersByPrId from '../../hooks/useGetUsersByPrID'
import UserByProjectForm from './UserByProjectForm'

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

export interface IUserByProjectForm {
  _uxp_us_id: string
  _uxp_pr_id: string
  _uxp_porcentaje: string
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

const IUBPToIUBPF = (ubp: IUserByProject): IUserByProjectForm => {
  return {
    _uxp_us_id: ubp.uxp_us_id,
    _uxp_pr_id: ubp.uxp_pr_id,
    _uxp_porcentaje: ubp.uxp_porcentaje,
  }
}

const ProyectForm = ({ setProjects, projects, projectForEdit, setProjectForEdit }: IProyectFormProps) => {
  const { loading: loadingC, createProyect } = useCreateProyect()
  const { loading: loadingE, editProyect } = useEditProyect()
  const { loading: loadingGP, getProyects } = useGetProyects()
  const { loading: loadingGU, getUsersByPrId } = useGetUsersByPrId()

  const [formState, setFormState] = useState<IProyectForm>(projectForEdit ? IProyectToIProyectForm(projectForEdit) : initializeProyectForm())
  const [users, setUsers] = useState<IUserByProjectForm[]>([])

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

  const getUsersByPrIdForForm = async () => {
    if (formState._pr_id) {
      const _users = await getUsersByPrId(formState._pr_id)
      const _usersParsed = _users.map((u: IUserByProject) => IUBPToIUBPF(u))
      setUsers(_usersParsed)
    }
  }

  useEffect(() => {
    setFormState(projectForEdit ? IProyectToIProyectForm(projectForEdit) : initializeProyectForm())
  }, [projectForEdit])

  useEffect(() => {
    getUsersByPrIdForForm()
  }, [formState._pr_id])

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
      <div className='w-full'>
        {users.map((u, index) => (
          <UserByProjectForm user={u} />
        ))}
      </div>
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
