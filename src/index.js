import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { store } from './store'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'


import './i18n'
import './index.css'

import App from './App'

import * as serviceWorker from './serviceWorker'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#323330',
    },
    secondary: {
      main: '#F0DB4F',
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Suspense fallback={'Loading..'}>
        <App />
      </Suspense>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
