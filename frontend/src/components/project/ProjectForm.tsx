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
    <div className="mb-8 space-y-4 bg-gray-800 p-6 rounded-lg">
      <TextInput
        type="text"
        name="_pr_nombre"
        value={formState._pr_nombre}
        handleInputChange={handleInputChange}
        placeholder="Nombre"
        classNames="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <TextInput
        type="text"
        name="_pr_descripcion"
        value={formState._pr_descripcion}
        handleInputChange={handleInputChange}
        placeholder="Descripcion"
        classNames="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        <button

          onClick={handleCreateProject}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear
        </button>
    </div>
  )
}

export default ProjectForm
