import React, { useEffect, useState } from 'react'
import useGetProjectByIDDeep from '../hooks/project/useGetProjectByIDDeep'
import { useParams } from 'react-router'
import UserByProjectCard from '../components/project/UserByProjectCard'
import UserByProjectForm from '../components/project/UserByProjectForm'

export interface IProjectDeep {
  UsuarioXProyecto: IUserWrapper[]
  pr_descripcion: string
  pr_id: string
  pr_nombre: string
}

export interface IUserWrapper {
  Usuario: IUsername
  uxp_porcentaje: number
}

export interface IUsername {
  us_nombre: string
}

const Project = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<IProjectDeep>()
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const { getProjectsByIDDeep } = useGetProjectByIDDeep()

  const getProject = async () => {
    const _project = await getProjectsByIDDeep(+id!)
    setProject(_project)
  }

  const handleAddUser = () => {
    setIsAddingUser(true)
  }

  useEffect(() => {
    getProject()
  }, [])

  return (
    <section className="h-[92vh] bg-gray-900">
      <div className="flex items-center justify-center mb-4 space-x-3">
        <h1 className="text-white">{project?.pr_nombre}</h1>
        <button className="p-3 text-white rounded-full bg-gray-700 hover:bg-gray-400">✏️</button>
      </div>
      <div className="bg-[#1e293b] rounded-lg shadow-lg mb-6 p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Gastos</h2>
        <div className="text-3xl text-white font-bold">$52300000</div>
      </div>

      <div>
        <div className="bg-[#1e293b] rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-2xl font-bold text-white mb-4">Integrantes</h2>
          <div className="space-y-4">
            {project?.UsuarioXProyecto.map((up: IUserWrapper) => (
              <UserByProjectCard up={up} />
            ))}
          </div>
          {isAddingUser && (
            <UserByProjectForm
              setIsAddingUser={setIsAddingUser}
              updateProject={getProject}
            />
          )}
          <button
            className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
            onClick={handleAddUser}
          >
            ➕
          </button>
        </div>
      </div>
    </section>
  )
}

export default Project
