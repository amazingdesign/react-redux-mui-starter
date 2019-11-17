import React from 'react'
import PropTypes from 'prop-types'
import { routesPropType } from './routesPropType'

import { Menu, List, Divider } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import tinycolor from 'tinycolor2'

import MenuItem from '../MenuItem'
import ListItem from '../ListItem'
import Link from '../Link'
import ConnectedLink from '../ConnectedLink'
import CollapsingItemElement from '../CollapsingItemElement'


const NavListStateless = ({
  routes,
  toggleCollapse,
  style,
  onClick,
  isMenu,
  isNestedMenu,
  itemProps,
  linkProps,
  ...otherProps
}) => {
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
        routes &&
        routes.map(route => {
          const to = route.link || (Array.isArray(route.path) ? route.path[0] : route.path)
          const LinkElement = route.link ? Link : ConnectedLink
          const reactKey = route.key

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
                  isOpen={Boolean(route.isOpen)}
                  toggleCollapse={() => toggleCollapse(route.key)}
                  itemProps={itemProps}
                >
                  <NavListStateless
                    routes={route.routes}
                    onClick={onClick}
                    isMenu={Boolean(isNestedMenu)}
                    isNestedMenu={isNestedMenu}
                    itemProps={itemProps}
                    linkProps={linkProps}
                    toggleCollapse={toggleCollapse}
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
                    selected={route.isSelected}
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


NavListStateless.propTypes = {
  isMenu: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  itemProps: PropTypes.object,
  linkProps: PropTypes.object,
  isNestedMenu: PropTypes.bool,
  routes: routesPropType.isRequired,
  toggleCollapse: PropTypes.func.isRequired,
}

export default NavListStateless