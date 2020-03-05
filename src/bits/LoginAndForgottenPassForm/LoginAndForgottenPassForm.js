import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'

import LoginForm from '../LoginForm'
import ForgottenPassForm from '../ForgottenPassForm'

const LoginAndForgottenPassForm = (props) => {
  const t = props.i18n.t

  const [forgottenPass, setForgottenPass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toggleForgottenPass = () => setForgottenPass(!forgottenPass)
  const onFormChange = (key, value) => {
    if (key === 'email') setEmail(value)
    if (key === 'password') setPassword(value)
  }

  const commonProps = {
    customErrors: props.customErrors,
    createValidator: props.createValidator,
    onChange: onFormChange,
    model: { email, password },
  }

  return (
    <div>
      {
        forgottenPass ?
          <ForgottenPassForm
            i18n={props.i18n}
            header={props.forgottenPassHeader}
            onSubmit={props.onForgottenPassSubmit}
            {...commonProps}
          />
          :
          <LoginForm
            i18n={props.i18n}
            header={props.loginFormHeader}
            onSubmit={props.onLoginSubmit}
            {...commonProps}
          />
      }
      {/* <Button
        fullWidth={true}
        onClick={toggleForgottenPass}
      >
        {
          forgottenPass ?
            (props.customButtonLabels && props.customButtonLabels.back) || t('Back to login form')
            :
            (props.customButtonLabels && props.customButtonLabels.forgot) || t('I forgot my password')
        }
      </Button> */}
    </div>
  )
}

LoginAndForgottenPassForm.propTypes = {
  i18n: PropTypes.object.isRequired,
  header: PropTypes.string,
  customErrors: PropTypes.object,
  loginFormHeader: PropTypes.string,
  forgottenPassHeader: PropTypes.string,
  customButtonLabels: PropTypes.exact({
    back: PropTypes.string,
    forgot: PropTypes.string,
  }),
  onLoginSubmit: PropTypes.func.isRequired,
  onForgottenPassSubmit: PropTypes.func.isRequired,
  createValidator: PropTypes.func.isRequired,
}

export default LoginAndForgottenPassForm