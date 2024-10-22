import React, { useState } from 'react'
import TextInput from '../TextInput'
import { useParams } from 'react-router'
import useCreatePago from '../../hooks/pagos/useCreatePago'
import { ICreatePago, IPagoByProjectFormProps, IPagoForm } from '../../../interfaces'
import { useAuthContext } from '../../context/AuthContext'

export default function PagoByProjectForm({ pago, setIsAddingPago, updateProject, usersInProyect, getProjectUsersAsync }: IPagoByProjectFormProps) {
  const { id } = useParams<{ id: string }>()
  const { loading, createPago } = useCreatePago()
  const { authUser } = useAuthContext()

  const [formState, setFormState] = useState<IPagoForm>(
    pago || {
      pa_fecha: new Date(),
      pa_us_receptor_id: '',
      pa_monto: '0',
      pa_pr_id: id || '',
    }
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleUserDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState(prevState => ({
      ...prevState,
      pa_us_receptor_id: e.target.value,
    }))
  }

  const handleAddPagoToProject = async () => {
    try {
      const _form: ICreatePago = {
        pa_fecha: formState.pa_fecha,
        pa_monto: +formState.pa_monto,
        pr_id: +formState.pa_pr_id,
        receptor_us_email: formState.pa_us_receptor_id
      } 
      await createPago(_form)
      setFormState({
        pa_fecha: new Date(),
        pa_us_receptor_id: '',
        pa_monto: '0',
        pa_pr_id: id || '',
      })
      setIsAddingPago(false)
      await updateProject()
      getProjectUsersAsync()
    } catch (error) {
      console.error('Error creating pago:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg mt-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <select
            name="pa_us_receptor_id"
            value={formState.pa_us_receptor_id}
            onChange={handleUserDropdownChange}
            className="bg-green-700 text-green-100 rounded-md p-2 w-full"
          >
            <option
              className="bg-green-200 text-green-950"
              value=""
              disabled
            >
              Seleccionar usuario
            </option>
            {usersInProyect
              .filter((uip) => uip.Usuario.us_email !== authUser)
              .map((uip) => (
                <option
                  key={uip.Usuario.us_email}
                  value={uip.Usuario.us_email}
                >
                  {uip.Usuario.us_nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="space-y-2">
          <TextInput
            type="text"
            name="pa_monto"
            value={formState.pa_monto}
            handleInputChange={handleInputChange}
            placeholder="Monto"
            classNames="bg-green-700 text-green-100 rounded-md p-2 w-full placeholder-green-300"
          />
        </div>
        <div className="flex justify-end items-end space-x-2">
          <button
            className="bg-green-700 hover:bg-green-800 text-green-100 rounded-md px-4 py-2 disabled:opacity-50"
            onClick={handleAddPagoToProject}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
          <button
            className="bg-green-300 hover:bg-green-100 text-green-800 rounded-md px-4 py-2"
            onClick={() => setIsAddingPago(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}