/* eslint-disable max-lines */
import jwt from 'jsonwebtoken'

const PREFIX = '@redux-auth'

export const makeReduxAuth = (
  { logIn, logOut, checkIfLoggedIn, sendForgotPasswordEmail },
  { flashMessage, flashErrorMessage, flashSuccessMessage } = {},
  t = ((string) => string)
) => {
  const SET_USER_DATA = `${PREFIX}/SET_USER_DATA`
  const SET_USER_IS_LOGGED_IN = `${PREFIX}/SET_USER_IS_LOGGED_IN`
  const SET_USER_IS_LOGGED_OUT = `${PREFIX}/SET_USER_IS_LOGGED_OUT`

  const USER_IS_LOGGING_IN = `${PREFIX}/USER_IS_LOGGING_IN`
  const USER_LOGIN_FAILURE = `${PREFIX}/USER_LOGIN_FAILURE`

  const sendForgotPasswordEmailAsyncAction = email => dispatch => {
    flashMessage && dispatch(flashMessage(t('Sending email in progress')))
    sendForgotPasswordEmail(email)
      .then(() => flashSuccessMessage && dispatch(flashSuccessMessage(t('E-mail with instructions was sent!'))))
      .catch(err => {
        console.log(err, err.response.data) // eslint-disable-line no-console

        if (err.response.data.message === 'No such user!') {
          flashErrorMessage && dispatch(flashErrorMessage(
            t('No such user!')
          ))
        } else {
          flashErrorMessage && dispatch(flashErrorMessage(t('Something went wrong!')))
        }
      })
  }

  const loginSuccessful = dispatch => userData => {
    const { accessToken, refreshToken } = userData
    flashSuccessMessage && dispatch(flashSuccessMessage(t('Logged in successfully!')))
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
      flashErrorMessage && dispatch(flashErrorMessage(t('Login failure! - ') + displayedErrors[message]))
    } else if (!notDisplayedErrors.includes(message)) {
      flashErrorMessage && dispatch(flashErrorMessage(t('Unknown authorization problem!')))
    }
  }
  const loginFailed = dispatch => error => {
    handleErrorNotification(dispatch, error)
    dispatch(userLoginFailureAction(error))
    dispatch(setUserIsLoggedOutAction())
    return error
  }

  const createLogInAsyncAction = logInFromDb => (
    (email, password) => (dispatch, getState) => {
      flashMessage && dispatch(flashMessage(t('Logging in')))
      dispatch(userIsLoggingInAction())

      return logInFromDb(email, password)
        .then(loginSuccessful(dispatch))
        .catch(loginFailed(dispatch))
    }
  )

  const logInAsyncAction = createLogInAsyncAction(logIn)

  const createCheckIfLoggedInAsyncAction = checkIfLoggedInFromDb => (
    () => (dispatch, getState) => {
      dispatch(userIsLoggingInAction())

      return checkIfLoggedInFromDb()
        .then(loginSuccessful(dispatch))
        .catch(loginFailed(dispatch))
    }
  )

  const checkIfLoggedInAsyncAction = (
    createCheckIfLoggedInAsyncAction(checkIfLoggedIn)
  )

  const createLogOutAsyncAction = logOutFormDb => (
    () => (dispatch, getState) => {
      return logOutFormDb()
        .then(() => {
          dispatch(setUserIsLoggedOutAction())
        })
    }
  )

  const logOutAsyncAction = createLogOutAsyncAction(logOut)

  const setUserDataAction = userData => ({
    type: SET_USER_DATA,
    userData,
  })
  const setUserIsLoggedInAction = (accessToken, refreshToken) => ({
    type: SET_USER_IS_LOGGED_IN,
    accessToken,
    refreshToken,
  })
  const setUserIsLoggedOutAction = () => ({ type: SET_USER_IS_LOGGED_OUT })

  const userIsLoggingInAction = () => ({ type: USER_IS_LOGGING_IN })
  const userLoginFailureAction = loginError => ({
    type: USER_LOGIN_FAILURE,
    loginError,
  })

  const initialState = {
    isUserLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    userData: null,
    userIsLoggingIn: false,
    loginError: null,
  }

  const reducer = (state = initialState, action) => {
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

  return {
    sendForgotPasswordEmailAsyncAction,
    logInAsyncAction,
    checkIfLoggedInAsyncAction,
    logOutAsyncAction,
    setUserDataAction,
    setUserIsLoggedInAction,
    setUserIsLoggedOutAction,
    userIsLoggingInAction,
    userLoginFailureAction,
    reducer,
  }
}

export default makeReduxAuth