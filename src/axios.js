import axios from 'axios'

import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { refreshTokens, getAccessToken } from './auth'

axios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()

    if (accessToken) {
      // config.headers['Authorization'] = `Bearer ${ accessToken }`
      if (!config.params) config.params = {}
      config.params['auth'] = accessToken
    }

    return config
  },

  (error) => {
    return Promise.reject(error)
  }
)

const refreshAuthLogic = failedRequest => {
  return refreshTokens()
    .then(() => {
      const accessToken = getAccessToken()

      // failedRequest.response.config.headers['Authorization'] = 'Bearer ' + accessToken
      if (!failedRequest.response.config.params) failedRequest.response.config.params = {}
      failedRequest.response.config.params['auth'] = accessToken

      return failedRequest
    })
    .catch((error) => failedRequest)
}

createAuthRefreshInterceptor(axios, refreshAuthLogic)

export default axios