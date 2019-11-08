import React from 'react'

import { Provider } from 'react-redux'
import { store, history } from './store'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import AdminLayout from './layouts/AdminLayout'
import CopyrightFooter from './partials/CopyrightFooter'
import Header from './partials/Header'
import Router from './components/Router'

const theme = createMuiTheme()

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
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
        },]} 
        />}
        footer={<CopyrightFooter />}
      />
    </ThemeProvider>
  </Provider>
)

export default App