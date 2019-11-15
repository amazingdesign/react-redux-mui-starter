import React from 'react'
import PropTypes from 'prop-types'

import { List } from '@material-ui/core'

import NavList from './NavList'

const styles = {
  list: {
    overflow: 'hidden',
  },
}

const Nav = ({ routes, setOpened }) => (
  <List style={styles.list}>
    <NavList
      items={routes}
      onClick={() => setOpened && setOpened(true)}
    />
  </List>
)

Nav.propTypes = {
  routes: PropTypes.array,
  setOpened: PropTypes.func.isRequired,
}

export default Nav