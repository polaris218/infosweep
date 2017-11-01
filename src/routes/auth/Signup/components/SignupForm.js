import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import _ from 'underscore'

import { checkValidation } from 'utils/formHelpers'
import fields from 'consts/formFields'
import { FormGroup, FormControl } from 'components'

const formFields = [
  'firstName',
  'lastName',
  'email',
  'phoneNumber',
  'password',
  'passwordConfirmation'
]

const signupFormFields = _.pick(fields, formFields)

const validate = values => {
  return checkValidation(values, fields)
}

const renderInput = (props) => {
  const {
    label,
    input,
    placeHolder,
    type,
    maxLength,
    meta: { touched, error, warning }
  } = props

  let message = touched && (error && <span className='text-danger'><strong>Opps!</strong> {error}</span>)
  let validationState = touched && (error && 'error') || null
  return (
    <FormGroup validationState={validationState}>
      <label>
        {label}
      </label>
      <FormControl {...input}
        placeholder={placeHolder}
        maxLength={maxLength}
        type={type} />
      {message}
    </FormGroup>
  )
}

const renderFields = () => {
  const fieldKeys = Object.keys(signupFormFields)
  return fieldKeys.map(function (key, i) {
    const { name, type, placeHolder, label, normalize, value } = fields[key]
    return (
      <Field
        key={i}
        name={name}
        type={type}
        component={renderInput}
        placeHolder={placeHolder}
        label={label}
        value={value}
        normalize={normalize}
      />
    )
  })
}

let SignupForm = props => {
  const {
    submitForm,
    handleSubmit,
    invalid,
    submitting,
    passwordErrorMsg,
    showModal
  } = props

  const _onClick = e => {
    showModal(e.target.name)
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>

      {renderFields()}

      <span className='text-danger'>{passwordErrorMsg}</span>
      <p>
        By clicking Register, you agree to
        our <a name='TOS' onClick={_onClick}> Terms </a>
        and that you have read
        our <a name='PRIVACY_POLICY' onClick={_onClick}> Privacy Policy</a>,
        including our Cookie Use.
      </p>

      <button
        className='full-width btn btn-primary m-b-2'
        disabled={invalid || submitting}
        action="submit"
      >
        Register
      </button>
    </form>
  )
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  passwordErrorMsg: PropTypes.string,
  showModal: PropTypes.func,
  submitForm: PropTypes.func.isRequired
}

SignupForm = reduxForm({
  form: 'signupForm',  // a unique identifier for this form
  validate                // <--- validation function given to redux-form
})(SignupForm)

export default SignupForm
