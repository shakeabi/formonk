import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import PageNotFound from './components/PageNotFound';
import SubmitForm from './components/SubmitForm';
import ViewForm from './components/ViewForm';
import Explore from './components/Explore'

export default class Routes extends Component{

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path={'/form/:formId'} component={SubmitForm}/>
          <Route path={'/responses/:formId'} component={ViewForm}/>
          <Route exact path={'/create'} component={CreateForm} />
          <Route exact path={'/explore'} component={Explore} />
          <Route exact path={'/'} component={Home} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
};
