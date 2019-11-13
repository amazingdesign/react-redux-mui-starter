import React from 'react'
import PropTypes from 'prop-types'

import { AutoForm, AutoField, ErrorField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'

import createLoginSchema from './loginSchema'
import DefaultSubmitField from '../DefaultSubmitField/DefaultSubmitField'

const Login = ({ header, onSubmit, createValidator, customErrors }) => {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <h1>{t(header)}</h1>
      <AutoForm
        schema={createLoginSchema({ i18n, createValidator })}
        onSubmit={onSubmit}
      >
        <AutoField name={'email'} />
        <ErrorField
          name={'email'}
          errorMessage={(customErrors && customErrors['email'])}
        />
        <AutoField name={'password'} />
        <ErrorField
          name={'password'}
          errorMessage={(customErrors && customErrors['password'])}
        />
        <DefaultSubmitField />
      </AutoForm>
    </div>
  )
}

Login.defaultProps = {
  header: 'Please login!',
  onSubmit: console.log,
}

Login.propTypes = {
  header: PropTypes.string,
  customErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default Login