import React from 'react'

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
  ]
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