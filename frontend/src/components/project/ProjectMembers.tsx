import { useState } from 'react'

import UserByProjectCard from './UserByProjectCard'
import UserByProjectForm from './UserByProjectForm'
import { useParams } from 'react-router'
import { IPercentageByUser, IProjectMembersProps, IUserWrapper } from '../../../interfaces'
import toast from 'react-hot-toast'

const ProjectMembers = ({

  projectUsers
  , getProjectUsersAsync, saldos, usersNotInProject,
  getUsersNotInProjectAsync, monto, projectAbierto, hasTickets, updateProject }: IProjectMembersProps) => {
  const { id } = useParams<{ id: string }>()
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)

  const handleAddUser = () => {
    if (projectAbierto) {

      setIsAddingUser(!isAddingUser)
    } else {
      toast.error("El proyecto esta cerrado")
    }
  }

  
  const handleDeleteUser = () => {
    if (projectAbierto) {

      setIsAddingUser(!isAddingUser)
    } else {
      toast.error("El proyecto esta cerrado")
    }
  }




  return (
    <>
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {projectUsers.map((up: IUserWrapper, index: any) => (
          <UserByProjectCard
            key={index}
            up={up}
            updateProject={updateProject}
            hasTickets={hasTickets}

          />
        ))}
      </div>
      {isAddingUser ? (
        <UserByProjectForm
          setIsAddingUser={setIsAddingUser}
          updateProject={getProjectUsersAsync}
          usersNotInProject={usersNotInProject}

        />
      ) : !hasTickets && <div className="flex justify-between">
        <button
          className="p-3 text-green-100 my-4 rounded-full bg-green-700 hover:bg-green-400"
          onClick={handleAddUser}

        >
          {isAddingUser ? '➖' : '➕'}

        </button>

      </div>}




    </>
  )
}

export default ProjectMembers