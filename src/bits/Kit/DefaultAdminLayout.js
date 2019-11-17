import React from 'react'
import PropTypes from 'prop-types'

import AdminLayout from '../AdminLayout'
import Router from '../Router'
import { routesPropType } from '../NavList'

import Header from './Header'
import Nav from './Nav'

const headerProps = {
  color: 'primary',
  menuButtonProps: {
    style: { color: '#FFFFFF' },
  },
}

const Admin = (props) => {
  return (
    <AdminLayout
      header={<Header
        label={props.appTitle}
        routes={props.profileMenuRoutes}
        languages={props.languages}
        userAvatarSrc={props.userAvatarSrc}
      />}
      headerProps={headerProps}
      nav={({ setOpened }) => <Nav routes={props.mainMenuRoutes} setOpened={setOpened} />}
      content={<Router
        history={props.history}
        routes={props.routerRoutes}
      />}
      footer={props.footer}
    />
  )
}

Admin.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  profileMenuRoutes: routesPropType,
  mainMenuRoutes: routesPropType,
  routerRoutes: routesPropType,
  appTitle: PropTypes.string,
  userAvatarSrc: PropTypes.string,
  footer: PropTypes.node,
  history: PropTypes.object.isRequired,
}

export default Admin