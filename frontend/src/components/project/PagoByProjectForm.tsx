import React, {  useState } from 'react'
import TextInput from '../TextInput'
import { useParams } from 'react-router'
import useCreatePago from '../../hooks/pagos/useCreatePago'
import { ICreatePago, IPagoByProjectFormProps, IPagoForm } from '../../../interfaces'
import { useAuthContext } from '../../context/AuthContext'

const PagoByProjectForm = ({ pago, setIsAddingPago, updateProject, usersInProyect }: IPagoByProjectFormProps) => {
  const { id } = useParams<{ id: string }>()

  const { loading, createPago } = useCreatePago()
  const {authUser} = useAuthContext()

  const initialize = (): IPagoForm => {
    const form: IPagoForm = {
      pa_fecha: new Date(),
      pa_us_receptor_id: '',
      pa_monto: '0',
      pa_pr_id: id ? id : '',
    }

    return form
  }

  const [formState, setFormState] = useState<IPagoForm>(pago ? pago : initialize())

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleUserDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      pa_us_receptor_id: value,
    }))
  }

  const handleAddPagoToProject = async () => {
    const _form: ICreatePago = {
      pa_fecha: formState.pa_fecha,
      pa_monto: +formState.pa_monto,
      pr_id: +formState.pa_pr_id,
      receptor_us_email: formState.pa_us_receptor_id
    } 
    await createPago(_form)
    setFormState(initialize())
    setIsAddingPago(false)
    updateProject()
  }

  return (
    <div className="flex bg-slate-500 justify-around rounded mt-3">
      <div className="w-3/12">
        <TextInput
          type="text"
          name="pa_pr_id"
          value={formState.pa_pr_id}
          handleInputChange={handleInputChange}
          placeholder="Proyecto"
          readOnly={id !== undefined}
        />
      </div>
      <select
        name="pa_us_receptor_id"
        onChange={handleUserDropdownChange}
        className="bg-slate-300 rounded p-2 my-1"
      >
        <option
          value=""
          selected
        ></option>
        {usersInProyect.filter((uip) => 
          uip.Usuario.us_email !== authUser
        ).map((uip) => (
          <option value={uip.Usuario.us_email}>{uip.Usuario.us_nombre}</option>
        ))}
      </select>
      <div className="w-3/12">
        <TextInput
          type="text"
          name="pa_monto"
          value={formState.pa_monto}
          handleInputChange={handleInputChange}
          placeholder="Monto"
        />
      </div>
      <button
        className="bg-slate-300 rounded p-2 my-1"
        onClick={handleAddPagoToProject}
      >
        Crear
      </button>
    </div>
  )
}

export default PagoByProjectForm
