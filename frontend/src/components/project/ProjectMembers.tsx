import { useState } from 'react'
import useEditProjectPercentages from '../../hooks/project/useEditPercentages'
import UserByProjectCard from './UserByProjectCard'
import UserByProjectForm from './UserByProjectForm'
import { useParams } from 'react-router'
import { IPercentageByUser, IProjectMembersProps } from '../../../interfaces'

const ProjectMembers = ({editingPercentages, setEditingPercentages, project
,getProject}: IProjectMembersProps) => {
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
    getProject()
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
      getProject()
      setIsEditingPercentages(!isEditingPercentages)
    } else {
      alert('Los porcentajes ingresados no acumulan 100%')
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
      <h2 className="text-2xl font-bold text-white mb-4">Integrantes</h2>
      {isEditingPercentages ? (
        <button
          onClick={handleEditPercentages}
          className="p-3 text-white my-4 rounded-full bg-gray-700 hover:bg-gray-400"
        >
          Confirmar
        </button>
      ) : (
        <button
          onClick={editPercentages}
          className="p-3 text-white my-4 rounded-full bg-gray-700 hover:bg-gray-400"
        >
          Editar Porcentajes
        </button>
      )}
      <button
        onClick={handleDividirEquitativamente}
        className="p-3 text-white my-4 rounded-full bg-gray-700 hover:bg-gray-400"
      >
        Dividir Equitativamente
      </button>
      <div className="space-y-4">
        {project?.UsuarioXProyecto.map((up: any, index: any) => (
          <UserByProjectCard
            key={index}
            up={up}
            monto={project?.montoTotal * (up.uxp_porcentaje / 100)}
            isEditingPercentages={isEditingPercentages}
            editPercentage={editPercentage}
            index={index}
            value={editingPercentages[index].uxp_porcentaje}
          />
        ))}
      </div>
      {isAddingUser && project && (
        <UserByProjectForm
          setIsAddingUser={setIsAddingUser}
          updateProject={getProject}
          usersNotInProject={project.usersNotInProject}
        />
      )}
      <button
        className="p-3 text-white mt-4 rounded-full bg-gray-700 hover:bg-gray-400"
        onClick={handleAddUser}
      >
        {isAddingUser ? '➖' : '➕'}
      </button>
    </>
  )
}

export default ProjectMembers