import React from 'react'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import AdminLayout from './layouts/AdminLayout'
import CopyrightFooter from './partials/CopyrightFooter'
import Header from './partials/Header'
import { Button } from '@material-ui/core'

const theme = createMuiTheme()

const App = () => (
  <ThemeProvider theme={theme}>
    <AdminLayout
      header={<Header />}
      nav={'nav'}
      content={<Button color={'primary'}>CLICK</Button>}
      footer={<CopyrightFooter />}
    />
  </ThemeProvider>
)

export default App