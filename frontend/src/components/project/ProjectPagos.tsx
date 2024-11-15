import React, { useEffect, useState } from 'react'
import PagoByProjectCard from './PagoByProjectCard'
import PagoByProjectForm from './PagoByProjectForm'
import { IPago, IPlanPagos, IProjectPagosProps } from '../../../interfaces'
//import useGetPlanPagos from '../../hooks/pagos/useGetPlanPagos'
import ProjectPagosCardPend from './ProjectPagosCardPend'



const ProjectPagos = ({ projectPagos, planPagos, updateProject, projectUsers, getProjectUsersAsync, }: IProjectPagosProps) => {
  const [isAddingPago, setIsAddingPago] = useState<boolean>(false)

  const handleAddPago = () => {
    setIsAddingPago(!isAddingPago)
  }




  return (
    <>

      <div className='flex justify-around  h-[30vh] space-x-3  overflow-y-scroll no-scrollbar'>


        <div className='h-[30vh] w-50 '>
          <h2>Pagos pendientes</h2>

          {planPagos?.map((p: IPlanPagos, index: number) => (
            <ProjectPagosCardPend
              key={index}
              p={p}
            />
          ))}
        </div>

        <div className='h-[30vh] w-50 '>
          <h2>Pagos realizados</h2>
          {projectPagos.map((p: IPago, index: number) => (
            <PagoByProjectCard
              key={index}
              p={p}
            />
          ))}
        </div>




      </div>


      {!isAddingPago ? <button
        className="p-3 text-white mt-4 rounded-full bg-green-700 hover:bg-green-400"
        onClick={handleAddPago}
      >
        {isAddingPago ? '➖' : '➕'}
      </button> : <PagoByProjectForm
        setIsAddingPago={setIsAddingPago}
        updateProject={updateProject}
        usersInProyect={projectUsers}
        getProjectUsersAsync={getProjectUsersAsync}

      />}



    </>
  )
}

export default ProjectPagos