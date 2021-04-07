import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import {
  Dashboard,
  Organizations,
  States,
  Help,
  About,
  Contact,
  Administrators,
  Profile,
  PrivacyPolicy,
  TermsConditions,
  Sectors,
  PendingApplication,
} from "../containers/Admin";
import Segment from "../containers/Admin/containers/Dashboard/_partials/Segments";
import AddCompany from "../containers/Business/_partials/AddCompany";
import ListOrganization from "../containers/Business/_partials/ListOrganization";
// import Preview from "../containers/Business/_partials/ListOrganization/_partials/Preview";
import Success from "../containers/Business/_partials/Success";
// import Uploads from "../containers/Business/_partials/ListOrganization/_partials/Uploads";
import Landing from "../containers/Landing";
import Login from "../containers/Login";
import NonAuthLayout from "../containers/NonAuthLayout";
import Signup from "../containers/Signup";
import { AuthRoute, CustomRoute } from "../utils";

const NotFound = () => {
  return <Redirect to="/" />;
};

const Routes = () => {
  return (
    <Switch>
      <CustomRoute exact path="/d" component={Dashboard} />
      <CustomRoute exact path="/d/organizations" component={Organizations} />
      <CustomRoute
        exact
        path="/d/organizations/:state"
        component={Organizations}
      />

      <CustomRoute path="/d/states" component={States} />
      {/* <AuthRoute path="/d/account" component={Account} /> */}
      <AuthRoute path="/d/applications" component={PendingApplication} />

      <AuthRoute path="/d/administrators" component={Administrators} />
      <AuthRoute path="/d/sectors" component={Sectors} />
      <CustomRoute path="/d/contact" component={Contact} />
      <CustomRoute path="/d/project_brief" component={About} />
      <CustomRoute path="/d/help" component={Help} />
      <CustomRoute path="/d/privacy" component={PrivacyPolicy} />
      <CustomRoute path="/d/terms" component={TermsConditions} />

      <CustomRoute path="/d/profile/:id" component={Profile} />
      {/* <Route path="/d/segments/training" component={Training} />
      <Route
        path="/d/segments/business_support"
        component={BusinessSupport}
      />
      <Route path="/d/segments/funding" component={Funding} />
      <Route path="/d/segments/businesses" component={Businesses} /> */}
      <CustomRoute path="/d/segments/:name" component={Segment} />

      <CustomRoute exact path="/business" component={AddCompany} />
      <CustomRoute path={`/business/listorg`} component={ListOrganization} />
      {/* <CustomRoute path={`/business/uploads`} component={Uploads} />
      <CustomRoute path={`/business/preview`} component={Preview} /> */}
      <CustomRoute path={`/business/success`} component={Success} />

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
