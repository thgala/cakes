import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// Routes
import RootWrap from './routes/_wrap';
import NotFound from './routes/_404';

import Home from './routes/home';

const history = createHistory();

export default class Routes extends Component {

  render() {
    return (
      <ConnectedRouter history={history}>
        <RootWrap>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </RootWrap>
      </ConnectedRouter>
    );
  }
}
