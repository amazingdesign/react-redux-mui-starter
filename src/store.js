import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import {
  reducer as flashReducer,
  middleware as flashMiddleware,
} from 'redux-flash'

export const history = createBrowserHistory()
const routerReducer = connectRouter(history)

const rootReducer = combineReducers({
  flash: flashReducer,
  router: routerReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      flashMiddleware(),
      thunk,
    )
  )
)