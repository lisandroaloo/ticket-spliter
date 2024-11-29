import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCreateTicket from '../../hooks/ticket/useCreateTicket'
import useUploadTicket from '../../hooks/ticket/useUploadTicket'
import { ITicketByProjectFormProps, ITicketForm, IUser, IUserPercentage } from '../../../interfaces'
import toast from 'react-hot-toast'




export default function TicketByProjectForm({ ticket, setIsAddingTicket, updateProject, projectUsers, setEditingTicket }: ITicketByProjectFormProps) {
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
      _ti_image_url: '',
      userPercentage: projectUsers.map((user) => ({
        user: user.Usuario,
        percentage: '0', // inicializar todos los porcentajes a '0'
      })),
    }
  )

  const equalPercentages = async () => {
    const porcentaje = (100 / projectUsers.length).toString(); 
  
    console.log(porcentaje);
  
    const newPercentages = formState.userPercentage.map((user) => ({
      ...user,
      percentage: porcentaje,  
    }));
  

    setFormState((prevState) => ({
      ...prevState,
      userPercentage: newPercentages,  
    }));
  
  
    console.log({ ...formState, userPercentage: newPercentages });
  
  
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _file = event.target.files?.[0]
    if (_file) {
      setFile(_file)
    }
  }

  const handleAddTicketToProject = async () => {
    let total = 0

    try {
      formState.userPercentage.forEach(percentage => {
        if (parseFloat(percentage.percentage) < 0) {

          throw new Error()
        }
        total += parseFloat(percentage.percentage)
      })

      if (total !== 100) {
        toast.error('Los porcentajes deben sumar 100%')
      }


      else {
        try {
          if (file) {
            const res = await uploadFile(file)

            await createTicket({ ...formState, _ti_image_url: res.url })
          } else {
            await createTicket({ ...formState })
          }

          setFormState({
            _pr_id: id || '',
            _ti_descripcion: '',
            _ti_fecha: new Date(),
            _ti_monto: '0',
            _us_email: '',
            _ti_image_url: '',
            userPercentage: projectUsers.map((user) => ({
              user: user.Usuario,
              percentage: '0', // inicializar todos los porcentajes a '0'
            })),
          })
          setEditingTicket(undefined)
          setIsAddingTicket(false)
          updateProject()
        } catch (error) {
          console.error('Error creating ticket:', error)
        }
      }

    } catch (e) {
      toast.error('Los porcentajes no pueden ser negativos')
    }



  }

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPercentages = [...formState.userPercentage]
    newPercentages[index].percentage = e.target.value
    setFormState((prevState) => ({ ...prevState, userPercentages: newPercentages }))
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg p-6 w-96">
        <div className="flex-column  items-center mb-4">
          <div className="flex-column mb-2 space-y-3 items-center">
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
              className="text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 dark:text-green-400 focus:outline-none dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400"
              id="file_input"
              type="file"
              onChange={handleFileUpload}
            />
            {isUploading && <p className="text-sm text-green-200">Uploading...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        {/* Tabla de porcentajes */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {formState.userPercentage.map((user, index) => (
                <tr
                  key={index}
                  className="border-t"
                >
                  <td className="px-4 py-2">{user.user.us_nombre}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={user.percentage}
                      onChange={(e) => handlePercentageChange(e, index)}
                      className="bg-green-50 text-green-900 border border-green-300 rounded-md p-2 w-24"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-2">
          <button
            className="bg-green-700 hover:bg-green-800 text-green-100 rounded-md px-4 py-2 disabled:opacity-50"
            onClick={handleAddTicketToProject}
            disabled={loading || isUploading}
          >
            {loading ? 'Subiendo...' : 'Confirmar'}
          </button>
          <button
            className="bg-green-300 hover:bg-green-100 text-green-800 rounded-md px-4 py-2"
            onClick={() => {
              setFormState({
                _pr_id: id || '',
                _ti_descripcion: '',
                _ti_fecha: new Date(),
                _ti_monto: '0',
                _us_email: '',
                _ti_image_url: '',
                userPercentage: projectUsers.map((user) => ({
                  user: user.Usuario,
                  percentage: '0', // inicializar todos los porcentajes a '0'
                })),
              })
              setEditingTicket(undefined)
              setIsAddingTicket(false)
            }}
          >
            Cancelar
          </button>
          <button className='ml-2' onClick={equalPercentages}>⚖️</button>
        </div>
      </div>
    </div>
  )
}
