import React from 'react'
import PropTypes from 'prop-types'

import { List } from '@material-ui/core'

import NavList from '../bits/NavList'

const styles = {
  list: {
    overflow: 'hidden',
  },
}

const Nav = ({ routes, setOpened }) => (
  <List style={styles.list}>
    <NavList
      items={routes}
      onClick={() => setOpened && setOpened(false)}
    />
  </List>
)

Nav.propTypes = {
  routes: PropTypes.array,
  setOpened: PropTypes.func.isRequired,
}

export default Nav