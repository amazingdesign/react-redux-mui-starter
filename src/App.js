import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { history } from './store'
import { logOutAsyncAction, logInAsyncAction, checkIfLoggedInAsyncAction } from './state/auth'

import { useTranslation } from 'react-i18next'

import DisplayFlashToasts from './bits/DisplayFlashToasts/'

import Kit from './bits/Kit'

import CopyrightFooter from './pieces/CopyrightFooter'
import LoginImage from './pieces/LoginImage'

const theme = {
  palette: {
    primary: {
      main: '#323330',
    },
    secondary: {
      main: '#F0DB4F',
    },
  },
}

const App = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(null, { useSuspense: false })

  const onLoginFormSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)

  const userAvatarSrc = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.avatar)

  useEffect(() => {
    dispatch(checkIfLoggedInAsyncAction())
  }, [])

  const languages = [
    { code: 'pl', name: t('Polish') },
    { code: 'en', name: t('English') },
  ]

  const routes = [
    {
      name: t('Home'),
      path: ['/', '/dashboard'],
      component: React.lazy(() => import('./pages/dashboard')),
      icon: 'dashboard',
      separator: {
        above: false,
        below: false,
      },
    },
    {
      name: t('Profile'),
      path: '/profile',
      component: React.lazy(() => import('./pages/profile')),
      icon: 'people',
      separator: {
        above: false,
        below: true,
      },
    },
    {
      name: t('Google'),
      link: 'https://google.com',
      icon: 'search',
      separator: {
        above: false,
        below: true,
      },
    },
  ]

  const profileMenuRoutes = [
    {
      name: t('Profile'),
      path: '/profile',
      component: React.lazy(() => import('./pages/profile')),
      icon: 'people',
      separator: {
        above: false,
        below: true,
      },
    },
    {
      name: t('Logout'),
      icon: 'logout',
      onClick: () => dispatch(logOutAsyncAction()),
      separator: {
        above: false,
        below: false,
      },
    },
  ]

  return (
    <Kit
      theme={theme}
      languages={languages}
      isUserLoggedIn={isUserLoggedIn}
      onLoginFormSubmit={onLoginFormSubmit}

      history={history}
      profileMenuRoutes={profileMenuRoutes}
      mainMenuRoutes={routes}
      routerRoutes={routes}

      userAvatarSrc={userAvatarSrc}
      appTitle={'react-redux-mui-starter'}
      footer={<CopyrightFooter />}
      loginAside={<LoginImage />}
    >
      <DisplayFlashToasts />
    </Kit>
  )
}

export default App