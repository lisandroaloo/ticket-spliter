import React from 'react'
import { ITextInput } from '../../interfaces'

const TextInput = ({ type, name, value, readOnly, placeholder, classNames = 'bg-slate-300 rounded p-2 my-1', handleInputChange, handleOnBlur }: ITextInput) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly ? true : false}
      placeholder={placeholder}
      className={classNames}
      onChange={handleInputChange}
      onBlur={handleOnBlur}
    />
  )
}

export default TextInput
