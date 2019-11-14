import axios from './axios'

const URL_CORE = 'https://core.amazingcms.amazingdesign.eu'
// const URL_CORE = window._env_.REACT_APP_URL_CORE

const saveTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

const deleteTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const getAccessToken = () => localStorage.getItem('accessToken')
const getRefreshToken = () => localStorage.getItem('refreshToken')

const getTokensFormResponseAndSave = response => {
  const data = response.data

  const { accessToken, refreshToken } = data

  saveTokens(accessToken, refreshToken)

  return data
}

export const refreshTokens = () => {
  const refreshToken = getRefreshToken()

  if(!refreshToken) return Promise.reject(new Error('No token in storage!'))

  return axios.post(
    `${URL_CORE}/api/auth/refreshToken`,
    { refreshToken }
  )
    .then(getTokensFormResponseAndSave)
}

export const logIn = (email, password) => {
  return axios.post(
    `${URL_CORE}/api/auth/logIn`,
    {
      email,
      password,
    }
  )
    .then(getTokensFormResponseAndSave)
}

export const logOut = () => {
  deleteTokens()

  return Promise.resolve()
}

export const sendForgotPasswordEmail = email => Promise.resolve()

export const checkIfLoggedIn = () => refreshTokens()