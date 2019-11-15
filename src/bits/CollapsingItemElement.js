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

  const [isOpen, setIsOpen] = useState(false)

  const ItemElement = props.isMenu ? MenuItem : ListItem
  const IconElement = isOpen ? ExpandLess : ExpandMore

  const toggleCollapse = (e) => {
    setAnchorEl(e.currentTarget)
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <>
      <ItemElement
        icon={props.icon}
        label={props.label}
        onClick={(e) => {
          props.onClick && props.onClick(e)
          toggleCollapse(e)
        }}
        {...props.itemProps}
      >
        <IconElement
          onClick={toggleCollapse}
          {...props.iconProps}
        />
      </ItemElement>
      {
        <Collapse
          in={isOpen}
          timeout={'auto'}
          unmountOnExit={true}
          {...props.collapseProps}
        >
          {
            React.cloneElement(
              props.children,
              {
                anchorEl: anchorEl,
                open: Boolean(anchorEl),
                onClose: handleClose,
              }
            )
          }
        </Collapse>

      }
    </>
  )
}

CollapsingItemElement.propTypes = {
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