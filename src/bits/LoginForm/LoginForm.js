import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import { AutoForm, AutoField, ErrorField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'

import createLoginSchema from './loginSchema'
import DefaultSubmitField from '../DefaultSubmitField'

const LoginForm = ({ header, onSubmit, createValidator, customErrors }) => {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <Typography variant="h4" gutterBottom={true}>
        {t(header)}
      </Typography>
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

LoginForm.propTypes = {
  header: PropTypes.string,
  customErrors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default LoginForm