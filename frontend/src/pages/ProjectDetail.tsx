import React, { useEffect, useState } from 'react'
import useGetProjectByIDDeep from '../hooks/project/useGetProjectByIDDeep'
import { useParams } from 'react-router'
import UserByProjectCard from '../components/project/UserByProjectCard'
import UserByProjectForm from '../components/project/UserByProjectForm'
import TicketByProjectCard from '../components/project/TicketByProjectCard'
import TicketByProjectForm from '../components/project/TicketByProjectForm'

export interface IProjectDeep {
  Ticket: ITicket[]
  UsuarioXProyecto: IUserWrapper[]
  pr_descripcion: string
  pr_id: string
  pr_nombre: string
  montoTotal: number
  usersNotInProject: IUser[]
}

export interface ITicket {
  ti_descripcion: string
  ti_fecha: string
  ti_id: number
  ti_monto: number
  ti_pr_id: number
  ti_us_id: string
  Usuario: IUsername
}

export interface IUserWrapper {
  Usuario: IUser
  uxp_porcentaje: number
}

export interface IUsername {
  us_nombre: string
}

export interface IUser {
  us_email: string
  us_nombre: string
}

const Project = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<IProjectDeep>()
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false)
  const { getProjectsByIDDeep } = useGetProjectByIDDeep()

  const getProject = async () => {
    const _project = await getProjectsByIDDeep(+id!)
    setProject(_project)
  }

  const handleAddUser = () => {
    setIsAddingUser(!isAddingUser)
  }

  const handleAddTicket = () => {
    setIsAddingTicket(!isAddingTicket)
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
        <div className="text-3xl text-white font-bold">{project?.montoTotal}</div>
      </div>

      <div>
        <div className="bg-[#1e293b] rounded-t-lg shadow-lg p-4 mb-4">
          <h2 className="text-2xl font-bold text-white mb-4">Integrantes</h2>
          <div className="space-y-4">
            {project?.UsuarioXProyecto.map((up: IUserWrapper) => (
              <UserByProjectCard
                up={up}
                monto={project?.montoTotal * (up.uxp_porcentaje / 100)}
              />
            ))}
          </div>
          {isAddingUser && project && (
            <UserByProjectForm
              setIsAddingUser={setIsAddingUser}
              updateProject={getProject}
              usersNotInProject={project.usersNotInProject}
            />
          )}
          <button
            className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
            onClick={handleAddUser}
          >
            {isAddingUser ? '➖' : '➕'}
          </button>
          <h2 className="text-2xl font-bold text-white mb-4 mt-4">Tickets</h2>
          <div className="space-y-4">
            {project?.Ticket.map((t: ITicket) => (
              <TicketByProjectCard t={t} />
            ))}
          </div>
          {isAddingTicket && project && (
            <TicketByProjectForm
              setIsAddingTicket={setIsAddingTicket}
              updateProject={getProject}
              usersInProyect={project.UsuarioXProyecto}
            />
          )}
          <button
            className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
            onClick={handleAddTicket}
          >
            {isAddingTicket ? '➖' : '➕'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Project
