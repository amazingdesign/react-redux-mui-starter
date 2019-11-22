import React from 'react'
import PropTypes from 'prop-types'

import { Icon as MUIIcon } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const FA_PREFIXES = ['fa', 'fab', 'fas', 'far', 'fal', 'fad']

const useStyles = makeStyles((theme) => ({
  root: {
    width: '2rem',
    height: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Icon = ({ children, ...otherProps }) => {
  const classes = useStyles()

  const iconName = (
    Array.isArray(children) ?
      children.join('')
      :
      String(children)
  ).trim()

  const isFontAwesome = FA_PREFIXES.includes(iconName.split(' ')[0])

  return (
    isFontAwesome ?
      <MUIIcon
        classes={classes}
        className={iconName}
        {...otherProps}
      />
      :
      <MUIIcon
        classes={classes}
        {...otherProps}
      >
        {iconName}
      </MUIIcon>
  )
}

Icon.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
}

export default Icon