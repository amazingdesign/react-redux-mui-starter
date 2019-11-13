import React from 'react'

import { AutoForm } from 'uniforms-material'
import { useTranslation } from 'react-i18next'

import createLoginSchema from './loginSchema'
import DefaultSubmitField from '../DefaultSubmitField/DefaultSubmitField'

export default function Login() {
  const { t } = useTranslation(undefined)

  return (
    <div>
      <h1>{t('Please login!')}</h1>
      <AutoForm
        schema={createLoginSchema()}
        submitField={DefaultSubmitField}
        onSubmit={console.log}
      />
    </div>
  )
}