import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { history } from './store'
import { logInAsyncAction, checkIfLoggedInAsyncAction } from './state/auth'
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
  // 
  const dispatch = useDispatch()
  const coursesData = useSelector(state => state.courses.find.data)
  const coursesRows = coursesData && coursesData.rows

  const courseRoutes = (
    coursesRows &&
    coursesRows.map(course => ({
      type: 'group',
      name: course.name,
      key: course._id,
      path: `/course/${course._id}`,
      component: React.lazy(() => import('./pages/course')),
      icon: 'play_circle_outline',
      routes: (
        course.lessons &&
        course.lessons.map(lesson => ({
          name: lesson.name,
          key: lesson.id,
          path: `/lesson/${lesson.id}`,
          component: React.lazy(() => import('./pages/lesson')),
          icon: 'play_circle_filled',
        }))
      ),
    }))
  ) || []

  useEffect(() => {
    dispatch(restServices.actions.courses.find())
  }, [])

  const profileMenuRoutes = [
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
        below: false,
      },
    },
  ].concat(courseRoutes)

  const mainMenuRoutes = profileMenuRoutes
  const routerRoutes = profileMenuRoutes

  // 

  useEffect(() => {
    dispatch(checkIfLoggedInAsyncAction())
  }, [])

  const onLoginFormSubmit = ({ email, password }) => dispatch(logInAsyncAction(email, password))

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn)
  const userAvatarSrc = useSelector((state) => state.auth && state.auth.userData && state.auth.userData.avatar)

  return (
    <Kit
      theme={theme}
      languages={languages}
      isUserLoggedIn={isUserLoggedIn}
      onLoginFormSubmit={onLoginFormSubmit}

      history={history}
      profileMenuRoutes={profileMenuRoutes}
      mainMenuRoutes={mainMenuRoutes}
      routerRoutes={routerRoutes}

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