import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import { AutoForm, AutoField, ErrorField } from 'uniforms-material'

import createForgottenPassSchema from './forgottenPassSchema'
import DefaultSubmitField from '../DefaultSubmitField'

const ForgottenPassForm = ({ i18n, header, onSubmit, onChange, model, createValidator, customErrors }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom={true}>
        {header || i18n.t('Please login!')}
      </Typography>
      <AutoForm
        schema={createForgottenPassSchema({ i18n, createValidator })}
        onSubmit={onSubmit}
        onChange={onChange}
        model={model}
      >
        <AutoField name={'email'} />
        <ErrorField
          name={'email'}
          errorMessage={(customErrors && customErrors['email']) || i18n.t('Must be an valid email address!')}
        />
        <DefaultSubmitField label={i18n.t('REMIND')} />
      </AutoForm>
    </div>
  )
}

ForgottenPassForm.propTypes = {
  i18n: PropTypes.object.isRequired,
  header: PropTypes.string,
  model: PropTypes.object,
  customErrors: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default ForgottenPassForm