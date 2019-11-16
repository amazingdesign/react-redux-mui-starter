import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Menu, List, Divider } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import tinycolor from 'tinycolor2'

import MenuItem from './MenuItem'
import ListItem from './ListItem'
import Link from './Link'
import ConnectedLink from './ConnectedLink'
import CollapsingItemElement from './CollapsingItemElement'

// for normal routes
const createIsActiveRouteChecker = (currentPath) => (route) => {
  const path = Array.isArray(route.path) ? route.path[0] : route.path

  console.log(path, currentPath, path === currentPath)

  return path === currentPath
}
// for group routes
const useContainsActiveRouteChecker = (currentPath) => (route) => {
  return Boolean(
    route.routes &&
    Array.isArray(route.routes) &&
    route.routes.find(createIsActiveRouteChecker(currentPath))
  )
}

const createMakeRouteItems = (isActiveRouteChecker, containsActiveRouteChecker) => (routes) => {
  return (
    routes &&
    routes.map &&
    routes.map(route => ({
      ...route,
      routes: createMakeRouteItems(isActiveRouteChecker, containsActiveRouteChecker)(route.routes),
      // @TODO this is not working!!!
      isSelected: isActiveRouteChecker(route),
      isOpen: (
        route.isOpen !== undefined ?
          // it can be already opened, eg. by user
          route.isOpen
          :
          // it is only selected if route is matched
          containsActiveRouteChecker(route)
      ),
    }))
  )
}

const NavList = ({ routes, currentPath, onClick, isMenu, isNestedMenu, itemProps, linkProps, style, ...otherProps }) => {
  const theme = useTheme()
  const currentBgColor = (style && style.backgroundColor) || theme.palette.background.paper
  const newBgColor = tinycolor(currentBgColor).darken(8).toRgbString()

  const [routeItems, setRouteItems] = useState(null)


  const isActiveRouteChecker = createIsActiveRouteChecker(currentPath)
  const containsActiveRouteChecker = useContainsActiveRouteChecker(currentPath)
  const makeRouteItems = createMakeRouteItems(isActiveRouteChecker, containsActiveRouteChecker)

  useEffect(
    () => { setRouteItems(makeRouteItems(routes)) },
    [routes]
  )
  useEffect(() => {
    const newRouteItems = makeRouteItems(routeItems)
    if (JSON.stringify(newRouteItems) == JSON.stringify(routeItems)) return
    setRouteItems(newRouteItems)
  }, [currentPath, routeItems])

  const toggleCollapse = (clickedRoute) => {
    const newRouteItems = routeItems.map((route) => (
      route === clickedRoute ?
        { ...route, isOpen: !route.isOpen }
        :
        { ...route, isOpen: false }
    ))

    setRouteItems(makeRouteItems(newRouteItems))
  }

  const ListElement = isMenu ? Menu : List
  const ItemElement = isMenu ? MenuItem : ListItem

  return (
    <ListElement
      style={style}
      {...otherProps}
    >
      {
        routeItems &&
        routeItems.map(route => {
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
                  isOpen={isMenu ? false : Boolean(route.isOpen)}
                  toggleCollapse={() => toggleCollapse(route)}
                  itemProps={itemProps}
                >
                  <NavList
                    currentPath={currentPath}
                    routes={route.routes}
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

NavList.propTypes = {
  routes: PropTypes.arrayOf(
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
      isSelected: PropTypes.bool,
      isOpen: PropTypes.bool,
    }),
  ),
  onClick: PropTypes.func,
  isActiveRouteChecker: PropTypes.func,
  containsActiveRouteChecker: PropTypes.func,
  isMenu: PropTypes.bool,
  isNestedMenu: PropTypes.bool,
  itemProps: PropTypes.object,
  linkProps: PropTypes.object,
  style: PropTypes.object,
  currentPath: PropTypes.string.isRequired,
}

export default NavList