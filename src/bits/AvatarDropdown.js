import React from 'react'
import PropTypes from 'prop-types'

import { Button, Avatar, Menu } from '@material-ui/core'

const AvatarDropdown = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar
          src={props.src}
          {...props.avatarProps}
        />
      </Button>
      {
        Array.isArray(props.children) ?
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            {...props.menuProps}
          >
            {
              React.Children.map(
                props.children,
                child => React.cloneElement(child, { onClick: handleClose })
              )
            }
          </Menu>
          :
          React.cloneElement(
            props.children,
            {
              onClick: handleClose,
              id: 'simple-menu',
              anchorEl: anchorEl,
              keepMounted: true,
              open: Boolean(anchorEl),
              onClose: handleClose,
              ...props.menuProps,
            }
          )
      }
    </>
  )
}

AvatarDropdown.propTypes = {
  src: PropTypes.string,
  avatarProps: PropTypes.object,
  menuProps: PropTypes.object,
  children: PropTypes.node,
}

export default AvatarDropdown