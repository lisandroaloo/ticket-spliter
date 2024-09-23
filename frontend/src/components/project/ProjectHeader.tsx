import React, { useState } from 'react'
import { IProjectHeaderProps } from '../../../interfaces'
import EditProjectForm from './EditProjectForm'

const ProjectHeader = ({ project, getProject }: IProjectHeaderProps) => {
  const [isEditingProject, setIsEditingProject] = useState<boolean>(false)
  
  const handleClick = () => {
    setIsEditingProject(!isEditingProject)
  }
  
  return (
    <>
      <div
        className="flex flex-col items-center justify-center mb-4 space-x-3 text-white cursor-text"
        onClick={handleClick}
      >
        <h1>{project.pr_nombre}</h1>
        <p>{project.pr_descripcion}</p>
      </div>
      {isEditingProject && (
        <EditProjectForm
          project={project}
          getProject={getProject}
          setIsEditingProject={setIsEditingProject}
        />
      )}
      <div className="bg-[#1e293b] rounded-lg shadow-lg mb-6 p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Gastos</h2>
        <div className="text-3xl text-white font-bold">{project.montoTotal}</div>
      </div>
    </>
  )
}

export default ProjectHeader