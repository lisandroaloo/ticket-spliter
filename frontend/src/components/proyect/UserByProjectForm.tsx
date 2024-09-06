import React, { useState } from 'react'
import { IUserByProjectForm } from './ProyectForm'
import TextInput from '../TextInput'

export interface IUserByProjectFormProps {
  user: IUserByProjectForm
}

const UserByProjectForm = ({ user }: IUserByProjectFormProps) => {
  const [formState, setFormState] = useState<IUserByProjectForm>(user)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className="flex bg-slate-500 justify-between">
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_uxp_pr_id"
          value={formState._uxp_pr_id}
          placeholder="Proyecto"
          readOnly
        />
      </div>
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_uxp_us_id"
          value={formState._uxp_us_id}
          handleInputChange={handleInputChange}
          placeholder="Usuario"
          readOnly
        />
      </div>
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_uxp_porcentaje"
          value={formState._uxp_porcentaje}
          handleInputChange={handleInputChange}
          placeholder="Porcentaje"
        />
      </div>
    </div>
  )
}

export default UserByProjectForm
