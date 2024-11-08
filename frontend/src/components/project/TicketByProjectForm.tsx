import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useCreateTicket from '../../hooks/ticket/useCreateTicket'
import useUploadTicket from '../../hooks/ticket/useUploadTicket'
import { ITicketByProjectFormProps, ITicketForm } from '../../../interfaces'

export default function TicketByProjectForm({ ticket, setIsAddingTicket, updateProject }: ITicketByProjectFormProps) {
  const { id } = useParams<{ id: string }>()
  const { loading, createTicket } = useCreateTicket()
  const { uploadFile, isUploading, error } = useUploadTicket()
  const [file, setFile] = useState<File | undefined>(undefined)


  const [formState, setFormState] = useState<ITicketForm>(
    ticket || {
      _pr_id: id || '',
      _ti_descripcion: '',
      _ti_fecha: new Date(),
      _ti_monto: '0',
      _us_email: '',
      _ti_image_url: ""
    }
  )



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event.target.files?.[0]
    if (_file) {
      setFile(_file)
    }
  }

  const handleAddTicketToProject = async () => {
    try {
      if (file) {
        console.log("ingrese");

        const res = await uploadFile(file)

        console.log(res.url);

        await createTicket({ ...formState, _ti_image_url: res.url })
      }
      else {

        await createTicket({ ...formState })
      }


      setFormState({
        _pr_id: id || '',
        _ti_descripcion: '',
        _ti_fecha: new Date(),
        _ti_monto: '0',
        _us_email: '',
        _ti_image_url: ""
      })
      setIsAddingTicket(false)
      updateProject()
    } catch (error) {
      console.error('Error creating ticket:', error)
      // Aquí podrías manejar el error (por ejemplo, mostrar un mensaje al usuario)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg mt-3 p-3">
      <div className="flex  justify-between ">
        <div className='flex items-center gap-4 '>

          <input
            type="number"
            id="_ti_monto"
            name="_ti_monto"
            value={formState._ti_monto}
            onChange={handleInputChange}
            placeholder="Monto"
            className="bg-green-700 text-green-100 rounded-md p-2 placeholder-green-300 w-24"
          />

          <input
            type="text"
            id="_ti_descripcion"
            name="_ti_descripcion"
            value={formState._ti_descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            className="bg-green-700 text-green-100 rounded-md p-2 placeholder-green-300 w-72"
          />

          <input
            className="   text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 dark:text-green-400 focus:outline-none dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400"
            id="file_input"
            type="file"
            onChange={handleFileUpload}
          />

          {isUploading && <p className="text-sm text-green-200">Uploading...</p>}

          {error && <p className="text-sm text-red-500">{error}</p>}

        </div>
        <div className='flex'>

          <button
            className="bg-green-700 hover:bg-green-800 text-green-100 rounded-md px-4 py-2 disabled:opacity-50"
            onClick={handleAddTicketToProject}
            disabled={loading || isUploading}
          >
            {loading ? 'Subiendo...' : 'Subir'}
          </button>

          <button
            className="bg-green-300 hover:bg-green-100 text-green-800 rounded-md px-4 py-2"
            onClick={() => setIsAddingTicket(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
