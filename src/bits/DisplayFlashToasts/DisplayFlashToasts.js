import React from 'react'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'

import { getFlashMessages, removeMessage } from 'redux-flash'

import { makeStyles } from '@material-ui/core/styles'

import Toast from '../Toast'

const MARGIN = '1rem'

const useStyles = makeStyles((theme) => ({
  toastContainer: {
    display: 'flex',
    position: 'fixed',
    zIndex: 1400,
    flexDirection: props => props.flexDirection || 'column-reverse',
    bottom: props => (!props.top && !props.bottom) ? MARGIN : props.bottom,
    left: props => (!props.left && !props.right) ? MARGIN : props.left,
    top: props => (!props.top && !props.bottom) ? undefined : props.top,
    right: props => (!props.left && !props.right) ? undefined : props.right,
  },
  toast: {
    position: 'static',
    margin: '0.5rem 0',
  },
}))

const DisplayFlashToasts = ({ flexDirection, bottom, left, top, right }) => {
  const classes = useStyles({ flexDirection, bottom, left, top, right })

  const flashMessages = useSelector(getFlashMessages)
  const dispatch = useDispatch()
  const dispatchRemoveMessage = (id) => () => dispatch(removeMessage(id))

  return (
    <div className={classes.toastContainer}>
      {
        flashMessages &&
        flashMessages.map &&
        flashMessages.map(flash => {
          const variant = flash.props && flash.props.variant

          return (
            <Toast
              key={flash.id}
              className={classes.toast}
              message={flash.message}
              variant={flash.isError ? 'error' : variant}
              onClose={dispatchRemoveMessage(flash.id)}
            />
          )
        })
      }
    </div>
  )
}

DisplayFlashToasts.propTypes = {
  flexDirection: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
}

export default DisplayFlashToasts