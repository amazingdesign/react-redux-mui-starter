import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import { List } from '@material-ui/core'

import NavList from '../bits/NavList'

const styles = {
  list: {
    overflow: 'hidden',
  },
}

const Nav = ({ routes, setOpened }) => {
  const currentPath = useSelector(state => state.router.location.pathname)

  return (
    <List style={styles.list}>
      <NavList
        currentPath={currentPath}
        routes={routes}
        onClick={() => setOpened && setOpened(false)}
      />
    </List>
  )
}

Nav.propTypes = {
  routes: PropTypes.array,
  setOpened: PropTypes.func.isRequired,
}

export default Nav