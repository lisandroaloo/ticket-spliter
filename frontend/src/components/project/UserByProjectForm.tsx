import React, { useState } from 'react'
import { IUserByProjectForm } from './ProjectForm'
import TextInput from '../TextInput'
import useAddUserToProject from '../../hooks/project/useAddUserToProject'
import { useParams } from 'react-router'

export interface IUserByProjectFormProps {
  user?: IUserByProjectForm
  setIsAddingUser: React.Dispatch<React.SetStateAction<boolean>>
  updateProject: () => Promise<void>
}

const UserByProjectForm = ({ user, setIsAddingUser, updateProject }: IUserByProjectFormProps) => {
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

  const handleAddUserToProject = async () => {
    await addUserToProject(formState)
    setFormState(initialize())
    setIsAddingUser(false)
    updateProject()
  }

  return (
    <div className="flex bg-slate-500 justify-between">
      <div className="w-3/12">
        <TextInput
          type="text"
          name="_uxp_us_id"
          value={formState._uxp_us_id}
          handleInputChange={handleInputChange}
          placeholder="Usuario"
        />
      </div>
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