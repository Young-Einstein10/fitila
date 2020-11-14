import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Business from '../containers/Business';
import AddCompany from '../containers/Business/_partials/AddCompany';
import ListOrganization from '../containers/Business/_partials/ListOrganization';
import Dashboard from '../containers/Dashboard';
import Landing from '../containers/Landing';
import Login from '../containers/Login';
import Signup from '../containers/Signup';

const NotFound = () => {
  return <Redirect to="/" />;
};

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/business" component={Business} />
      <Route exact path={`business/list`} component={ListOrganization} />
      <Route exact path="/d" component={Dashboard} />

      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/signin" component={SignIn} /> */}
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={Landing} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path="/d" component={Dashboard} />
    </Switch>
  );
};
