import React, { useEffect, useState } from 'react'
import useGetProjects from '../hooks/project/UseGetProjects'
import ProjectForm from '../components/project/ProjectForm'
import { useNavigate } from 'react-router-dom'



export interface IGetProjects {
  us_email: string
}

export interface IProject {
  pr_id: string
  pr_nombre: string
  pr_descripcion: string
}

export interface IUserByProject {
  uxp_us_id: string
  uxp_pr_id: string
  uxp_porcentaje: string
}

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([])

  // const [projectForEdit, setProjectForEdit] = useState<IProject | null>(null)

  const { loading, getProjects } = useGetProjects()

  const navigate = useNavigate();

  const onClickRow = (id: string) => {
    navigate("/projects/" + id);
  }


  const getProjectsForTable = async () => {
    const _projects = await getProjects()
    setProjects(_projects)
  }

  useEffect(() => {
    getProjectsForTable()
  }, [])


  return (
    <>
      <ProjectForm
        setProjects={setProjects}
        // projects={projects}
        // projectForEdit={projectForEdit}
        // setProjectForEdit={setProjectForEdit}
      />
      {!loading && (
        <table className="w-full bg-slate-800 text-slate-300">
          <thead>
            <tr className='text-center'>
              <th className="border-r border-r-slate-300 w-1/12">Id</th>
              <th className="border-r border-r-slate-300 w-4/12">Nombre</th>
              <th className="w-7/12">Descripcion</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p: IProject, index) => (

              <tr
                className="border-t border-t-slate-300 cursor-pointer"
                onClick={() => onClickRow(p.pr_id)}
                key={index}
              >


                <td className="border-r border-r-slate-300 ">{p.pr_id}</td>
                <td className="border-r border-r-slate-300">{p.pr_nombre}</td>
                <td>{p.pr_descripcion}</td>



              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Projects