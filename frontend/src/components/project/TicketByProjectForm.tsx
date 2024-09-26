import React, { useState } from 'react'
import TextInput from '../TextInput'
import { useParams } from 'react-router'
import useCreateTicket from '../../hooks/ticket/useCreateTicket'
import { ITicketByProjectFormProps, ITicketForm } from '../../../interfaces'

const TicketByProjectForm = ({ ticket, setIsAddingTicket, updateProject }: ITicketByProjectFormProps) => {
  const { id } = useParams<{ id: string }>()

  const { loading, createTicket } = useCreateTicket()

  const initialize = (): ITicketForm => {
    const form: ITicketForm = {
      _pr_id: id ? id : '',
      _ti_descripcion: '',
      _ti_fecha: new Date(),
      _ti_monto: '0',
      _us_email: '',
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

  // const handleUserDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target

  //   setFormState((prevState) => ({
  //     ...prevState,
  //     _us_email: value,
  //   }))
  // }

  const handleAddTicketToProject = async () => {
    await createTicket(formState)
    setFormState(initialize())
    setIsAddingTicket(false)
    updateProject()
  }

  return (
    <div
      className="flex bg-slate-500 justify-around rounded mt-3"
    >
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
      {/* <select
        name="_us_email"
        onChange={handleUserDropdownChange}
        className="bg-slate-300 rounded p-2 my-1"
      >
        <option
          value=""
          selected
        ></option>
        {usersInProyect.map((uip) => (
          <option value={uip.Usuario.us_email}>{uip.Usuario.us_nombre}</option>
        ))}
      </select> */}
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
