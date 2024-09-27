import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useCreateTicket from '../../hooks/ticket/useCreateTicket'
import { ITicketByProjectFormProps, ITicketForm } from '../../../interfaces'

export default function TicketByProjectForm({ ticket, setIsAddingTicket, updateProject }: ITicketByProjectFormProps) {
  const { id } = useParams<{ id: string }>()
  const { loading, createTicket } = useCreateTicket()

  const [formState, setFormState] = useState<ITicketForm>(
    ticket || {
      _pr_id: id || '',
      _ti_descripcion: '',
      _ti_fecha: new Date(),
      _ti_monto: '0',
      _us_email: '',
    }
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleAddTicketToProject = async () => {
    try {
      await createTicket(formState)
      setFormState({
        _pr_id: id || '',
        _ti_descripcion: '',
        _ti_fecha: new Date(),
        _ti_monto: '0',
        _us_email: '',
      })
      setIsAddingTicket(false)
      updateProject()
    } catch (error) {
      console.error('Error creating ticket:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="bg-slate-700 rounded-lg mt-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          
          <input
            type="number"
            id="_ti_monto"
            name="_ti_monto"
            value={formState._ti_monto}
            onChange={handleInputChange}
            placeholder="Monto"
            className="bg-slate-600 text-white rounded-md p-2 w-full"
          />
        </div>
        <div className="space-y-2">
         
          <input
            type="text"
            id="_ti_descripcion"
            name="_ti_descripcion"
            value={formState._ti_descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            className="bg-slate-600 text-white rounded-md p-2 w-full"
          />
        </div>
        <div className="flex items-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 disabled:opacity-50"
            onClick={handleAddTicketToProject}
            disabled={loading}
          >
            {loading ? 'Subiendo...' : 'Subir'}
          </button>
          <button
            className="bg-slate-500 hover:bg-slate-600 text-white rounded-md px-4 py-2"
            onClick={() => setIsAddingTicket(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}