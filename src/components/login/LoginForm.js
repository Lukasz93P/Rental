import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {input} from '../shared/form/input';
import Errors from '../shared/form/errors'
import {required,minLength6} from '../shared/form/validators'

const LoginForm = props => {
  const {login, valid,handleSubmit, pristine,errors, reset, submitting} = props
  return (
    <form onSubmit={handleSubmit(login)}>

          <Field
            name="email"
            type="email"
            placeholder="email"
            className="form-control"
            component={input}
            label="Email"
            validate={[required,minLength6]}          />

          <Field
            name="password"
            type="password"
            placeholder="password"
            className="form-control"
            component={input}
            label="Password"
            validate={[required]}
          />

        <button type="submit" className="btn btn-form btn-bwm" disabled={!valid || pristine || submitting}>
          Login
        </button>
        <div>
          <Errors errors={errors}/>
        </div>
    </form>
  )
}



export default reduxForm({
    form: 'LoginForm' // a unique identifier for this form
  })(LoginForm)
