import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProjectMembers from '../components/project/ProjectMembers'
import ProjectTickets from '../components/project/ProjectTickets'
import ProjectPagos from '../components/project/ProjectPagos'
import { IPago, IPercentageByUser, IPlanPagos, IProject, IProjectTickets, IUser, IUserWrapper } from '../../interfaces'
import ProjectHeader from '../components/project/ProjectHeader'
import ProjectNavBar from '../components/navbars/ProjectNavBar'
import useGetSaldoPagosByUserAndProjectId from '../hooks/pagos/useGetSaldoPagosByUserAndProjectId'
import useGetProjectDetail from '../hooks/project/useGetProjectDetail'

import useGetProjectTickets from '../hooks/project/useGetProjectTickets'
import useGetProjectUsers from '../hooks/project/useGetProjectUsers'
import useGetUsersNotInProject from '../hooks/project/useGetUsersNotInProject'


const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [projectDetail, setProjectDetail] = useState<IProject | undefined>()
  const [projectPagos, setProjectPagos] = useState<IPago[]>([])
  const [planPagos, setPlanPagos] = useState<IPlanPagos[]>([])
  const [projectTickets, setProjectTickets] = useState<IProjectTickets | undefined>(undefined)
  const [projectUsers, setProjectUsers] = useState<IUserWrapper[]>([])
  const [usersNotInProject, setUsersNotInProject] = useState<IUser[]>([])
  
  // const [editingPercentages, setEditingPercentages] = useState<IPercentageByUser[]>([])

  // const { loading, getProjectsByIDDeep } = useGetProjectByIDDeep()
  const { loading: loadingDetail, getProjectDetail } = useGetProjectDetail()
  // const { loading: loadingPagos, getProjectPagos } = useGetProjectPagos()
  const { loading: loadingTickets, getProjectTickets } = useGetProjectTickets()
  const { loading: loadingUsers, getProjectUsers } = useGetProjectUsers()
  const { loading: loadingUsersNotInProject, getUsersNotInProject } = useGetUsersNotInProject()
  const { loading: loadingSaldos, getSaldoPagosByUserAndProjectId } = useGetSaldoPagosByUserAndProjectId()
  //const { getPlanPagos } = useGetPlanPagos()


  const [saldos, setSaldos] = useState<any>({})

  const [activeSection, setActiveSection] = useState<string>('members')


  const getProjectDetailAsync = async () => {
    const _detail = await getProjectDetail(+id!)

    setProjectDetail(_detail)

  }

  const updateProject = async () => {
    getProjectDetailAsync()
    getProjectPagosAsync()
    getProjectTicketsAsync()
    getProjectUsersAsync()
    getUsersNotInProjectAsync()
  }

  const getProjectPagosAsync = async () => {
     // const _pagos = await getProjectPagos(+id!)
    //const _planPagos = await getPlanPagos(+id!)

   // setProjectPagos(_pagos)
    //setPlanPagos(_planPagos)


  }

  const getProjectTicketsAsync = async () => {
    const _tickets = await getProjectTickets(+id!)


    setProjectTickets(_tickets)

  }

  const getProjectUsersAsync = async () => {
    const _users = await getProjectUsers(+id!)
    setProjectUsers(_users)

    // const _editingPercentages: IPercentageByUser[] = _users.map((uxp: IUserWrapper) => {
    //   return { us_email: uxp.Usuario.us_email }
    // })
    // setEditingPercentages(_editingPercentages)

    const _saldos = await getSaldoPagosByUserAndProjectId(id!)
    setSaldos(_saldos)
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
        />
        <div className="bg-gradient-to-br from-emerald-200 to-green-300 md:mx-4 rounded-t-lg shadow-lg p-4 h-full">
          <ProjectNavBar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
          />
          <div className="mt-4 ">
            {activeSection === 'members' &&
              (loadingUsers || loadingTickets || loadingUsersNotInProject || loadingSaldos || !projectTickets ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                </div>
              ) : (
                <ProjectMembers
                  // editingPercentages={editingPercentages}
                  // setEditingPercentages={setEditingPercentages}
                  projectUsers={projectUsers}
                  getProjectUsersAsync={getProjectUsersAsync}
                  saldos={saldos}
                  usersNotInProject={usersNotInProject}
                  getUsersNotInProjectAsync={getUsersNotInProjectAsync}
                  monto={projectTickets!.montoTotal}
                  projectAbierto={projectDetail?.pr_abierto!}
                  hasTickets={projectTickets.Ticket?.length > 0 }
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
            {/* 
  {activeSection === 'payments' &&
    (loadingPagos ? (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    ) : (
      <ProjectPagos
        projectPagos={projectPagos}
        planPagos={planPagos}
        updateProject={updateProject}
        projectUsers={projectUsers}
        getProjectUsersAsync={getProjectUsersAsync}
      />
    ))
  }
*/}

          </div>
        </div>
      </>
    </section>
  )
}

export default ProjectDetail
