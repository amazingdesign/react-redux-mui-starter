import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { history } from './store'
import { logOutAsyncAction, logInAsyncAction, checkIfLoggedInAsyncAction } from './state/auth'
import restServices from './db/restServices'

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

const languages = [
  { code: 'pl', name: 'Polski' },
  { code: 'en', name: 'Angielski' },
]

const App = () => {
  const dispatch = useDispatch()

  const onLoginFormSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)

  const userAvatarSrc = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.avatar)

  useEffect(() => {
    dispatch(checkIfLoggedInAsyncAction())
  }, [])

  const routes = [
    {
      name: 'Home',
      path: ['/', '/dashboard'],
      component: React.lazy(() => import('./pages/dashboard')),
      icon: 'dashboard',
      separator: {
        above: false,
        below: false,
      },
    },
    {
      name: 'Profile',
      path: '/profile',
      component: React.lazy(() => import('./pages/profile')),
      icon: 'people',
      separator: {
        above: false,
        below: true,
      },
    },
    {
      name: 'Google',
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
      name: 'Profile',
      path: '/profile',
      component: React.lazy(() => import('./pages/profile')),
      icon: 'people',
      separator: {
        above: false,
        below: true,
      },
    },
    {
      name: 'Logout',
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
      appTitle={'XXX'}
      footer={<CopyrightFooter />}
      loginAside={<LoginImage />}
    >
      <DisplayFlashToasts />
    </Kit>
  )
}

export default App