import React from 'react'
import PropTypes from 'prop-types'

import { ListItem as MUIListItem, ListItemIcon, ListItemText } from '@material-ui/core'

import Icon from './Icon'

// eslint-disable-next-line react/prop-types
const ListItemInner = ({ icon, label, onClick, children, ...otherProps }, ref) => (
  <MUIListItem
    ref={ref}
    button={true}
    onClick={onClick}
    {...otherProps}
  >
    {
      icon ?
        <ListItemIcon>
          < Icon > {icon}</Icon >
        </ListItemIcon >
        :
        null
    }
    <ListItemText
      primary={label}
      primaryTypographyProps={{
        noWrap: true,
        component: 'p',
      }}
    />
    {children}
  </MUIListItem >
)

const ListItem = React.forwardRef(ListItemInner)

ListItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default ListItem