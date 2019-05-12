import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import PageNotFound from './components/PageNotFound';
import SubmitForm from './components/SubmitForm';

export default class Routes extends Component{

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/form/:formId'} component={SubmitForm}/>
          <Route exact path={'/create'} component={CreateForm} />
          <Route exact path={'/'} component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
};
