import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import { AutoForm, AutoField, ErrorField } from 'uniforms-material'
import { useTranslation } from 'react-i18next'

import createLoginSchema from './loginSchema'
import DefaultSubmitField from '../DefaultSubmitField'

const LoginForm = ({ header, onSubmit, onChange, model, createValidator, customErrors }) => {
  const { t, i18n } = useTranslation()

  return (
    <div>
      <Typography variant="h4" gutterBottom={true}>
        {header || t('Please login!')}
      </Typography>
      <AutoForm
        schema={createLoginSchema({ i18n, createValidator })}
        onSubmit={onSubmit}
        onChange={onChange}
        model={model}
      >
        <AutoField name={'email'} />
        <ErrorField
          name={'email'}
          errorMessage={(customErrors && customErrors['email']) || t('Must be an valid email address!')}
        />
        <AutoField name={'password'} />
        <ErrorField
          name={'password'}
          errorMessage={(customErrors && customErrors['password']) || t('Can not be empty!')}
        />
        <DefaultSubmitField label={t('LOGIN')}/>
      </AutoForm>
    </div>
  )
}

LoginForm.propTypes = {
  header: PropTypes.string,
  model: PropTypes.object,
  customErrors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default LoginForm