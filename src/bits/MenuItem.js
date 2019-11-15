import React from 'react'
import PropTypes from 'prop-types'

import { MenuItem as MUIMenuItem, ListItemIcon, Icon, ListItemText } from '@material-ui/core'

// eslint-disable-next-line react/prop-types
const MenuItemInner = ({ icon, label, onClick }, ref) => (
  <MUIMenuItem button onClick={onClick} ref={ref}>
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
  </MUIMenuItem>
)

const MenuItem = React.forwardRef(MenuItemInner)

MenuItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
}

export default MenuItem
