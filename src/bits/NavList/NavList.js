import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { routesPropType } from './routesPropType'

import { createDefaultContainsActiveRouteChecker } from './createDefaultContainsActiveRouteChecker'
import { createDefaultActiveRouteChecker } from './createDefaultActiveRouteChecker'
import { createTransformRoutes } from './createTransformRoutes'

import NavListStateless from './NavListStateless'

const NavList = ({
  routes,
  currentPath,
  activeRouteChecker = createDefaultActiveRouteChecker(currentPath),
  containsActiveRouteChecker = createDefaultContainsActiveRouteChecker(currentPath),
  ...otherProps
}) => {
  const transformRoutes = createTransformRoutes(activeRouteChecker, containsActiveRouteChecker)

  const [routeItems, setRouteItems] = useState(transformRoutes(routes))

  useEffect(
    () => { setRouteItems(transformRoutes(routes)) },
    [routes]
  )
  useEffect(() => {
    const newRouteItems = transformRoutes(routeItems)
    if (JSON.stringify(newRouteItems) === JSON.stringify(routeItems)) return
    setRouteItems(newRouteItems)
  }, [currentPath, routeItems])

  const toggleCollapse = (clickedRouteKey) => {
    const newRouteItems = routeItems.map((route) => (
      route.key === clickedRouteKey ?
        { ...route, isOpen: !route.isOpen }
        :
        { ...route, isOpen: false }
    ))
    setRouteItems(transformRoutes(newRouteItems))
  }

  return (
    <NavListStateless
      toggleCollapse={toggleCollapse}
      routes={routeItems}
      {...otherProps}
    />
  )
}

NavList.propTypes = {
  isMenu: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func,
  itemProps: PropTypes.object,
  linkProps: PropTypes.object,
  isNestedMenu: PropTypes.bool,
  activeRouteChecker: PropTypes.func,
  containsActiveRouteChecker: PropTypes.func,
  routes: routesPropType,
  currentPath: PropTypes.string.isRequired,
}

export default NavList