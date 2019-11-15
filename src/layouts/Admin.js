import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import restServices from '../db/restServices'

import AdminLayout from '../bits/AdminLayout'

import CopyrightFooter from '../pieces/CopyrightFooter'
import Header from '../pieces/Header'

import MainContent from '../pieces/MainContent'
import Nav from '../pieces/Nav'

const headerProps = {
  color: 'primary',
  menuButtonProps: {
    style: { color: '#FFFFFF' },
  },
}

const Admin = (props) => {
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
      component: React.lazy(() => import('../pages/course')),
      icon: 'play_circle_outline',
      routes: (
        course.lessons &&
        course.lessons.map(lesson => ({
          name: lesson.name,
          key: lesson.id,
          path: `/lesson/${lesson.id}`,
          component: React.lazy(() => import('../pages/lesson')),
          icon: 'play_circle_filled',
        }))
      ),
    }))
  ) || []

  console.log(courseRoutes)

  useEffect(() => {
    dispatch(restServices.actions.courses.find())
  }, [])

  const profileMenuRoutes = [
    {
      name: 'Home',
      path: ['/', '/dashboard'],
      component: React.lazy(() => import('../pages/dashboard')),
      icon: 'dashboard',
      separator: {
        above: false,
        below: false,
      },
    },
    {
      name: 'Profile',
      path: '/profile',
      component: React.lazy(() => import('../pages/profile')),
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
  const routes = profileMenuRoutes

  return (
    <AdminLayout
      header={<Header routes={profileMenuRoutes} />}
      headerProps={headerProps}
      nav={({ setOpened }) => <Nav routes={mainMenuRoutes} setOpened={setOpened} />}
      content={<MainContent routes={routes} />}
      footer={<CopyrightFooter />}
    />
  )
}

export default Admin