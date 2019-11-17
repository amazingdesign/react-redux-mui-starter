import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Select, FormControl, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import createLanguageOption from './createLanguageOption'

const useStyles = makeStyles(() => ({
  icon: {
    color: props => props.color,
  },
  root: {
    color: props => props.color,
  },
}))

const LanguageSelect = (props) => {
  const classes = useStyles(props)

  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = useRef(null)

  useEffect(() => setLabelWidth(inputLabel && inputLabel.current && inputLabel.current.offsetWidth), [])

  return (
    <FormControl
      variant={props.variant}
    >
      {
        props.noLabel ?
          null
          :
          <InputLabel ref={inputLabel}>
            {props.label}
          </InputLabel>
      }
      <Select
        classes={classes}
        value={props.value}
        onChange={props.onChange}
        labelWidth={labelWidth}
        disableUnderline={true}
      >
        {
          props.languages &&
          props.languages.map &&
          props.languages.map(({ code, name }) => (
            createLanguageOption(code, name)
          ))
        }
      </Select>
    </FormControl>
  )
}

LanguageSelect.defaultProps = {
  noLabel: false,
  variant: 'standard',
  label: 'Languages',
  color: '#000000'
}

LanguageSelect.propTypes = {
  noLabel: PropTypes.bool,
  color: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
}

export default LanguageSelect