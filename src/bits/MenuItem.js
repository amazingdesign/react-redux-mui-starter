import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem as MUIMenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core'

// eslint-disable-next-line react/prop-types
const MenuItemInner = ({ icon, label, onClick, children, ...otherProps }, ref) => (
  <MUIMenuItem
    ref={ref}
    button={true}
    onClick={onClick}
    {...otherProps}
  >
    {
      icon ?
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        :
        null
    }
    <ListItemText
      primary={label}
      primaryTypographyProps={{ noWrap: true }}
    />
    {children}
  </MUIMenuItem>
)

const MenuItem = React.forwardRef(MenuItemInner)

MenuItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default MenuItem
