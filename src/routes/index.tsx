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
// import {Business} from "../containers/Business";
import AddCompany from "../containers/Business/_partials/AddCompany";
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
      <AuthRoute exact path="/d" component={Dashboard} />
      <AuthRoute path="/d/organizations" component={Organizations} />
      <AuthRoute path="/d/states" component={States} />
      <AuthRoute path="/d/account" component={Account} />
      <AuthRoute path="/d/contact" component={Contact} />
      <AuthRoute path="/d/about" component={About} />
      <AuthRoute path="/d/help" component={Help} />
      <AuthRoute path="/d/profile" component={Profile} />
      <AuthRoute path="/d/segments/training" component={Training} />
      <AuthRoute
        path="/d/segments/businessSupport"
        component={BusinessSupport}
      />
      <AuthRoute path="/d/segments/funding" component={Funding} />
      <AuthRoute path="/d/segments/businesses" component={Businesses} />

      <AuthRoute exact path="/business" component={AddCompany} />
      <AuthRoute path={`/business/listorg`} component={ListOrganization} />
      <AuthRoute path={`/business/uploads`} component={Uploads} />
      <AuthRoute path={`/business/preview`} component={Preview} />
      <AuthRoute path={`/business/success`} component={Success} />

      <NonAuthLayout>
        <Switch>
          <Route exact path="/" component={Landing} />

          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="*" component={NotFound} />
        </Switch>
      </NonAuthLayout>
    </Switch>
  );
};

export default Routes;
