import React from 'react'
import PropTypes from 'prop-types'

import { Collapse } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import MenuItem from './MenuItem'
import ListItem from './ListItem'

const CollapsingItemElement = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (e) => {
    props.onClick && props.onClick(e)
    setAnchorEl(e.currentTarget)
    props.toggleCollapse(e)
  }
  const handleClose = (e) => {
    setAnchorEl(null)
    props.toggleCollapse(e)
  }

  const isOpen = props.isMenu ? Boolean(anchorEl) : props.isOpen

  const ItemElement = props.isMenu ? MenuItem : ListItem
  const IconElement = isOpen ? ExpandLess : ExpandMore

  return (
    <>
      <ItemElement
        icon={props.icon}
        label={props.label}
        onClick={handleClick}
        {...props.itemProps}
      >
        <IconElement
          {...props.iconProps}
        />
      </ItemElement>
      {
        <Collapse
          in={isOpen}
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