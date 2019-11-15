import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@material-ui/core'

import AvatarDropdown from '../bits/AvatarDropdown'

import NavList from './NavList'

const Header = ({ routes }) => (
  <>
    <Typography variant={'h6'} noWrap={true} style={{ flexGrow: 1 }}>
      react-redux-mui-starter
    </Typography>
    <AvatarDropdown>
      <NavList 
        items={routes}
        isMenu={true}
      />
    </AvatarDropdown>
  </>
)

Header.propTypes = {
  routes: PropTypes.array,
}

export default Header