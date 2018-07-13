import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {input} from '../shared/form/input';
import Errors from '../shared/form/errors'

const RegisterForm = props => {
  const {registerUser, valid,handleSubmit, pristine, reset, submitting,errors } = props
  return (
    <form onSubmit={handleSubmit(registerUser)}>

          <Field
            name="username"
            component="input"
            type="text"
            placeholder="username"
            className="form-control"
            component={input}
            label="Username"
          />



          <Field
            name="email"
            component="input"
            type="email"
            placeholder="email"
            className="form-control"
            component={input}
            label="Email"
          />




          <Field
            name="password"
            component="input"
            type="password"
            placeholder="password"
            className="form-control"
            component={input}
            label="Password"
          />



          <Field
            name="passwordconfirmation"
            component="input"
            type="password"
            placeholder="confirmation password"
            className="form-control"
            component={input}
            label="Password Confirmation"
          />

        <button type="submit" className="btn btn-form btn-bwm" disabled={!valid || pristine || submitting}>
          Submit
        </button>
        <div>
          <Errors errors={errors}/>
        </div>
    </form>
  )
}

const validate = values => {
  const errors = {}
  const {username,email,password,passwordconfirmation}=values
  
  if(username&&username.length<2)
    errors.username='Username is too short two characters required'
  
  if(!email)
    errors.email = 'Enter email address'
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = 'Invalid email address'
  }

  if(!password)
    errors.password = 'Enter password'

  if(!passwordconfirmation)
    errors.password = 'Confirm Your password'

  if(password!==passwordconfirmation)
    errors.passwordconfirmation = `Passwords don\'t match`
  return errors
}

export default reduxForm({
    form: 'RegisterForm',validate // a unique identifier for this form
  })(RegisterForm)



