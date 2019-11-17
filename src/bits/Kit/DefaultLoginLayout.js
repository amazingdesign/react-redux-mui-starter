import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'
import { createValidator } from './defaultValidator'

import LoginLayout from '../LoginLayout'
import LoginForm from '../LoginForm'
import LanguageSwitcher from '../LanguageSwitcher'

const LoginPage = ({ languages, onSubmit, footer, aside }) => {
  const { t } = useTranslation()

  return (
    <LoginLayout
      header={
        languages ?
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LanguageSwitcher
              noLabel={true}
              languages={languages}
            />
          </div>
          :
          null
      }
      aside={aside}
      content={<LoginForm
        header={t('Please login!')}
        onSubmit={onSubmit}
        createValidator={createValidator}
        customErrors={{
          email: 'Must be an valid email address!',
          password: 'Can not be empty!',
        }}
      />}
      footer={footer}
    />
  )
}

LoginPage.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  onSubmit: PropTypes.func.isRequired,
  footer: PropTypes.node,
  aside: PropTypes.node,
}

export default LoginPage