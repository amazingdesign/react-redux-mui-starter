import axios from 'axios'

import createAuthRefreshInterceptor from 'axios-auth-refresh'

import { refreshTokens, getAccessToken } from './auth'

const refreshAuthLogic = failedRequest => {
  return refreshTokens()
    .then(() => {
      const accessToken = getAccessToken()
      failedRequest.response.config.headers['Authorization'] = (
        'Bearer ' + accessToken
      )
      return failedRequest
    })
}

createAuthRefreshInterceptor(axios, refreshAuthLogic)

export default axios