import React, { useState } from 'react'
import TextInput from '../TextInput'
import useCreateProject from '../../hooks/project/useCreateProject'
import useGetProjects from '../../hooks/project/UseGetProjects'
import { IProjectForm, IProjectFormProps } from '../../../interfaces'

const initializeProjectForm = (): IProjectForm => {
  const form = {
    _pr_id: '',
    _pr_nombre: '',
    _pr_descripcion: '',
  }

  return form
}

const ProjectForm = ({ setProjects }: IProjectFormProps) => {
  const { loading: loadingC, createProject } = useCreateProject()
  const { loading: loadingGP, getProjects } = useGetProjects()

  const [formState, setFormState] = useState<IProjectForm>(initializeProjectForm())

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
        <button
          className="bg-slate-300 rounded p-2 my-1"
          onClick={handleCreateProject}
        >
          Crear
        </button>
    </div>
  )
}

export default ProjectForm
