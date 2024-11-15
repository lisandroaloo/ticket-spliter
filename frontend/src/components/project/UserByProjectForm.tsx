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
      
      _uxp_us_id: user._uxp_us_id,
      _pr_id: id!,
    } : {
      _uxp_us_id: '',
      _pr_id: id!,
    }
  )

  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState(prevState => ({ ...prevState, [name]: value }))
  }

  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleUserSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState(prevState => ({ ...prevState, _uxp_us_id: e.target.value }))
  }

  const handleAddUserToProject = async () => {
    if (!formState._uxp_us_id) {
      alert('Por favor, selecciona un usuario.')
      return
    } 
    await addUserToProject(formState)
    setFormState({ _uxp_us_id: '', _pr_id: id! })
    setIsAddingUser(false)
    updateProject()
  }


  const filteredUsers = usersNotInProject.filter((fu) =>
    fu.us_nombre.includes(searchQuery) 
  )

  return (
    <div className="bg-gradient-to-br from-emerald-500 to-green-700 rounded-lg mt-3 p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" space-x-2 flex">
          <input
            type="text"
            placeholder="Buscar usuario por nombre o email"
            value={searchQuery}
            onChange={handleUserSearchChange}
            className="bg-green-700 text-green-100 rounded-md p-2 w-full placeholder-green-300"
          />

          <select
            name="_uxp_us_id"
            onChange={handleUserSelection}
            disabled={!searchQuery || filteredUsers.length === 0}
            value={formState._uxp_us_id}
            className="bg-green-900 text-green-100 rounded-md p-2 w-full"
          >
            <option value="" disabled>
              {searchQuery ? 'Selecciona un usuario' : 'Escribe para buscar'}
            </option>
            {filteredUsers.map((fu) => (
              <option key={fu.us_email} value={fu.us_email} >
                {fu.us_nombre} 
              </option>
            ))}
          </select>
        </div>

        {user && (
          <div className="space-y-2">
            <TextInput
              type="text"
              name="_uxp_porcentaje"
              value=""//{formState._uxp_porcentaje || ''}
              handleInputChange={handleInputChange}
              placeholder="Porcentaje"
              classNames="bg-green-600 text-white rounded-md p-2 w-full placeholder-green-300"
            />
          </div>
        )}

        <div className="flex justify-end items-end space-x-2">
          <button
            className="bg-green-700 hover:bg-green-800 text-green-100 rounded-md px-4 py-2"
            onClick={handleAddUserToProject}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Agregar'}
          </button>
          <button
            className="bg-green-300 hover:bg-green-100 text-green-800 rounded-md px-4 py-2"
            onClick={() => setIsAddingUser(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
