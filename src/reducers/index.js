import {applyMiddleware, combineReducers, createStore} from 'redux'
import user from './user';
import {routerMiddleware, routerReducer, syncHistoryWithStore} from 'react-router-redux'
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import {batchActionsType} from "./actionTypes";


function enableBatching(reducer) {
  return function batchingReducer(state, action) {
    switch (action.type) {
      case batchActionsType:
        return action.actions.reduce(batchingReducer, state);
      default:
        return reducer(state, action);
    }
  }
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const browserHistory = createHistory()

const reducers = combineReducers({
  user,
  routing: routerReducer
})

const store = createStore(
  enableBatching(reducers),
  applyMiddleware(
    thunk,
    logger,
    routerMiddleware(browserHistory)),
)

export const history = syncHistoryWithStore(browserHistory, store)

export {store};