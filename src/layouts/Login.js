import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { logInAsyncAction, checkIfLoggedInAsyncAction } from '../state/auth'

import { useTranslation } from 'react-i18next'

import createValidator from '../validator'

import LoginImage from '../pieces/LoginImage'
import CopyrightFooter from '../pieces/CopyrightFooter'

import LoginLayout from '../bits/LoginLayout'
import LoginForm from '../bits/LoginForm'
import LanguageSwitcher from '../bits/LanguageSwitcher'

const LoginPage = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(checkIfLoggedInAsyncAction())
  }, [])

  const onSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))

  return (
    <LoginLayout
      header={
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LanguageSwitcher
            noLabel={true}
            languages={[
              { code: 'pl', name: 'Polski' },
              { code: 'en', name: 'Angielski' },
            ]}
          />
        </div>
      }
      aside={<LoginImage />}
      content={<LoginForm
        header={t('Please login!')}
        onSubmit={onSubmit}
        createValidator={createValidator}
        customErrors={{
          email: 'Must be an valid email address!',
          password: 'Can not be empty!',
        }}
      />}
      footer={<CopyrightFooter />}
    />
  )
}

export default LoginPage