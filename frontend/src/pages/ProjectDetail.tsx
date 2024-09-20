import { useEffect, useState } from 'react'
import useGetProjectByIDDeep from '../hooks/project/useGetProjectByIDDeep'
import { useParams } from 'react-router'
import ProjectMembers from '../components/project/ProjectMembers'
import ProjectTickets from '../components/project/ProjectTickets'
import ProjectPagos from '../components/project/ProjectPagos'
import { IProjectDeep, IPercentageByUser } from '../../interfaces'

const Project = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<IProjectDeep>()
  const [editingPercentages, setEditingPercentages] = useState<IPercentageByUser[]>([])
  const { getProjectsByIDDeep } = useGetProjectByIDDeep()

  const getProject = async () => {
    const _project: IProjectDeep = await getProjectsByIDDeep(+id!)
    const _editingPercentages: IPercentageByUser[] = _project.UsuarioXProyecto.map((uxp) => {
      return { us_email: uxp.Usuario.us_email, uxp_porcentaje: uxp.uxp_porcentaje }
    })
    setEditingPercentages(_editingPercentages)
    setProject(_project)
  }

  useEffect(() => {
    getProject()
  }, [])

  return (
    <section className="h-[92vh] bg-gray-900">
      <div className="flex items-center justify-center mb-4 space-x-3">
        <h1 className="text-white">{project?.pr_nombre}</h1>
      </div>
      <div className="bg-[#1e293b] rounded-lg shadow-lg mb-6 p-4">
        <h2 className="text-2xl font-bold text-white mb-2">Gastos</h2>
        <div className="text-3xl text-white font-bold">{project?.montoTotal}</div>
      </div>

      <div>
        <div className="bg-[#1e293b] rounded-t-lg shadow-lg p-4 mb-4">
          <ProjectMembers
            editingPercentages={editingPercentages}
            setEditingPercentages={setEditingPercentages}
            project={project}
            getProject={getProject}
          />
          <ProjectTickets
            project={project}
            getProject={getProject}
          />
          <ProjectPagos
            project={project}
            getProject={getProject}
          />
        </div>
      </div>
    </section>
  )
}

export default Project
