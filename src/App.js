import React, { useState } from 'react'

import { Provider } from 'react-redux'
import { store, history } from './store'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import AdminLayout from './layouts/AdminLayout'
import LoginLayout from './layouts/LoginLayout'

import CopyrightFooter from './pieces/CopyrightFooter'
import Header from './pieces/Header'
import Router from './bits/Router'

import Login from './bits/Login'
import LanguageSwitcher from './bits/LanguageSwitcher'

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
              content={
                <div>
                  <LanguageSwitcher
                    noLabel={true}
                    languages={[
                      { code: 'pl', name: 'Polski' },
                      { code: 'en', name: 'Angielski' },
                    ]}
                  />
                  <Login />
                </div>
              }
            />
        }
      </ThemeProvider>
    </Provider>
  )
}

export default App