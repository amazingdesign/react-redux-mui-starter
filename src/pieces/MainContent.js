import React from 'react'
import PropTypes from 'prop-types'

import { history } from '../store'

import Router from '../bits/Router'

const MainContent = ({ routes }) => (
  <Router
    history={history}
    routes={routes}
  />
)

MainContent.propTypes = {
  routes: PropTypes.array,
}

export default MainContent