import { useState } from 'react'
import useEditProjectPercentages from '../../hooks/project/useEditPercentages'
import UserByProjectCard from './UserByProjectCard'
import UserByProjectForm from './UserByProjectForm'
import { useParams } from 'react-router'
import { IPercentageByUser, IProjectMembersProps, IUserWrapper } from '../../../interfaces'
import toast from 'react-hot-toast'

const ProjectMembers = ({ editingPercentages, setEditingPercentages, projectUsers
  , getProjectUsersAsync, saldos, usersNotInProject,
  getUsersNotInProjectAsync, monto }: IProjectMembersProps) => {
  const { id } = useParams<{ id: string }>()
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const [isEditingPercentages, setIsEditingPercentages] = useState<boolean>(false)
  const { editProjectPercentages } = useEditProjectPercentages()

  const handleDividirEquitativamente = async () => {
    const procentajeEquitativo = 100 / editingPercentages.length
    const _editingPercentages: IPercentageByUser[] = []
    editingPercentages.forEach((ep: IPercentageByUser) => {
      _editingPercentages.push({ us_email: ep.us_email, uxp_porcentaje: procentajeEquitativo })
    })
    setEditingPercentages(_editingPercentages)
    await editProjectPercentages(_editingPercentages, id!)
    getProjectUsersAsync()
  }

  const handleAddUser = () => {
    setIsAddingUser(!isAddingUser)
  }

  const editPercentages = () => {
    setIsEditingPercentages(!isEditingPercentages)
  }

  const editPercentage = (index: number, newPercentage: number) => {
    const _editingPercentages: IPercentageByUser[] = [...editingPercentages]
    _editingPercentages[index].uxp_porcentaje = newPercentage
    setEditingPercentages(_editingPercentages)
  }

  const handleEditPercentages = async () => {
    if (verifyPercentages()) {
      await editProjectPercentages(editingPercentages, id!)
      getProjectUsersAsync()
      setIsEditingPercentages(!isEditingPercentages)
    } else {
      toast.error('Los porcentajes ingresados no acumulan 100%')
    }
  }
  const verifyPercentages = () => {
    let totalPercentage = 0

    for (let i = 0; i < editingPercentages.length; i++) {
      totalPercentage += editingPercentages[i].uxp_porcentaje
    }

    return totalPercentage === 100
  }

  return (
    <>
      <div className="space-y-4 h-[30vh] overflow-y-scroll no-scrollbar">
        {projectUsers.map((up: IUserWrapper, index: any) => (
          <UserByProjectCard
            key={index}
            up={up}
            monto={monto * (up.uxp_porcentaje / 100)}
            isEditingPercentages={isEditingPercentages}
            editPercentage={editPercentage}
            index={index}
            value={editingPercentages[index].uxp_porcentaje}
            saldo={saldos[up.Usuario.us_email]}
          />
        ))}
      </div>
      {isAddingUser ? (
        <UserByProjectForm
          setIsAddingUser={setIsAddingUser}
          updateProject={getProjectUsersAsync}
          usersNotInProject={usersNotInProject}
        />
      ) : <div className="flex justify-between">
        <button
          className="p-3 text-green-100 my-4 rounded-full bg-green-700 hover:bg-green-400"
          onClick={handleAddUser}
        >
          {isAddingUser ? '➖' : '➕'}
        </button>
        <div className="flex  gap-x-4">
          {isEditingPercentages ? (
            <button
              onClick={handleEditPercentages}
              className="p-3 text-green-100 my-4 rounded-full bg-green-700 hover:bg-green-400"
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={editPercentages}
              className="p-3 text-green-100 my-4 rounded-full bg-green-700 hover:bg-green-400"
            >
              ✎
            </button>
          )}
          <button
            onClick={handleDividirEquitativamente}
            className="p-3 text-white my-4 rounded-full bg-green-700 hover:bg-green-400"
          >
            ⚖️
          </button>
        </div>
      </div>}




    </>
  )
}

export default ProjectMembers