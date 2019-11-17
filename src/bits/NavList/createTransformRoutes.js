export const createTransformRoutes = (isActiveRouteChecker, containsActiveRouteChecker) => (routes) => {
  return (
    routes &&
    routes.map &&
    routes.map(route => ({
      ...route,
      routes: createTransformRoutes(isActiveRouteChecker, containsActiveRouteChecker)(route.routes),
      key: route.key || JSON.stringify(route),
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

export default createTransformRoutes