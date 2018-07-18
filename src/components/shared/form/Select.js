import React from 'react'

export const Select = ({
    input,
    label,
    options,
    className,
    meta: { touched, error, warning }
  }) => (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <select {...input} className={className}  >
        {options ? options.map((option,index)=><option key={index} value={option.value}>{option.label}</option>)
        : <div></div> 
        }
        </select>
        </div>
        {touched &&
          ((error && <div className='alert alert-danger'>{error}</div>))}
    </div>
  )