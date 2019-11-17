import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import LoadingIndicator from '../LoadingIndictor'
import { routesPropType } from '../NavList'

import DefaultAdminLayout from './DefaultAdminLayout'
import DefaultLoginLayout from './DefaultLoginLayout'

const Kit = (props) => {
  const theme = createMuiTheme(props.theme)
  const AdminComponent = props.adminComponent || DefaultAdminLayout
  const LoginComponent = props.loginComponent || DefaultLoginLayout

  const commonProps = {
    footer: props.footer,
    languages: props.languages,
  }

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingIndicator />}>
        {
          props.isUserLoggedIn ?
            <AdminComponent
              profileMenuRoutes={props.profileMenuRoutes}
              mainMenuRoutes={props.mainMenuRoutes}
              routerRoutes={props.routerRoutes}
              history={props.history}
              appTitle={props.appTitle}
              userAvatarSrc={props.userAvatarSrc}
              {...commonProps}
            />
            :
            <LoginComponent
              onSubmit={props.onLoginFormSubmit}
              aside={props.loginAside}
              {...commonProps}
            />
        }
        {props.children}
      </Suspense>
    </ThemeProvider>
  )
}

Kit.propTypes = {
  profileMenuRoutes: routesPropType,
  mainMenuRoutes: routesPropType,
  routerRoutes: routesPropType,
  adminComponent: PropTypes.func,
  loginComponent: PropTypes.func,
  children: PropTypes.node,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onLoginFormSubmit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  languages: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  footer: PropTypes.node,
  loginAside: PropTypes.node,
  appTitle: PropTypes.string,
  userAvatarSrc: PropTypes.string,
  history: PropTypes.object.isRequired,
}

export default Kit