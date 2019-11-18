export const makeAuthRequests = ({
  loginRequestFunction,
  refreshTokenRequestFunction,
  forgotPasswordRequestFunction,
}) => {
  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  const deleteTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  const getAccessToken = () => localStorage.getItem('accessToken')
  const getRefreshToken = () => localStorage.getItem('refreshToken')

  const getTokensFormResponseAndSave = response => {
    const data = response.data

    const { accessToken, refreshToken } = data

    saveTokens(accessToken, refreshToken)

    return data
  }

  const logIn = (email, password) => {
    return loginRequestFunction(email, password)
      .then(getTokensFormResponseAndSave)
  }

  const logOut = () => {
    deleteTokens()

    return Promise.resolve()
  }

  const refreshTokens = () => {
    const refreshToken = getRefreshToken()

    if (!refreshToken) return Promise.reject(new Error('No token in storage!'))

    return refreshTokenRequestFunction(refreshToken)
      .then(getTokensFormResponseAndSave)
  }

  const sendForgotPasswordEmail = email => forgotPasswordRequestFunction(email)

  const checkIfLoggedIn = () => refreshTokens()

  return {
    getAccessToken,
    refreshTokens,
    logIn,
    logOut,
    sendForgotPasswordEmail,
    checkIfLoggedIn,
  }
}

export default makeAuthRequests