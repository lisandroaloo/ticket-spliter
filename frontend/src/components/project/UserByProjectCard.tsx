import React, { useEffect, useState } from 'react'
import { IUserWrapper } from '../../pages/ProjectDetail'
import useGetSpentByProjectId from '../../hooks/user/useGetSpentByProjectId'
import { useParams } from 'react-router'
import TextInput from '../TextInput'

interface IUserByProjectCardProps {
  up: IUserWrapper
  monto: number
  isEditingPercentages: boolean
  index: number
  editPercentage: (index: number, newPercentage: number) => void
  value: number
}

const UserByProjectCard = ({ up, monto, isEditingPercentages, index, editPercentage, value }: IUserByProjectCardProps) => {
  const { id } = useParams<{ id: string }>()

  const [currentValue, setCurrentValue] = useState<string>(value.toString())
  const [spent, setSpent] = useState<number>(0)
  const { getSpentByProjectId } = useGetSpentByProjectId()

  const updateSpent = async () => {
    const _spent = await getSpentByProjectId({ _pr_id: id!, _us_email: up.Usuario.us_email })
    setSpent(+_spent)
  }

  const handleOnBlur = (e: any) => {
    editPercentage(index, +e.target.value)
  }
  const handleOnChange = (e: any) => {
    setCurrentValue(e.target.value)
  }

  useEffect(() => {
    updateSpent()
  }, [monto])

  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{up.Usuario.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>Debe: ${(monto - spent).toFixed(2)}</span>
        {isEditingPercentages ? (
          <TextInput
            name=""
            placeholder=""
            type=""
            value={currentValue}
            handleInputChange={handleOnChange}
            handleOnBlur={handleOnBlur}
            classNames='text-black'
          />
        ) : (
          <span className="bg-[#4fd1c5] text-[#1e293b] px-2 py-1 rounded-full text-xs">{up.uxp_porcentaje}%</span>
        )}
      </div>
    </div>
  )
}

export default UserByProjectCard
