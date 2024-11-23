
import { useParams } from 'react-router'
import { IUserByProjectCardProps } from '../../../interfaces'
import useDeleteUserFromProject from '../../hooks/project/useDeleteUserFromProject'
import { useAuthContext } from '../../context/AuthContext'

const UserByProjectCard = ({ up, updateProject, hasTickets }: IUserByProjectCardProps) => {

  const { authUser } = useAuthContext()

  const { loading, deleteUserFromProject } = useDeleteUserFromProject()

  const { id } = useParams<{ id: string }>()

  const handleAddUserToProject = async () => {

    await deleteUserFromProject({ _pr_id: id!, _uxp_us_id: up.Usuario.us_email })

    updateProject()
  }


  return (
    <div className="flex justify-between items-center bg-gradient-to-br from-emerald-500 to-green-700 text-white p-3 rounded-lg">
      <div className=" flex items-center space-x-3">
        <span>{up.Usuario.us_nombre}</span>
        {!hasTickets && authUser != up.Usuario.us_email &&

          <button onClick={handleAddUserToProject}>X</button>
        }

      </div>

    </div>
  )
}

export default UserByProjectCard
