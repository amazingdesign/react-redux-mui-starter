import React from 'react'

import { history } from '../store'

import AdminLayout from '../bits/AdminLayout'

import CopyrightFooter from '../pieces/CopyrightFooter'
import Header from '../pieces/Header'

import Router from '../bits/Router'

const Admin = (props) => (
  <AdminLayout
    header={<Header />}
    nav={'nav'}
    content={<Router
      history={history}
      routes={[{
        name: 'Home',
        path: ['/', '/dashboard'],
        component: React.lazy(() => import('../pages/dashboard')),
        icon: React.lazy(() => import('@material-ui/icons/Dashboard')),
        sideBar: {
          separatorAbove: false,
          separatorBelow: true,
        },
      }]}
    />}
    footer={<CopyrightFooter />}
  />
)

export default Admin