import React, { useState } from 'react'
import TextInput from '../TextInput'
import useAddUserToProject from '../../hooks/project/useAddUserToProject'
import { useParams } from 'react-router'
import { IUserByProjectFormProps, IUserByProjectForm } from '../../../interfaces'

const UserByProjectForm = ({ user, setIsAddingUser, updateProject, usersNotInProject }: IUserByProjectFormProps) => {
  const { id } = useParams<{ id: string }>()

  const { loading, addUserToProject } = useAddUserToProject()

  const instanciateFromUser = (): IUserByProjectForm => {
    const form: IUserByProjectForm = {
      _uxp_porcentaje: user!._uxp_porcentaje,
      _uxp_us_id: user!._uxp_us_id,
      _pr_id: id!,
    }

    return form
  }

  const initialize = (): IUserByProjectForm => {
    const form = {
      _uxp_us_id: '',
      _pr_id: id!,
    }

    return form
  }

  const [formState, setFormState] = useState<IUserByProjectForm>(user ? instanciateFromUser() : initialize())

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
      _uxp_us_id: value,
    }))
  }
  
  const handleAddUserToProject = async () => {
    await addUserToProject(formState)
    setFormState(initialize())
    setIsAddingUser(false)
    updateProject()
  }

  return (
    <div className="flex bg-slate-500 rounded justify-around mt-3">
      {/* <div className="w-3/12">
        <TextInput
          type="text"
          name="_uxp_us_id"
          value={formState._uxp_us_id}
          handleInputChange={handleInputChange}
          placeholder="Usuario"
        />
      </div> */}
      <select
        name="_uxp_us_id"
        onChange={handleUserDropdownChange}
        className="bg-slate-300 rounded p-2 my-1"
      >
        <option
          value=""
          selected
        ></option>
        {usersNotInProject.map((unip) => (
          <option value={unip.us_email}>{unip.us_nombre}</option>
        ))}
      </select>
      {user && (
        <div className="w-3/12">
          <TextInput
            type="text"
            name="_uxp_porcentaje"
            value={formState._uxp_porcentaje || ''}
            handleInputChange={handleInputChange}
            placeholder="Porcentaje"
          />
        </div>
      )}
      <button
        className="bg-slate-300 rounded p-2 my-1"
        onClick={handleAddUserToProject}
      >
        Crear
      </button>
    </div>
  )
}

export default UserByProjectForm
