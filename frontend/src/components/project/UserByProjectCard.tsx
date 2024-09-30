import React, { useEffect, useState } from 'react'
import useGetSpentByProjectId from '../../hooks/user/useGetSpentByProjectId'
import { useParams } from 'react-router'
import TextInput from '../TextInput'
import { IUserByProjectCardProps } from '../../../interfaces'

const UserByProjectCard = ({ up, monto, isEditingPercentages, index, editPercentage, value, saldo = 0 }: IUserByProjectCardProps) => {
  const { id } = useParams<{ id: string }>()

  const [currentValue, setCurrentValue] = useState<string>(value.toString())
  const [spent, setSpent] = useState<number>(0)
  const { getSpentByProjectId } = useGetSpentByProjectId()

  const updateSpent = async () => {
    const _spent = await getSpentByProjectId({ _pr_id: id!, _us_email: up.Usuario.us_email })
    setSpent(+_spent + saldo)
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
    <div className="flex justify-between items-center bg-gradient-to-br from-emerald-500 to-green-700 text-white p-3 rounded-lg">
      <div className="flex items-center space-x-3">
        <span>{up.Usuario.us_nombre}</span>
      </div>
      <div className="flex items-center space-x-3">
        <span>{monto - spent >= 0 ? "Debe" : "Le deben"}: ${Math.abs((monto - spent)).toFixed(2)}</span>
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
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{up.uxp_porcentaje.toFixed(2)}%</span>
        )}
      </div>
    </div>
  )
}

export default UserByProjectCard
