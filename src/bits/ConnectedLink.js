import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'

import Link from './Link'

// eslint-disable-next-line react/prop-types
const ConnectedLinkInner = ({ to, ...otherProps }, ref) => {
  const dispatch = useDispatch()

  const onClick = (to) => (e) => {
    e.preventDefault()

    dispatch(push(to))
  }

  return (
    <Link
      ref={ref}
      to={to}
      onClick={onClick(to)}
      {...otherProps}
    />
  )
}

const ConnectedLink = React.forwardRef(ConnectedLinkInner)

ConnectedLink.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
}

export default ConnectedLink