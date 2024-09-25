import { useEffect, useState } from 'react'
import useGetProjectByIDDeep from '../hooks/project/useGetProjectByIDDeep'
import { useParams } from 'react-router'
import ProjectMembers from '../components/project/ProjectMembers'
import ProjectTickets from '../components/project/ProjectTickets'
import ProjectPagos from '../components/project/ProjectPagos'
import { IProjectDeep, IPercentageByUser } from '../../interfaces'
import ProjectHeader from '../components/project/ProjectHeader'
import ProjectNavBar from '../components/navbars/ProjectNavBar'
import useGetSaldoPagosByUserAndProjectId from '../hooks/pagos/useGetSaldoPagosByUserAndProjectId'

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<IProjectDeep>()
  const [editingPercentages, setEditingPercentages] = useState<IPercentageByUser[]>([])
  const { loading, getProjectsByIDDeep } = useGetProjectByIDDeep()
  const { getSaldoPagosByUserAndProjectId } = useGetSaldoPagosByUserAndProjectId()

  const [saldos, setSaldos] = useState<any>({})

  const [activeSection, setActiveSection] = useState<string>('members')

  const getProject = async () => {
    const _project: IProjectDeep = await getProjectsByIDDeep(+id!)

    const _editingPercentages: IPercentageByUser[] = _project.UsuarioXProyecto.map((uxp) => {
      return { us_email: uxp.Usuario.us_email, uxp_porcentaje: uxp.uxp_porcentaje }
    })

    const _saldos = await getSaldoPagosByUserAndProjectId(id!)
    setSaldos(_saldos)

    setEditingPercentages(_editingPercentages)
    setProject(_project)
  }

  useEffect(() => {
    getProject()
  }, [])

  return (
    <section className="h-[92vh] bg-gray-900 overflow-hidden">

      <>

        <ProjectHeader
          project={project}
          getProject={getProject}
          loading={loading}
        />
        <div className="bg-gray-800 rounded-t-lg shadow-lg p-4 mb-4">
          <ProjectNavBar setActiveSection={setActiveSection} activeSection={activeSection} />
          <div className="mt-4">
            {activeSection === 'members' && (
              loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                <ProjectMembers
                  editingPercentages={editingPercentages}
                  setEditingPercentages={setEditingPercentages}
                  project={project}
                  getProject={getProject}
                  saldos={saldos}
                />)
            )}
            {activeSection === 'tickets' && (
              loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                <ProjectTickets
                  project={project}
                  getProject={getProject}
                />
              )

            )}
            {activeSection === 'payments' && (
              loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                </div>
              ) : (
                <ProjectPagos
                  project={project}
                  getProject={getProject}
                />
              )

            )}
          </div>
        </div>
      </>


    </section>
  )
}

export default ProjectDetail
