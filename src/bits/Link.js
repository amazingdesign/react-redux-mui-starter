import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  root: {
    textDecoration: 'none',
    color: 'inherit',
  },
}

// eslint-disable-next-line react/prop-types
const LinkInner = ({ to, children, label, ...otherProps }, ref) => {
  return (
    <a
      ref={ref}
      style={styles.root}
      href={to}
      target={'_blank'}
      {...otherProps}
    >
      {children || label}
    </a>
  )
}

const Link = React.forwardRef(LinkInner)

Link.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
}

export default Link