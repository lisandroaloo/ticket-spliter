import React, { useState } from "react";
import TicketByProjectCard from "./TicketByProjectCard";
import TicketByProjectForm from "./TicketByProjectForm";
import { IProjectTicketsProps, ITicket, ITicketForm } from "../../../interfaces";
import useUploadTicket from "../../hooks/ticket/useUploadTicket";

const ProjectTickets = ({ projectTickets, updateProject, projectUsers }: IProjectTicketsProps) => {
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false);
  const [editingTicket, setEditingTicket] = useState<ITicketForm | undefined>(undefined)



  const handleAddTicket = () => {
    setIsAddingTicket(!isAddingTicket);

  };

  const handleEditTicket = (ticket: ITicket) => {
    const ticketForm: ITicketForm = {
      _ti_id: ticket.ti_id,
      _pr_id: ticket.ti_pr_id.toString(),
      _us_email: ticket.ti_us_id,
      _ti_monto: ticket.ti_monto.toString(),
      _ti_descripcion: ticket.ti_descripcion,
      _ti_fecha: new Date(ticket.ti_fecha),
      _ti_image_url: ticket.ti_image_url ? ticket.ti_image_url : "",
      userPercentage: ticket.UsuarioXTicket.map(up => { return { user: up.Usuario, percentage: up.uxt_porcentaje.toString() } })
    }


    setEditingTicket(ticketForm)
    setIsAddingTicket(true);
  }


  return (
    <>
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {projectTickets.Ticket.map((t: ITicket, index: number) => (
          <TicketByProjectCard
            key={index}
            t={t}
            onClickRow={handleEditTicket}
          />
        ))}
      </div>

      {!isAddingTicket ? (
        <div className="flex gap-x-4">
          <button
            className="p-3 text-white mt-4 rounded-full bg-green-700 hover:bg-green-400"
            onClick={handleAddTicket}
          >
            {isAddingTicket ? '➖' : '➕'}
          </button>
        </div>
      ) : (
        <TicketByProjectForm
          setIsAddingTicket={setIsAddingTicket}
          projectUsers={projectUsers}
          updateProject={updateProject}
          ticket={editingTicket}
          setEditingTicket={setEditingTicket}
        />
      )}
    </>
  )
};

export default ProjectTickets;
