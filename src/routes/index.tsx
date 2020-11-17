import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  Dashboard,
  Organizations,
  States,
  Help,
  About,
  Account,
  Contact,
} from "../containers/Admin";
import Businesses from "../containers/Admin/containers/Dashboard/_partials/Businesses";
import BusinessSupport from "../containers/Admin/containers/Dashboard/_partials/BusinessSupport";
import Funding from "../containers/Admin/containers/Dashboard/_partials/Funding";
import Training from "../containers/Admin/containers/Dashboard/_partials/Training";
import Profile from "../containers/Admin/containers/Profile";
import Business from "../containers/Business";
import ListOrganization from "../containers/Business/_partials/ListOrganization";
import Preview from "../containers/Business/_partials/Preview";
import Success from "../containers/Business/_partials/Success";
import Uploads from "../containers/Business/_partials/Uploads";
import Landing from "../containers/Landing";
import Login from "../containers/Login";
import NonAuthLayout from "../containers/NonAuthLayout";
import Signup from "../containers/Signup";
import AuthRoute from "../utils";

const NotFound = () => {
  return <Redirect to="/" />;
};

const Routes = () => {
  return (
    <Switch>
      {/* <Fragment>
        <Switch> */}
      <AuthRoute exact path="/d" component={Dashboard} />
      <AuthRoute exact path="/d/organizations" component={Organizations} />
      <AuthRoute exact path="/d/states" component={States} />
      <AuthRoute exact path="/d/account" component={Account} />
      <AuthRoute exact path="/d/contact" component={Contact} />
      <AuthRoute exact path="/d/about" component={About} />
      <AuthRoute exact path="/d/help" component={Help} />
      <AuthRoute exact path="/d/profile" component={Profile} />
      <AuthRoute exact path="/d/segments/training" component={Training} />
      <AuthRoute
        exact
        path="/d/segments/businessSupport"
        component={BusinessSupport}
      />
      <AuthRoute exact path="/d/segments/funding" component={Funding} />
      <AuthRoute exact path="/d/segments/businesses" component={Businesses} />
      {/* </Switch>
      </Fragment> */}

      <NonAuthLayout>
        {/* <Switch> */}
        <Route exact path="/business" component={Business} />
        <Route exact path={`/business/listorg`} component={ListOrganization} />
        <Route exact path={`/business/uploads`} component={Uploads} />
        <Route exact path={`/business/preview`} component={Preview} />
        <Route exact path={`/business/success`} component={Success} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Landing} />
        <Route path="*" component={NotFound} />
        {/* </Switch> */}
      </NonAuthLayout>
    </Switch>
  );
};

export default Routes;
