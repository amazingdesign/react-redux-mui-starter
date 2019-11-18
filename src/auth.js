import { flashMessage, flashErrorMessage } from 'redux-flash'

import axios from './axios'
import { i18n } from './i18n'

import { makeReduxAuth } from './bits/makeReduxAuth'
import { makeAuthRequests } from './bits/makeAuthRequests'

// eslint-disable-next-line max-len
const LOG_IN_URL = window._env_.REACT_APP_LOG_IN_URL 
const REFRESH_TOKEN_URL = window._env_.REACT_APP_REFRESH_TOKEN_URL 
// eslint-disable-next-line max-len
const FORGOT_PASSWORD_URL = window._env_.REACT_APP_FORGOT_PASSWORD_URL 

const t = i18n.t.bind(i18n)

const flashSuccessMessage = (message, options) => flashMessage(message, { ...options, props: { variant: 'success' } })

export const {
  logIn,
  logOut,
  refreshTokens,
  getAccessToken,
  checkIfLoggedIn,
  sendForgotPasswordEmail,
} = makeAuthRequests({
  loginRequestFunction: (email, password) => (
    axios
      .post(LOG_IN_URL, { email, password, returnSecureToken: 'true' })
      .then(({ data }) => ({ data: { accessToken: data.idToken, refreshToken: data.refreshToken } }))
  ),
  refreshTokenRequestFunction: (refreshToken) => (
    axios
      .post(REFRESH_TOKEN_URL, { grant_type: 'refresh_token', refresh_token: refreshToken })
      .then(({ data }) => ({ data: { accessToken: data.id_token, refreshToken: data.refresh_token } }))
  ),
  forgotPasswordRequestFunction: (email) => axios.post(FORGOT_PASSWORD_URL, { email, requestType: 'PASSWORD_RESET' }),
})

export const {
  logInAsyncAction,
  logOutAsyncAction,
  checkIfLoggedInAsyncAction,
  sendForgotPasswordEmailAsyncAction,
  setUserDataAction,
  userIsLoggingInAction,
  userLoginFailureAction,
  setUserIsLoggedInAction,
  setUserIsLoggedOutAction,
  reducer,
} = makeReduxAuth(
  { logIn, logOut, checkIfLoggedIn, sendForgotPasswordEmail },
  { flashMessage, flashErrorMessage, flashSuccessMessage },
  t
)