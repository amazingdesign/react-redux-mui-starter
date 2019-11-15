import React from 'react'
import PropTypes from 'prop-types'

import { Menu, List, Divider } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import tinycolor from 'tinycolor2'

import MenuItem from './MenuItem'
import ListItem from './ListItem'
import Link from './Link'
import ConnectedLink from './ConnectedLink'
import CollapsingItemElement from './CollapsingItemElement'

const NavList = ({ items, onClick, isMenu, isNestedMenu, itemProps, linkProps, style, ...otherProps }) => {
  const theme = useTheme()
  const currentBgColor = (style && style.backgroundColor) || theme.palette.background.paper
  const newBgColor = tinycolor(currentBgColor).darken(8).toRgbString()

  const ListElement = isMenu ? Menu : List
  const ItemElement = isMenu ? MenuItem : ListItem

  return (
    <ListElement
      style={style}
      {...otherProps}
    >
      {
        items &&
        items.map &&
        items.map(route => {
          const to = route.link || (Array.isArray(route.path) ? route.path[0] : route.path)
          const LinkElement = route.link ? Link : ConnectedLink
          const reactKey = route.key || JSON.stringify(route)

          return (
            // @HACK it has to be an array because Menu and List 
            // elements wants an array not a single element
            [
              route.separator && route.separator.above ? < Divider key={`${reactKey}-divider-up`} /> : null,
              route.type === 'group' ?
                <CollapsingItemElement
                  key={reactKey}
                  isMenu={isMenu}
                  icon={route.icon}
                  label={route.name}
                  itemProps={itemProps}
                >
                  <NavList
                    items={route.routes}
                    onClick={onClick}
                    isMenu={Boolean(isNestedMenu)}
                    isNestedMenu={isNestedMenu}
                    itemProps={itemProps}
                    linkProps={linkProps}
                    style={isNestedMenu ? {} : { backgroundColor: newBgColor }}
                    {...otherProps}
                  />
                </CollapsingItemElement>
                :
                <LinkElement
                  key={reactKey}
                  to={to}
                  {...linkProps}
                >
                  <ItemElement
                    icon={route.icon}
                    label={route.name}
                    onClick={onClick}
                    {...itemProps}
                  />
                </LinkElement>,
              route.separator && route.separator.below ? < Divider key={`${reactKey}-divider-down`} /> : null,
            ]
          )
        })
      }
    </ListElement>
  )
}

NavList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.exact({
      type: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string.isRequired,
      path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
      component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.object]),
      icon: PropTypes.string,
      separator: PropTypes.shape({
        above: PropTypes.bool,
        below: PropTypes.bool,
      }),
      link: PropTypes.string,
      routes: PropTypes.array,
    }),
  ),
  onClick: PropTypes.func,
  isMenu: PropTypes.bool,
  isNestedMenu: PropTypes.bool,
  itemProps: PropTypes.object,
  linkProps: PropTypes.object,
  style: PropTypes.object,
}

export default NavList