import React, { useState } from 'react'
import TextInput from '../TextInput'
import { useParams } from 'react-router'
import useCreateTicket, { ITicketForm } from '../../hooks/ticket/useCreateTicket'

export interface ITicketByProjectFormProps {
  ticket?: ITicketForm
  setIsAddingTicket: React.Dispatch<React.SetStateAction<boolean>>
  updateProject: () => Promise<void>
}

const TicketByProjectForm = ({ ticket, setIsAddingTicket, updateProject }: ITicketByProjectFormProps) => {
  const { id } = useParams<{ id: string }>()

  const { loading, createTicket } = useCreateTicket()

  const initialize = (): ITicketForm => {
    const form: ITicketForm = {
      _pr_id: id ? id : "",
      _ti_descripcion: '',
      _ti_fecha: new Date(),
      _ti_monto: "0",
      _us_email: ""
    }

    return form
  }

  const [formState, setFormState] = useState<ITicketForm>(ticket ? ticket : initialize())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleAddTicketToProject = async () => {
    await createTicket(formState)
    setFormState(initialize())
    setIsAddingTicket(false)
    updateProject()
  }

  return (
    <div className="flex bg-slate-500 justify-between">
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_pr_id"
          value={formState._pr_id}
          handleInputChange={handleInputChange}
          placeholder="Proyecto"
          readOnly={id !== undefined}
        />
      </div>
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_us_email"
          value={formState._us_email}
          handleInputChange={handleInputChange}
          placeholder="UsId"
        />
      </div>
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_ti_monto"
          value={formState._ti_monto}
          handleInputChange={handleInputChange}
          placeholder="Monto"
        />
      </div>
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_ti_descripcion"
          value={formState._ti_descripcion}
          handleInputChange={handleInputChange}
          placeholder="Descripcion"
        />
      </div>
      <button
        className="bg-slate-300 rounded p-2 my-1"
        onClick={handleAddTicketToProject}
      >
        Crear
      </button>
    </div>
  )
}

export default TicketByProjectForm
