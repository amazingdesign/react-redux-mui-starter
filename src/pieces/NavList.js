import React from 'react'
import PropTypes from 'prop-types'

import { Menu, List, Divider } from '@material-ui/core'

import MenuItem from '../bits/MenuItem'
import ListItem from '../bits/ListItem'
import Link from '../bits/Link'
import ConnectedLink from '../bits/ConnectedLink'

const NavList = ({ items, onClick, isMenu, itemProps, linkProps, ...otherProps } = {}) => {
  const ListElement = isMenu ? Menu : List
  const ItemElement = isMenu ? MenuItem : ListItem

  return (
    <ListElement {...otherProps}>
      {
        items &&
        items.map &&
        items.map(route => {
          const to = route.link || (Array.isArray(route.path) ? route.path[0] : route.path)
          const LinkElement = route.link ? Link : ConnectedLink

          return (
            <LinkElement
              key={JSON.stringify(route)}
              to={to}
              {...linkProps}
            >
              {route.separator && route.separator.above ? < Divider /> : null}
              <ItemElement
                icon={route.icon}
                label={route.name}
                onClick={onClick}
                {...itemProps}
              />
              {route.separator && route.separator.below ? < Divider /> : null}
            </LinkElement>
          )
        })
      }
    </ListElement>
  )
}

NavList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
      icon: PropTypes.string,
      separator: PropTypes.shape({
        above: PropTypes.bool,
        below: PropTypes.bool,
      }),
      link: PropTypes.string,
    }),
  ),
  onClick: PropTypes.func,
  isMenu: PropTypes.bool,
  itemProps: PropTypes.object,
  linkProps: PropTypes.object,
}

export default NavList