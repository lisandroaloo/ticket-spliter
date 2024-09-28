import React, { useState } from 'react'
import TextInput from '../TextInput'
import { IEditProjectFormProps, IProject, IProjectDeep, IProjectForm } from '../../../interfaces'
import useEditProject from '../../hooks/project/useEditProject'

const instanciateEditProjectForm = (project: IProject): IProjectForm => {
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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div
        className="absolute inset-0 bg-green-950 opacity-50"
        onClick={() => setIsEditingProject(false)}
      ></div>

      {/* Contenedor del popup */}
      <div className="relative bg-green-700 p-6 rounded-lg shadow-lg max-w-lg w-full z-10">
        <h2 className="text-2xl text-green-100 font-bold mb-4">Editar Proyecto</h2>
        <div className="flex flex-col">
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
            placeholder="Descripción"
          />
        </div>

        <div className="mt-3 flex justify-end items-end space-x-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-green-100 rounded-md px-4 py-2"
            onClick={handleEditProject}
          >
            Confirmar
          </button>
          <button
            className="bg-green-300 hover:bg-green-100 text-green-800 rounded-md px-4 py-2"
            onClick={() => setIsEditingProject(false)}
          >
            Cancelar
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default EditProjectForm
