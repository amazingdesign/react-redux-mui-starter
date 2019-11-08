import React from 'react'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'

const defaultStyles = {
  external: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 99,
  },
  internal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
}

const defaultSize = 80

const LoadingIndicator = (props) => {
  const {
    style: styleProp, 
    size: sizeProp,
    message,
    ...otherProps
  } = props

  const styles = defaultStyles || styleProp
  const size = defaultSize || sizeProp

  return (
    <div style={styles.external} >
      <div style={styles.internal} >
        <CircularProgress
          size={size}
          {...otherProps}
        />
        <br />
        <br />
        <div>{props.message}</div>
      </div>
    </div>
  )
}

LoadingIndicator.propTypes = {
  message: PropTypes.string,
  styles: PropTypes.object,
  size: PropTypes.number,
}

export default LoadingIndicator