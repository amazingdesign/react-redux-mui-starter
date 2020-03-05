import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import { AutoForm, AutoField, ErrorField } from 'uniforms-material'

import DefaultSubmitField from '@bit/amazingdesign.react-redux-mui-starter.default-submit-field'

import createLoginSchema from './loginSchema'

const LoginForm = ({ i18n, header, onSubmit, onChange, model, createValidator, customErrors }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom={true}>
        {header || i18n.t('Please login!')}
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
          errorMessage={(customErrors && customErrors['email']) || i18n.t('Must be an valid email address!')}
        />
        <AutoField name={'password'} />
        <ErrorField
          name={'password'}
          errorMessage={(customErrors && customErrors['password']) || i18n.t('Can not be empty!')}
        />
        <DefaultSubmitField label={i18n.t('LOGIN')} />
      </AutoForm>
    </div>
  )
}

LoginForm.propTypes = {
  i18n: PropTypes.object.isRequired,
  header: PropTypes.string,
  model: PropTypes.object,
  customErrors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default LoginForm