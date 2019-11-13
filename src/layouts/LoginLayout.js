import React from 'react'
import PropTypes from 'prop-types'

const LoginLayout = (props) => (
  <div>
    {props.content}
  </div>
)

LoginLayout.propTypes = {
  content: PropTypes.node,
}

export default LoginLayout