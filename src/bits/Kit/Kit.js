/* eslint-disable max-lines */
import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import LoadingIndicator from '../LoadingIndictor'
import LanguageSwitcher from '../LanguageSwitcher'
import { routesPropType } from '../NavList'

import DefaultAdminLayout from '../AdminLayout'
import Router from '../Router'
import Header from './Header'
import Nav from './Nav'

import LoginAndForgottenPassForm from '../LoginAndForgottenPassForm'
import DefaultLoginLayout from '../LoginLayout'

import { createValidator as createDefaultValidator } from './defaultValidator'

const headerProps = {
  color: 'primary',
  menuButtonProps: {
    style: { color: '#FFFFFF' },
  },
}

const Kit = (props) => {
  const theme = createMuiTheme(props.theme)
  const AdminComponent = props.adminComponent || DefaultAdminLayout
  const LoginComponent = props.loginComponent || DefaultLoginLayout

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingIndicator />}>
        {
          props.isUserLoggedIn ?
            <AdminComponent
              header={
                <Header
                  label={props.appTitle}
                  routes={props.profileMenuRoutes}
                  languages={props.languages}
                  userAvatarSrc={props.userAvatarSrc}
                  {...props.headerProps}
                />
              }
              headerProps={headerProps}
              nav={
                ({ setOpened }) => (
                  <Nav
                    routes={props.mainMenuRoutes}
                    setOpened={setOpened}
                    {...props.navProps}
                  />
                )
              }
              content={
                props.adminContent ||
                <Router
                  history={props.history}
                  routes={props.routerRoutes}
                  {...props.routerProps}
                />
              }
              footer={props.footer}
              {...props.adminProps}
            />
            :
            <LoginComponent
              header={
                props.languages ?
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <LanguageSwitcher
                      noLabel={true}
                      languages={props.languages}
                      {...props.languageSwitcherProps}
                    />
                  </div>
                  :
                  null
              }
              aside={props.loginAside}
              content={
                props.loginContent ||
                <LoginAndForgottenPassForm
                  onLoginSubmit={props.onLoginSubmit}
                  onForgottenPassSubmit={props.onForgottenPassSubmit}
                  createValidator={props.createValidator || createDefaultValidator}
                  {...props.loginFormProps}
                />
              }
              footer={props.footer}
              {...props.loginProps}
            />
        }
        {props.children}
      </Suspense>
    </ThemeProvider>
  )
}

Kit.propTypes = {
  footer: PropTypes.node,
  children: PropTypes.node,
  loginAside: PropTypes.node,
  appTitle: PropTypes.node,
  routerRoutes: routesPropType,
  loginComponent: PropTypes.func,
  adminComponent: PropTypes.func,
  mainMenuRoutes: routesPropType,
  userAvatarSrc: PropTypes.string,
  createValidator: PropTypes.func,
  profileMenuRoutes: routesPropType,
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
  onForgottenPassSubmit: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),

  headerProps: PropTypes.object,
  navProps: PropTypes.object,
  routerProps: PropTypes.object,
  adminProps: PropTypes.object,
  languageSwitcherProps: PropTypes.object,
  loginFormProps: PropTypes.object,
  loginProps: PropTypes.object,

  adminContent: PropTypes.node,
  loginContent: PropTypes.node,
}

export default Kit