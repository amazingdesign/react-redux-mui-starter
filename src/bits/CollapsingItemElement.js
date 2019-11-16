import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import MenuItem from './MenuItem'
import ListItem from './ListItem'

const CollapsingItemElement = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClose = () => setAnchorEl(null)

  const ItemElement = props.isMenu ? MenuItem : ListItem
  const IconElement = props.isOpen ? ExpandLess : ExpandMore

  return (
    <>
      <ItemElement
        icon={props.icon}
        label={props.label}
        onClick={(e) => {
          props.onClick && props.onClick(e)
          props.toggleCollapse(e)
        }}
        {...props.itemProps}
      >
        <IconElement
          onClick={props.toggleCollapse}
          {...props.iconProps}
        />
      </ItemElement>
      {
        <Collapse
          in={props.isOpen}
          timeout={'auto'}
          unmountOnExit={true}
          {...props.collapseProps}
        >
          {
            props.isMenu ?
              React.cloneElement(
                props.children,
                {
                  anchorEl: anchorEl,
                  open: Boolean(anchorEl),
                  onClose: handleClose,
                }
              )
              :
              props.children
          }
        </Collapse>

      }
    </>
  )
}

CollapsingItemElement.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  isMenu: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  itemProps: PropTypes.object,
  iconProps: PropTypes.object,
  collapseProps: PropTypes.object,
}

export default CollapsingItemElement