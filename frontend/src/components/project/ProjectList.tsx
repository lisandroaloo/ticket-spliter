import React from 'react'
import { IProjectList, IProject } from '../../../interfaces'





const ProjectList = ({projects, onClickRow}: IProjectList) => {
    return (


        <div className="bg-green-800 rounded-lg h-[50vh] overflow-y-scroll no-scrollbar">
            <table className="w-full">
                <thead>
                    <tr className="bg-green-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Descripción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-green-600">
                    {projects.map((p: IProject) => (
                        <tr className='cursor-pointer' key={p.pr_id} onClick={() => onClickRow(p.pr_id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300">{p.pr_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300">{p.pr_nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300">{p.pr_descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>



    )
}

export default ProjectList