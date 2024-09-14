import React from 'react'
import { IUserWrapper } from '../../pages/ProjectDetail'

interface IUserByProjectCardProps {
  up: IUserWrapper
  monto: number
}

const UserByProjectCard = ({ up, monto }: IUserByProjectCardProps) => {
  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{up.Usuario.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>${monto}</span>
        <span className="bg-[#4fd1c5] text-[#1e293b] px-2 py-1 rounded-full text-xs">{up.uxp_porcentaje}%</span>
      </div>
    </div>
  )
}

export default UserByProjectCard