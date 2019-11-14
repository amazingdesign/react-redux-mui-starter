import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import {
  reducer as flashReducer,
  middleware as flashMiddleware,
  flashMessage,
  flashErrorMessage,
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

const action1 = flashMessage('This is a test message!')
const action2 = flashErrorMessage('This is a ERROR message!')
const action3 = flashMessage('This is a success message!', { props: { variant: 'success' } })
const action4 = flashMessage('The selector function does not receive an ownProps argument. However, props can be used through closure (see the examples below) or by using a curried selector.')

setTimeout(() => store.dispatch(action1), 500)
setTimeout(() => store.dispatch(action2), 1000)
setTimeout(() => store.dispatch(action3), 1500)
setTimeout(() => store.dispatch(action4), 2000)