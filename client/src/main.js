import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import Grid from './components/grid';
import Login from './components/login';
import store from './store';

render(
  <Provider store={store}>
    <Router>
      <div>
        <Link to="/">raddit</Link>{' '}
        <Link to={"/home"}>Home</Link>{' '}

        <Switch>
          <Route path="/home" component={Grid} />
          <Route path="/" component={Login} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </Router>
  </Provider>, document.getElementById('content')
);
