import React from 'react'
import PropTypes from 'prop-types'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  root: {
    maxWidth: 320,
  },
}))

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const Toast = (props) => {
  const {
    className,
    message,
    onClose,
    variant,
    onRequestClose,
    autoHideDuration,
    anchorOrigin,
    ...other
  } = props

  const classes = useStyles()

  const Icon = variantIcon[variant]

  return (
    <Snackbar
      className={`${classes.root} ${className}`}
      anchorOrigin={anchorOrigin}
      open={true}
      autoHideDuration={autoHideDuration}
      onClose={onRequestClose}
    >
      <SnackbarContent
        className={classes[variant]}
        aria-describedby={'client-snackbar'}
        message={
          <span id={'client-snackbar'} className={classes.message}>
            <Icon className={`${classes.icon} ${classes.iconVariant}`} />
            {message}
          </span>
        }
        action={[
          <IconButton key={'close'} aria-label={'close'} color={'inherit'} onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  )
}

Toast.defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  autoHideDuration: null,
  variant: 'info',
}

Toast.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  anchorOrigin: PropTypes.object,
  autoHideDuration: PropTypes.number,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}

export default Toast