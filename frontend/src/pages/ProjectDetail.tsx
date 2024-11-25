import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProjectMembers from '../components/project/ProjectMembers'
import ProjectTickets from '../components/project/ProjectTickets'
import ProjectPagos from '../components/project/ProjectPagos'
import { IPago,IProject, IProjectTickets, IUser, IUserWrapper } from '../../interfaces'
import ProjectHeader from '../components/project/ProjectHeader'
import ProjectNavBar from '../components/navbars/ProjectNavBar'
import useGetProjectDetail from '../hooks/project/useGetProjectDetail'

import useGetProjectTickets from '../hooks/project/useGetProjectTickets'
import useGetProjectUsers from '../hooks/project/useGetProjectUsers'
import useGetUsersNotInProject from '../hooks/project/useGetUsersNotInProject'
import useGetPagosByProjectId from '../hooks/pagos/useGetPagosByProjectId'


const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [projectDetail, setProjectDetail] = useState<IProject | undefined>()
  const [projectPagos, setProjectPagos] = useState<IPago[]>([])
  const [projectTickets, setProjectTickets] = useState<IProjectTickets | undefined>(undefined)
  const [projectUsers, setProjectUsers] = useState<IUserWrapper[]>([])
  const [usersNotInProject, setUsersNotInProject] = useState<IUser[]>([])
  
  const { loading: loadingDetail, getProjectDetail } = useGetProjectDetail()
  // const { loading: loadingPagos, getProjectPagos } = useGetProjectPagos()
  const { loading: loadingTickets, getProjectTickets } = useGetProjectTickets()
  const { loading: loadingUsers, getProjectUsers } = useGetProjectUsers()
  const { loading: loadingUsersNotInProject, getUsersNotInProject } = useGetUsersNotInProject()
  const { loading: loadingPagosProject, getPagosByProjectId } = useGetPagosByProjectId()


  const [activeSection, setActiveSection] = useState<string>('members')


  const getProjectDetailAsync = async () => {
    const _detail = await getProjectDetail(+id!)

    setProjectDetail(_detail)

  }

  const updateProject = async () => {
    getProjectDetailAsync()
    getProjectTicketsAsync()
    getProjectUsersAsync()
    getUsersNotInProjectAsync()
    if (!projectDetail?.pr_abierto) {
      getProjectPagosAsync()
    }
  }

  const getProjectPagosAsync = async () => {

    const _pagos = await getPagosByProjectId(id!)
    console.log("PAGOS", _pagos)
    setProjectPagos(_pagos)
  }

  const getProjectTicketsAsync = async () => {
    const _tickets = await getProjectTickets(+id!)


    setProjectTickets(_tickets)

  }

  const getProjectUsersAsync = async () => {
    const _users = await getProjectUsers(+id!)
    setProjectUsers(_users)
  }

  const getUsersNotInProjectAsync = async () => {
    const _usersNotInProject = await getUsersNotInProject(+id!)

    setUsersNotInProject(_usersNotInProject)

  }

  useEffect(() => {
    updateProject()
  }, [])

  return (
    <section className="h-[92vh] bg-green-100 overflow-hidden">
      <>
        <ProjectHeader
          projectDetail={projectDetail}
          loadingDetail={loadingDetail}
          getProjectDetailAsync={getProjectDetailAsync}
          monto={projectTickets}
          updateProject={updateProject}
          getProjectPagosAsync={getProjectPagosAsync}
        />
        <div className="bg-gradient-to-br from-emerald-200 to-green-300 md:mx-4 rounded-t-lg shadow-lg p-4 h-full">
          <ProjectNavBar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            isClosed={!projectDetail?.pr_abierto!}
          />
          <div className="mt-4 ">
            {activeSection === 'members' &&
              (loadingUsers || loadingTickets || loadingUsersNotInProject || !projectTickets ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                </div>
              ) : (
                <ProjectMembers
                  projectUsers={projectUsers}
                  getProjectUsersAsync={getProjectUsersAsync}
                  usersNotInProject={usersNotInProject}
                  projectAbierto={projectDetail?.pr_abierto!}
                  hasTickets={projectTickets.Ticket?.length > 0}
                  updateProject={updateProject}
                />
              ))}
            {activeSection === 'tickets' &&
              (loadingTickets || !projectTickets ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                </div>
              ) : (
                <ProjectTickets
                  projectAbierto={projectDetail?.pr_abierto!}
                  projectTickets={projectTickets}
                  projectUsers={projectUsers}
                  updateProject={updateProject}
                />
              ))}

            {activeSection === 'payments' &&
              (loadingPagosProject ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                </div>
              ) : (
                <ProjectPagos
                  projectPagos={projectPagos}
                  updateProject={updateProject}
                  projectUsers={projectUsers}
                  getProjectUsersAsync={getProjectUsersAsync}
                />
              ))}
          </div>
        </div>
      </>
    </section>
  )
}

export default ProjectDetail
