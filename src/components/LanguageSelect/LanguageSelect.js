import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Select, FormControl, InputLabel } from '@material-ui/core'

import createLanguageOption from './createLanguageOption'

const LanguageSelect = (props) => {
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
        value={props.value}
        onChange={props.onChange}
        labelWidth={labelWidth}
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
}

LanguageSelect.propTypes = {
  noLabel: PropTypes.bool,
  label: PropTypes.string,
  variant: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  languages: PropTypes.array.isRequired,
}

export default LanguageSelect