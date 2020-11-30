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
import Segment from "../containers/Admin/containers/Dashboard/_partials/Segments";
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
      <Route exact path="/d" component={Dashboard} />
      <Route path="/d/organizations" component={Organizations} />
      <Route path="/d/states" component={States} />
      <Route path="/d/account" component={Account} />
      <Route path="/d/contact" component={Contact} />
      <Route path="/d/project_brief" component={About} />
      <Route path="/d/help" component={Help} />
      <Route exact path="/d/profile/:id" component={Profile} />
      {/* <AuthRoute path="/d/segments/training" component={Training} />
      <AuthRoute
        path="/d/segments/business_support"
        component={BusinessSupport}
      />
      <AuthRoute path="/d/segments/funding" component={Funding} />
      <AuthRoute path="/d/segments/businesses" component={Businesses} /> */}
      <Route path="/d/segments/:name" component={Segment} />

      <Route exact path="/business" component={AddCompany} />
      <Route path={`/business/listorg`} component={ListOrganization} />
      <Route path={`/business/uploads`} component={Uploads} />
      <Route path={`/business/preview`} component={Preview} />
      <Route path={`/business/success`} component={Success} />

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
