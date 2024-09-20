import React, { useState } from 'react'
import TicketByProjectCard from './TicketByProjectCard'
import TicketByProjectForm from './TicketByProjectForm'
import { IProjectTicketsProps, ITicket } from '../../../interfaces'

const ProjectTickets = ({project,getProject}: IProjectTicketsProps) => {
  
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false)

  
  const handleAddTicket = () => {
    setIsAddingTicket(!isAddingTicket)
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
      <button
        className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
        onClick={handleAddTicket}
      >
        {isAddingTicket ? '➖' : '➕'}
      </button>
    </>
  )
}

export default ProjectTickets