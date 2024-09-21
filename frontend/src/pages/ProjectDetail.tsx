import { useEffect, useState } from 'react'
import useGetProjectByIDDeep from '../hooks/project/useGetProjectByIDDeep'
import { useParams } from 'react-router'
import ProjectMembers from '../components/project/ProjectMembers'
import ProjectTickets from '../components/project/ProjectTickets'
import ProjectPagos from '../components/project/ProjectPagos'
import { IProjectDeep, IPercentageByUser } from '../../interfaces'
import ProjectHeader from '../components/project/ProjectHeader'

const ProjectDetail = () => {
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
      {project && (
        <>
          <ProjectHeader
            project={project}
            getProject={getProject}
          />
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
        </>
      )}
    </section>
  )
}

export default ProjectDetail
