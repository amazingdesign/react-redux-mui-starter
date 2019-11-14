import React, { useState } from 'react'

import { Provider } from 'react-redux'
import { store, history } from './store'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import createValidator from './validator'

import AdminLayout from './layouts/AdminLayout'
import LoginLayout from './layouts/LoginLayout'

import CopyrightFooter from './pieces/CopyrightFooter'
import LoginImage from './pieces/LoginImage'
import Header from './pieces/Header'

import Login from './bits/Login'
import Router from './bits/Router'
import LanguageSwitcher from './bits/LanguageSwitcher'
import DisplayFlashToasts from './bits/DisplayFlashToasts/'

const theme = createMuiTheme()

const App = () => {
  const [isLoggedIn] = useState(false)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {
          isLoggedIn ?
            <AdminLayout
              header={<Header />}
              nav={'nav'}
              content={<Router
                history={history}
                routes={[{
                  name: 'Home',
                  path: ['/', '/dashboard'],
                  component: React.lazy(() => import('./pages/dashboard')),
                  icon: React.lazy(() => import('@material-ui/icons/Dashboard')),
                  sideBar: {
                    separatorAbove: false,
                    separatorBelow: true,
                  },
                }]}
              />}
              footer={<CopyrightFooter />}
            />
            :
            <LoginLayout
              header={
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <LanguageSwitcher
                    noLabel={true}
                    languages={[
                      { code: 'pl', name: 'Polski' },
                      { code: 'en', name: 'Angielski' },
                    ]}
                  />
                </div>
              }
              aside={<LoginImage />}
              content={<Login
                createValidator={createValidator}
                customErrors={{
                  email: 'Must be an valid email address!',
                  password: 'Can not be empty!',
                }}
              />}
              footer={<CopyrightFooter />}
            />
        }
      </ThemeProvider>
      <DisplayFlashToasts />
    </Provider>
  )
}

export default App