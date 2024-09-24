import React, { useState } from 'react'
import PagoByProjectCard from './PagoByProjectCard'
import PagoByProjectForm from './PagoByProjectForm'
import { IPago, IProjectPagosProps } from '../../../interfaces'

const ProjectPagos = ({getProject,project}: IProjectPagosProps) => {
  
  const [isAddingPago, setIsAddingPago] = useState<boolean>(false)

  const handleAddPago = () => {
    setIsAddingPago(!isAddingPago)
  }
  return (
    <>
  
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {project?.Pago.map((p: IPago, index: number) => (
          <PagoByProjectCard
            key={index}
            p={p}
          />
        ))}
      </div>
      {isAddingPago && project && (
        <PagoByProjectForm
          setIsAddingPago={setIsAddingPago}
          updateProject={getProject}
          usersInProyect={project.UsuarioXProyecto}
        />
      )}
      <button
        className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
        onClick={handleAddPago}
      >
        {isAddingPago ? '➖' : '➕'}
      </button>
    </>
  )
}

export default ProjectPagos