import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import PageNotFound from './components/PageNotFound';

export default (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/user'} component={User} />
      <Route exact path={'/'} component={Home} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
);
