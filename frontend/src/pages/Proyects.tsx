import React, { useEffect, useState } from 'react'
import useGetProyects from '../hooks/UseGetProyects'
import ProyectForm from '../components/proyect/ProyectForm'

export interface IGetProyects {
  us_email: string
}

export interface IProyect {
  pr_id: string
  pr_nombre: string
  pr_descripcion: string
}

const Proyects = () => {
  const [projects, setProjects] = useState<IProyect[]>([])
  
  const [projectForEdit, setProjectForEdit] = useState<IProyect | null>(null)

  const {loading, getProyects} = useGetProyects()

  const getProjectsForTable = async () => {
    const _projects = await getProyects()
    setProjects(_projects)
  }

  useEffect(()=> {
    getProjectsForTable()
  }, [])

  const handleClick = (p: IProyect) => {
    console.log("PASO", p)
    setProjectForEdit(p)
  }

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
            <tr>
              <th className="border-r border-r-slate-300">id</th>
              <th className="border-r border-r-slate-300">nombre</th>
              <th>descripcion</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p: IProyect, index) => (
              <tr
                className="border-t border-t-slate-300"
                onClick={() => handleClick(p)}
                key={index}
              >
                <td className="border-r border-r-slate-300">{p.pr_id}</td>
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