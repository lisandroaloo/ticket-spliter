import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import TextInput from '../TextInput'
import useCreateProject from '../../hooks/project/useCreateProject'
import { IProject } from '../../pages/ProjectsList'
// import useEditProject from '../../hooks/project/useEditProject'
import useGetProjects from '../../hooks/project/UseGetProjects'
// import useGetUsersByPrId from '../../hooks/user/useGetUsersByPrID'
// import UserByProjectForm from './UserByProjectForm'

export interface IProjectFormProps {
  setProjects: Dispatch<SetStateAction<IProject[]>>
}

export interface IProjectForm {
  _pr_id: string
  _pr_nombre: string
  _pr_descripcion: string
}

export interface IUserByProjectForm {
  _uxp_us_id: string
  _uxp_porcentaje?: string
  _pr_id: string
}

const initializeProjectForm = (): IProjectForm => {
  const form = {
    _pr_id: '',
    _pr_nombre: '',
    _pr_descripcion: '',
  }

  return form
}

// const IProjectToIProjectForm = (ip: IProject): IProjectForm => {
//   return {
//     _pr_id: ip.pr_id,
//     _pr_nombre: ip.pr_nombre,
//     _pr_descripcion: ip.pr_descripcion,
//   }
// }

// const IUBPToIUBPF = (ubp: IUserByProject): IUserByProjectForm => {
//   return {
//     _uxp_us_id: ubp.uxp_us_id,
//     _uxp_pr_id: ubp.uxp_pr_id,
//     _uxp_porcentaje: ubp.uxp_porcentaje,
//   }
// }

const ProjectForm = ({ setProjects }: IProjectFormProps) => {
  const { loading: loadingC, createProject } = useCreateProject()
  // const { loading: loadingE, editProject } = useEditProject()
  const { loading: loadingGP, getProjects } = useGetProjects()
  // const { loading: loadingGU, getUsersByPrId } = useGetUsersByPrId()

  // const [formState, setFormState] = useState<IProjectForm>(projectForEdit ? IProjectToIProjectForm(projectForEdit) : initializeProjectForm())
  const [formState, setFormState] = useState<IProjectForm>(initializeProjectForm())
  // const [users, setUsers] = useState<IUserByProjectForm[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCreateProject = async () => {
    await createProject(formState)
    const _projects = await getProjects()
    setProjects(_projects)
    setFormState(initializeProjectForm())
  }

  // const handleEditProject = async () => {
  //   await editProject(formState)
  //   const _projects = await getProjects()
  //   setProjects(_projects)
  //   setFormState(initializeProjectForm())
  // }

  // const getUsersByPrIdForForm = async () => {
  //   if (formState._pr_id) {
  //     const _users = await getUsersByPrId(formState._pr_id)
  //     const _usersParsed = _users.map((u: IUserByProject) => IUBPToIUBPF(u))
  //     setUsers(_usersParsed)
  //   }
  // }

  // useEffect(() => {
  //   setFormState(projectForEdit ? IProjectToIProjectForm(projectForEdit) : initializeProjectForm())
  // }, [projectForEdit])

  // useEffect(() => {
  //   getUsersByPrIdForForm()
  // }, [formState._pr_id])

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
      {/* <div className='w-full'>
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
            onClick={handleEditProject}
          >
            Editar
          </button>
        </div>
      ) : ( */}
        <button
          className="bg-slate-300 rounded p-2 my-1"
          onClick={handleCreateProject}
        >
          Crear
        </button>
      {/* )} */}
    </div>
  )
}

export default ProjectForm
