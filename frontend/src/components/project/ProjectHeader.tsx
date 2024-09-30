import React, { useState } from 'react'
import { IProjectHeaderProps } from '../../../interfaces'
import EditProjectForm from './EditProjectForm'

const ProjectHeader = ({ projectDetail, loadingDetail, getProjectDetailAsync, monto }: IProjectHeaderProps) => {
  const [isEditingProject, setIsEditingProject] = useState<boolean>(false)

  const handleClick = () => {
    setIsEditingProject(!isEditingProject)
  }

  return (
    <>
      <div
        className="flex   flex-col items-center justify-center pt-2 mb-2 space-x-3 text-green-600 cursor-text"
        onClick={handleClick}
      >
        {loadingDetail || !projectDetail ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
          </div>
        ) : (
          <>
            <h1>{projectDetail.pr_nombre}</h1>
            <p>{projectDetail.pr_descripcion}</p>
          </>
        )}
      </div>
      {isEditingProject && !loadingDetail && projectDetail && (
        <EditProjectForm
          project={projectDetail}
          getProject={getProjectDetailAsync}
          setIsEditingProject={setIsEditingProject}
        />
      )}

      <div className="bg-gradient-to-br from-emerald-200 to-green-300 md:mx-4 rounded-lg shadow-lg mb-6 p-4">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Gastos</h2>
        {!monto ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
          </div>
        ) : (
          <div className="text-3xl text-green-600 font-bold">{monto.montoTotal}</div>
        )}
      </div>
    </>
  )
}

export default ProjectHeader