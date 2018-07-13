import React from 'react'

export const input = ({
    input,
    label,
    type,
    className,
    meta: { touched, error, warning }
  }) => (
    <div className='form-group'>
      <label>{label}</label>
      <div className='input-group'>
        <input {...input} className={className} type={type} />
        </div>
        {touched &&
          ((error && <div className='alert alert-danger'>{error}</div>))}
    </div>
  )