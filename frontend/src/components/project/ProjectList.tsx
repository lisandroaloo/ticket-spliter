import React from 'react'
import { IProjectList, IProject } from '../../../interfaces'





const ProjectList = ({projects, onClickRow}: IProjectList) => {
    return (


        <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Descripción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                    {projects.map((p: IProject) => (
                        <tr className='cursor-pointer' key={p.pr_id} onClick={() => onClickRow(p.pr_id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.pr_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.pr_nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{p.pr_descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>



    )
}

export default ProjectList