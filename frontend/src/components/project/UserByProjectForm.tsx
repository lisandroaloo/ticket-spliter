import React, { useState } from 'react'
import TextInput from '../TextInput'
import useAddUserToProject from '../../hooks/project/useAddUserToProject'
import { useParams } from 'react-router'
import { IUserByProjectFormProps, IUserByProjectForm } from '../../../interfaces'

export default function UserByProjectForm({ user, setIsAddingUser, updateProject, usersNotInProject }: IUserByProjectFormProps) {
  const { id } = useParams<{ id: string }>()
  const { loading, addUserToProject } = useAddUserToProject()

  const [formState, setFormState] = useState<IUserByProjectForm>(
    user ? {
      _uxp_porcentaje: user._uxp_porcentaje,
      _uxp_us_id: user._uxp_us_id,
      _pr_id: id!,
    } : {
      _uxp_us_id: '',
      _pr_id: id!,
    }
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleUserDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState(prevState => ({ ...prevState, _uxp_us_id: e.target.value }))
  }

  const handleAddUserToProject = async () => {
    await addUserToProject(formState)
    setFormState({ _uxp_us_id: '', _pr_id: id! })
    setIsAddingUser(false)
    updateProject()
  }

  return (
    <div className="bg-slate-700 rounded-lg mt-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <select
            name="_uxp_us_id"
            onChange={handleUserDropdownChange}
            className="bg-slate-600 text-white rounded-md p-2 w-full"
          >
            <option value="" disabled selected>Seleccionar usuario</option>
            {usersNotInProject.map((unip) => (
              <option key={unip.us_email} value={unip.us_email}>{unip.us_nombre}</option>
            ))}
          </select>
        </div>
        
        {user && (
          <div className="space-y-2">
            <TextInput
              type="text"
              name="_uxp_porcentaje"
              value={formState._uxp_porcentaje || ''}
              handleInputChange={handleInputChange}
              placeholder="Porcentaje"
              classNames="bg-slate-600 text-white rounded-md p-2 w-full"
            />
          </div>
        )}
        
        <div className="flex justify-end items-end space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
            onClick={handleAddUserToProject}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Agregar'}
          </button>
          <button
            className="bg-slate-500 hover:bg-slate-600 text-white rounded-md px-4 py-2"
            onClick={() => setIsAddingUser(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
