import { createDefaultActiveRouteChecker } from './createDefaultActiveRouteChecker'

// for group routes
export const createDefaultContainsActiveRouteChecker = (currentPath) => (route) => {
  return Boolean(
    route.routes &&
    Array.isArray(route.routes) &&
    route.routes.find(createDefaultActiveRouteChecker(currentPath))
  )
}

export default createDefaultContainsActiveRouteChecker