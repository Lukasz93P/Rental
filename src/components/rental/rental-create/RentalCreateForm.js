import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {input} from '../../shared/form/input';
import {TextArea} from '../../shared/form/TextArea';
import {Select} from '../../shared/form/Select';
import {FileInput} from '../../shared/form/FileInput';
import Errors from '../../shared/form/errors'
import {fieldRequired} from '../../../helpers/index'
import {required,minLength6} from '../../shared/form/validators'


const RentalCreateForm = props => {
  const {onFormSubmit, valid,rentalCategories ,handleSubmit, pristine, reset, submitting,errors } = props
  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>

        <Field
            name="title"
            type="text"
            placeholder="title"
            className="form-control"
            component={input}
            label="Title"
            validate={required}
        />



        <Field
            name="city"
            type="text"
            placeholder="city"
            className="form-control"
            component={input}
            label="City"
            validate={required}
        />




        <Field
            name="street"
            type="text"
            placeholder="street"
            className="form-control"
            component={input}
            label="Street"
            validate={required}
        />

        <Field
            name="category"
            placeholder="category"
            className="form-control"
            component={Select}
            options={rentalCategories}
            label="Category"
            validate={required}
        />



        <Field
            name="bedrooms"
            type="number"
            placeholder="bedrooms"
            className="form-control"
            component={input}
            label="Bedrooms"
        />

        <Field
            name="dailyRate"
            type="text"
            placeholder="daily rate"
            className="form-control"
            component={input}
            symbol='$'
            label="Daily rate"
            validate={required}
        />

        <Field
            name="description"
            type="text"
            placeholder="description"
            className="form-control"
            component={TextArea}
            rows={5}
            label="Description"
            validate={required}
        />

        <Field
            name="image"
            placeholder="file"
            className="form-control"
            component={FileInput}
            label="Upload image"
        />

        <Field
            name="shared"
            className="form-control"
            type="checkbox"
            component={input}
            label="Shared"
        />

        


        <button type="submit" className="btn btn-form btn-bwm" disabled={!valid || pristine || submitting}>
          Add rental
        </button>
        <div>
          <Errors errors={errors}/>
        </div>
    </form>
  )
}


export default reduxForm({
    form: 'RentalCreateForm', initialValues:{shared:false, category:'house'}// a unique identifier for this form
  })(RentalCreateForm)



