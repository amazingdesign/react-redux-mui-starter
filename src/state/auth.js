/* eslint-disable max-lines */
import jwt from 'jsonwebtoken'
import {
  flashMessage,
  flashErrorMessage,
} from 'redux-flash'

import { logIn, logOut, checkIfLoggedIn, sendForgotPasswordEmail } from '../db/auth'
import { i18n } from '../i18n'

const t = i18n.t.bind(i18n)

const flashSuccessMessage = (message, options) => flashMessage(message, { ...options, props: { variant: 'success' } })

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_USER_IS_LOGGED_IN = 'auth/SET_USER_IS_LOGGED_IN'
const SET_USER_IS_LOGGED_OUT = 'auth/SET_USER_IS_LOGGED_OUT'

const USER_IS_LOGGING_IN = 'auth/USER_IS_LOGGING_IN'
const USER_LOGIN_FAILURE = 'auth/USER_LOGIN_FAILURE'

export const sendForgotPasswordEmailAsyncAction = email => dispatch => {
  dispatch(flashMessage(t('Sending email in progress')))
  sendForgotPasswordEmail(email)
    .then(() => dispatch(flashSuccessMessage(t('E-mail with instructions was sent!'))))
    .catch(err => {
      console.log(err, err.response.data) // eslint-disable-line no-console

      if (err.response.data.message === 'No such user!') {
        dispatch(flashErrorMessage(
          t('No such user!')
        ))
      } else {
        dispatch(flashErrorMessage(t('Something went wrong!')))
      }
    })
}

const loginSuccessful = dispatch => userData => {
  const { accessToken, refreshToken } = userData
  dispatch(flashSuccessMessage(t('Logged in successfully!')))
  dispatch(setUserDataAction(jwt.decode(accessToken)))
  dispatch(setUserIsLoggedInAction(accessToken, refreshToken))
  return userData
}
const handleErrorNotification = (dispatch, error) => {
  const message = (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) || error.message

  const displayedErrors = {
    'Invalid password': t('Invalid password!'),
    'User not found!': t('User not found!'),
  }
  const notDisplayedErrors = [
    'No token in storage!',
  ]
  if (Object.keys(displayedErrors).includes(message)) {
    dispatch(flashErrorMessage(t('Login failure! - ') + displayedErrors[message]))
  } else if (!notDisplayedErrors.includes(message)) {
    dispatch(flashErrorMessage(t('Unknown authorization problem!')))
  }
}
const loginFailed = dispatch => error => {
  handleErrorNotification(dispatch, error)
  dispatch(userLoginFailureAction(error))
  dispatch(setUserIsLoggedOutAction())
  return error
}

export const createLogInAsyncAction = logInFromDb => (
  (email, password) => (dispatch, getState) => {
    dispatch(flashMessage(i18n.t('Logging in ...')))
    dispatch(userIsLoggingInAction())

    return logInFromDb(email, password)
      .then(loginSuccessful(dispatch))
      .catch(loginFailed(dispatch))
  }
)

export const logInAsyncAction = createLogInAsyncAction(logIn)

const createCheckIfLoggedInAsyncAction = checkIfLoggedInFromDb => (
  () => (dispatch, getState) => {
    dispatch(userIsLoggingInAction())

    return checkIfLoggedInFromDb()
      .then(loginSuccessful(dispatch))
      .catch(loginFailed(dispatch))
  }
)

export const checkIfLoggedInAsyncAction = (
  createCheckIfLoggedInAsyncAction(checkIfLoggedIn)
)

export const createLogOutAsyncAction = logOutFormDb => (
  () => (dispatch, getState) => {
    return logOutFormDb()
      .then(() => {
        dispatch(setUserIsLoggedOutAction())
      })
  }
)

export const logOutAsyncAction = createLogOutAsyncAction(logOut)

export const setUserDataAction = userData => ({
  type: SET_USER_DATA,
  userData,
})
export const setUserIsLoggedInAction = (accessToken, refreshToken) => ({
  type: SET_USER_IS_LOGGED_IN,
  accessToken,
  refreshToken,
})
export const setUserIsLoggedOutAction = () => ({ type: SET_USER_IS_LOGGED_OUT })

export const userIsLoggingInAction = () => ({ type: USER_IS_LOGGING_IN })
export const userLoginFailureAction = loginError => ({
  type: USER_LOGIN_FAILURE,
  loginError,
})

export const initialState = {
  isUserLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  userData: null,
  userIsLoggingIn: false,
  loginError: null,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_IS_LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: true,
        userIsLoggingIn: false,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        loginError: initialState.loginError,
      }
    case SET_USER_IS_LOGGED_OUT:
      return {
        ...initialState,
        loginError: state.loginError,
      }
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.userData,
      }
    case USER_IS_LOGGING_IN:
      return {
        ...state,
        userIsLoggingIn: true,
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.loginError,
        userIsLoggingIn: false,
      }
    default:
      return state
  }
}

export default reducer