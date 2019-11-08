import React from 'react'

import { Provider } from 'react-redux'
import { store } from './store'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import AdminLayout from './layouts/AdminLayout'
import CopyrightFooter from './partials/CopyrightFooter'
import Header from './partials/Header'

const theme = createMuiTheme()

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AdminLayout
        header={<Header />}
        nav={'nav'}
        content={'content'}
        footer={<CopyrightFooter />}
      />
    </ThemeProvider>
  </Provider>
)

export default App