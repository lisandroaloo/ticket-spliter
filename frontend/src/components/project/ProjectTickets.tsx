import React, { useState } from 'react'
import TicketByProjectCard from './TicketByProjectCard'
import TicketByProjectForm from './TicketByProjectForm'
import { IProjectTicketsProps, ITicket } from '../../../interfaces'

const ProjectTickets = ({ project, getProject }: IProjectTicketsProps) => {
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false)
  const [isUploadingTicket, setIsUploadingTicket] = useState<boolean>(false)

  const handleAddTicket = () => {
    setIsAddingTicket(!isAddingTicket)
    setIsUploadingTicket(false)
  }

  const handleUploadTicket = () => {
    setIsUploadingTicket(!isUploadingTicket)
    setIsAddingTicket(false)
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-4 mt-4">Tickets</h2>
      <div className="space-y-4">
        {project?.Ticket.map((t: ITicket, index: number) => (
          <TicketByProjectCard
            key={index}
            t={t}
          />
        ))}
      </div>
      {isAddingTicket && project && (
        <TicketByProjectForm
          setIsAddingTicket={setIsAddingTicket}
          updateProject={getProject}
          usersInProyect={project.UsuarioXProyecto}
        />
      )}

      {isUploadingTicket && (
        <div className="z-20">
          <div className="fixed w-full h-full flex inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
            <div className="fixed z-10 w-screen h-screen">
              <div className="flex flex-col min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="h-60 w-96 bg-slate-900 rounded p-4">
                  <h3 className="text-white">Subir ticket</h3>
                  <div className="mt-4">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="bg-slate-500 px-3 py-2 rounded mt-4"
                      onClick={handleUploadTicket}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="bg-slate-500 px-3 py-2 rounded mt-4"
                      onClick={()=>{alert("To do");handleUploadTicket()}}
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
        onClick={handleAddTicket}
      >
        {isAddingTicket ? '➖' : '➕'}
      </button>
      <button
        className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
        onClick={handleUploadTicket}
      >
        Subir ticket
      </button>
    </>
  )
}

export default ProjectTickets
