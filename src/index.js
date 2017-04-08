import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import configureStore from './configureStore';
import AppRoutes from './app/routes';

const store = configureStore()
window.globalStore = store;

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
);
