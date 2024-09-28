import React, { useState } from 'react'
import TicketByProjectCard from './TicketByProjectCard'
import TicketByProjectForm from './TicketByProjectForm'
import { IProjectTicketsProps, ITicket } from '../../../interfaces'

const ProjectTickets = ({ projectTickets, getProjectTicketsAsync }: IProjectTicketsProps) => {
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
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {projectTickets.Ticket.map((t: ITicket, index: number) => (
          <TicketByProjectCard
            key={index}
            t={t}
          />
        ))}
      </div>

      {isUploadingTicket && (
        <div className="z-20">
          <div className="fixed w-full h-full flex inset-0 bg-green-500 bg-opacity-75 transition-opacity">
            <div className="fixed z-10 w-screen h-screen">
              <div className="flex flex-col min-h-full justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="h-60 w-96 bg-green-900 rounded p-4">
                  <h3 className="text-white">Subir ticket</h3>
                  <div className="mt-4">
                    <label
                      className="block mb-2 text-sm font-medium text-green-900"
                      htmlFor="file_input"
                    >
                      Upload file
                    </label>
                    <input
                      className="block w-full text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 dark:text-green-400 focus:outline-none dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400"
                      id="file_input"
                      type="file"
                    />
                  </div>
                  <div className="mt-3 flex justify-end items-end space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
                      onClick={() => {
                        alert('To do')
                        handleUploadTicket()
                      }}
                    >
                      Agregar
                    </button>
                    <button
                      className="bg-slate-500 hover:bg-slate-600 text-white rounded-md px-4 py-2"
                      onClick={handleUploadTicket}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isAddingTicket ? (
        <div className="flex gap-x-4">
          <button
            className="p-3 text-white mt-4 rounded-full bg-green-700 hover:bg-green-400"
            onClick={handleAddTicket}
          >
            {isAddingTicket ? '➖' : '➕'}
          </button>
          <button
            className="p-3 text-white mt-4 rounded-full bg-green-700 hover:bg-green-400"
            onClick={handleUploadTicket}
          >
            Subir ticket
          </button>
        </div>
      ) : (
        <TicketByProjectForm
          setIsAddingTicket={setIsAddingTicket}
          updateProject={getProjectTicketsAsync}
        />
      )}
    </>
  )
}

export default ProjectTickets
