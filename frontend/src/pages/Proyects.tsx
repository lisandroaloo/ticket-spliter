import React, { useEffect, useState } from 'react'
import useGetProyects from '../hooks/UseGetProyects'
import ProyectForm from '../components/proyect/ProyectForm'
import { Link, useNavigate } from 'react-router-dom'



export interface IGetProyects {
  us_email: string
}

export interface IProyect {
  pr_id: string
  pr_nombre: string
  pr_descripcion: string
}

export interface IUserByProject {
  uxp_us_id: string
  uxp_pr_id: string
  uxp_porcentaje: string
}

const Proyects = () => {
  const [projects, setProjects] = useState<IProyect[]>([])

  const [projectForEdit, setProjectForEdit] = useState<IProyect | null>(null)

  const { loading, getProyects } = useGetProyects()

  const navigate = useNavigate();

  const onClickRow = (id: string) => {
    navigate("/proyects/" + id);
  }


  const getProjectsForTable = async () => {
    const _projects = await getProyects()
    setProjects(_projects)
  }

  useEffect(() => {
    getProjectsForTable()
  }, [])


  return (
    <>
      <ProyectForm
        setProjects={setProjects}
        projects={projects}
        projectForEdit={projectForEdit}
        setProjectForEdit={setProjectForEdit}
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
            {projects.map((p: IProyect, index) => (

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

export default Proyects