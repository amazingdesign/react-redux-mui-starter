// for normal routes
export const createDefaultActiveRouteChecker = (currentPath) => (route) => {
  const path = route.pathWithParams || (Array.isArray(route.path) ? route.path[0] : route.path)

  return path === currentPath
}

export default createDefaultActiveRouteChecker