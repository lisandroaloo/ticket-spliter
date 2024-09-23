import React, { useState } from 'react'
import TextInput from '../TextInput'
import { IEditProjectFormProps, IProjectDeep, IProjectForm } from '../../../interfaces'
import useEditProject from '../../hooks/project/useEditProject'

const instanciateEditProjectForm = (project: IProjectDeep): IProjectForm => {
  const form = {
    _pr_id: project.pr_id,
    _pr_nombre: project.pr_nombre,
    _pr_descripcion: project.pr_descripcion,
  }

  return form
}

const EditProjectForm = ({ project, getProject, setIsEditingProject }: IEditProjectFormProps) => {
  const [formState, setFormState] = useState<IProjectForm>(instanciateEditProjectForm(project))

  const { loading, editProject } = useEditProject()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleEditProject = async () => {
    await editProject(formState)
    getProject()
    setIsEditingProject(false)
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
        onClick={handleEditProject}
      >
        Confirmar
      </button>
    </div>
  )
}

export default EditProjectForm
