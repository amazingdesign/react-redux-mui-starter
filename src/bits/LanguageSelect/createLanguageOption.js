import React from 'react'

import { MenuItem } from '@material-ui/core'

import { FlagIcon } from 'react-flag-kit'

const styles = {
  flag: {
    height: 15,
    marginRight: 10,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
}

const createLanguageOption = (code, label = code) => {
  const codeUppercase = code && code.toUpperCase && code.toUpperCase()

  return (
    <MenuItem
      style={styles.item}
      value={code}
      key={code}
    >
      <div style={styles.item}>
        <FlagIcon
          style={styles.flag}
          code={codeUppercase !== 'EN' ? codeUppercase : 'GB'}
        />
        {label || code}
      </div>
    </MenuItem>
  )
}


export default createLanguageOption