import React, { useState } from 'react'

import { Provider } from 'react-redux'
import { store, history } from './store'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import AdminLayout from './layouts/AdminLayout'
import LoginLayout from './layouts/LoginLayout'

import CopyrightFooter from './partials/CopyrightFooter'
import Header from './partials/Header'
import Router from './components/Router'

import Login from './components/Login'
import LanguageSwitcher from './components/LanguageSwitcher'

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