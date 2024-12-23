
import { useParams } from 'react-router'
import { IUserByProjectCardProps } from '../../../interfaces'
import useDeleteUserFromProject from '../../hooks/project/useDeleteUserFromProject'
import { useAuthContext } from '../../context/AuthContext'

const UserByProjectCard = ({ up, updateProject, hasTickets }: IUserByProjectCardProps) => {

  const { authUser } = useAuthContext()

  const { loading, deleteUserFromProject } = useDeleteUserFromProject()

  const { id } = useParams<{ id: string }>()

  const handleDeleteUser = async () => {
    await deleteUserFromProject({ _pr_id: id!, _uxp_us_id: up.Usuario.us_email })

    updateProject()
  }


  return (
    <div className="flex justify-between items-center bg-gradient-to-br from-emerald-500 to-green-700 text-white p-3 rounded-lg">
      <div className="justify-between flex items-center w-full">
        <span>{up.Usuario.us_nombre}</span>
        {!hasTickets && authUser != up.Usuario.us_email && <button onClick={handleDeleteUser}>🗑️</button>}
      </div>
    </div>
  )
}

export default UserByProjectCard
