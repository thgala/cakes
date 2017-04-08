import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';

import reducers from './app/reducers';

const history = createHistory();

export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
    process.env.NODE_ENV === `development`, // eslint-disable-line no-unused-vars
  });



  const middleware = compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    ), //logger
  );

  const store = middleware(createStore)(combineReducers(reducers), initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./app/reducers', () => {
      const nextRootReducer = require('./app/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
