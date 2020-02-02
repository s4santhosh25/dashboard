import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PrivateRoute from '../components/PrivateRoute';
import Form from '../components/Form';
import Dashboard from '../components/Dashboard';

export const history = createBrowserHistory()

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Form} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/chat" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default Routes
