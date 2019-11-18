import { flashMessage, flashErrorMessage } from 'redux-flash'

import axios from './axios'
import { i18n } from './i18n'

import { makeReduxAuth } from './bits/makeReduxAuth'
import { makeAuthRequests } from './bits/makeAuthRequests'

const LOG_IN_URL = 'https://core.amazingcms.amazingdesign.eu/api/auth/logIn'
const REFRESH_TOKEN_URL = 'https://core.amazingcms.amazingdesign.eu/api/auth/refreshToken'

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
  loginRequestFunction: (email, password) => axios.post(LOG_IN_URL, { email, password }),
  refreshTokenRequestFunction: (refreshToken) => axios.post(REFRESH_TOKEN_URL, { refreshToken }),
  forgotPasswordRequestFunction: (email) => Promise.resolve(),
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