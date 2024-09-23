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
      <h2 className="text-2xl font-bold text-white mb-4 mt-4">Pagos</h2>
      <div className="space-y-4">
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