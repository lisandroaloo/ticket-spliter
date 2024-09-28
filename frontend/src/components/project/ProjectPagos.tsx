import React, { useState } from 'react'
import PagoByProjectCard from './PagoByProjectCard'
import PagoByProjectForm from './PagoByProjectForm'
import { IPago, IProjectPagosProps } from '../../../interfaces'

const ProjectPagos = ({ projectPagos, getProjectPagosAsync, projectUsers,getProjectUsersAsync }: IProjectPagosProps) => {
  const [isAddingPago, setIsAddingPago] = useState<boolean>(false)

  const handleAddPago = () => {
    setIsAddingPago(!isAddingPago)
  }
  return (
    <>
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {projectPagos.map((p: IPago, index: number) => (
          <PagoByProjectCard
            key={index}
            p={p}
          />
        ))}
      </div>
   
      {!isAddingPago ? <button
        className="p-3 text-white mt-4 rounded-full bg-green-700 hover:bg-green-400"
        onClick={handleAddPago}
      >
        {isAddingPago ? '➖' : '➕'}
      </button> : <PagoByProjectForm
        setIsAddingPago={setIsAddingPago}
        updateProject={getProjectPagosAsync}
        usersInProyect={projectUsers}
        getProjectUsersAsync={getProjectUsersAsync}
        
      />}



    </>
  )
}

export default ProjectPagos