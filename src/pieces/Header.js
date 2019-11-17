import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import { Typography } from '@material-ui/core'

import AvatarDropdown from '../bits/AvatarDropdown'

import NavList from '../bits/NavList'

const Header = ({ routes }) => {
  const currentPath = useSelector(state => state.router.location.pathname)

  return (
    <>
      <Typography variant={'h6'} noWrap={true} style={{ flexGrow: 1 }}>
        react-redux-mui-starter
      </Typography>
      <AvatarDropdown>
        <NavList
          currentPath={currentPath}
          routes={routes}
          isMenu={true}
          isNestedMenu={true}
        />
      </AvatarDropdown>
    </>
  )
}

Header.propTypes = {
  routes: PropTypes.array,
}

export default Header