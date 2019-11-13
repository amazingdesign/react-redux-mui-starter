import React, { Suspense } from 'react'
import PropTypes from 'prop-types'

import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'

import DefaultRouteLoader from './DefaultRouteLoader'

const makeRoutes = (routes) => {
  const makeRouteOrRoutes = (route) => (
    Array.isArray(route.path) ?
      route.path.map(path => (
        makeRoute(route, path)
      ))
      :
      makeRoute(route)
  )

  const makeRoute = (route, path) => (
    <Route
      exact={path ? true : false}
      key={path || route.path}
      path={path || route.path}
      component={route.component}
    />
  )

  return (
    routes &&
    routes.map &&
    routes.map(makeRouteOrRoutes)
  )
}

const Router = ({ routes, history, routeLoader }) => {
  const RouteLoader = routeLoader || DefaultRouteLoader

  return (
    <Suspense fallback={<RouteLoader />}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            {makeRoutes(routes)}
          </Switch>
        </>
      </ConnectedRouter>
    </Suspense>
  )
}

Router.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  routeLoader: PropTypes.node,
}

export default Router