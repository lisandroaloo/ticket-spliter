import React, { useState } from "react";
import TicketByProjectCard from "./TicketByProjectCard";
import TicketByProjectForm from "./TicketByProjectForm";
import { IProjectTicketsProps, ITicket } from "../../../interfaces";
import useUploadTicket from "../../hooks/ticket/useUploadTicket";

const ProjectTickets = ({ projectTickets, updateProject, projectUsers }: IProjectTicketsProps) => {
  const [isAddingTicket, setIsAddingTicket] = useState<boolean>(false);



  const handleAddTicket = () => {
    setIsAddingTicket(!isAddingTicket);

  };


  return (
    <>
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {projectTickets.Ticket.map((t: ITicket, index: number) => (
          <TicketByProjectCard key={index} t={t} />
        ))}
      </div>

      {!isAddingTicket ? (
        <div className="flex gap-x-4">
          <button
            className="p-3 text-white mt-4 rounded-full bg-green-700 hover:bg-green-400"
            onClick={handleAddTicket}
          >
            {isAddingTicket ? "➖" : "➕"}
          </button>

        </div>
      ) : (
        <TicketByProjectForm
          setIsAddingTicket={setIsAddingTicket}
          projectUsers={projectUsers}
          updateProject={updateProject}
        />
      )}
    </>
  );
};

export default ProjectTickets;
