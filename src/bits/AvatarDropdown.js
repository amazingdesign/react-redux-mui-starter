import React from 'react'
import PropTypes from 'prop-types'

import { Button, Avatar, Menu } from '@material-ui/core'

const AvatarDropdown = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button
        color={'inherit'}
        onClick={handleClick}
      >
        <Avatar
          src={props.src}
          {...props.avatarProps}
        />
      </Button>
      {
        Array.isArray(props.children) ?
          <Menu
            anchorEl={anchorEl}
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
              onClose: handleClose,
              anchorEl: anchorEl,
              open: Boolean(anchorEl),
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