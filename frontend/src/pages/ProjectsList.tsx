import React, { useEffect, useState } from 'react'
import useGetProjects from '../hooks/project/UseGetProjects'
import ProjectForm from '../components/project/ProjectForm'
import { useNavigate } from 'react-router-dom'
import { IProject } from '../../interfaces'

const ProjectsList = () => {
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

export default ProjectsList