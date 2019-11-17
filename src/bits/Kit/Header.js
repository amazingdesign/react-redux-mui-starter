import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import { Typography } from '@material-ui/core'

import LanguageSwitcher from '../LanguageSwitcher'
import AvatarDropdown from '../AvatarDropdown'
import NavList from '../NavList'

const Header = ({ routes, label, languages, userAvatarSrc }) => {
  const currentPath = useSelector(state => state.router.location.pathname)

  return (
    <>
      <Typography variant={'h6'} noWrap={true} style={{ flexGrow: 1 }}>
        {label}
      </Typography>
      {
        languages ?
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LanguageSwitcher
              color={'white'}
              noLabel={true}
              languages={languages}
            />
          </div>
          :
          null
      }
      <AvatarDropdown src={userAvatarSrc}>
        <NavList
          currentPath={currentPath}
          routes={routes}
          isMenu={true}
          isNestedMenu={true}
        />
      </AvatarDropdown>
    </>
  )
}

Header.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.exact({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  label: PropTypes.string,
  userAvatarSrc: PropTypes.string,
  routes: PropTypes.array,
}

export default Header