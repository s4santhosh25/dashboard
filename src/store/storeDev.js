import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import rootSagas from '../sagas';

export const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}) {
  const middlewares = [ReduxThunk, sagaMiddleware]
  const enhancers = [
    applyMiddleware(...middlewares),
    // other store enhancers if any
  ]
  const composeEnhancers = composeWithDevTools({
    // other compose enhancers if any
    // Specify here other options if needed
  })
  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers))

  // then run the saga
  sagaMiddleware.run(rootSagas)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
