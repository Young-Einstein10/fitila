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
  Administrators,
  Profile,
  PrivacyPolicy,
  TermsConditions,
  Sectors,
  PendingApplication,
} from "../containers/Admin";
// import Businesses from "../containers/Admin/containers/Dashboard/_partials/Businesses";
// import BusinessSupport from "../containers/Admin/containers/Dashboard/_partials/BusinessSupport";
// import Funding from "../containers/Admin/containers/Dashboard/_partials/Funding";
import Segment from "../containers/Admin/containers/Dashboard/_partials/Segments";
// import Training from "../containers/Admin/containers/Dashboard/_partials/Training";

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
      <AuthRoute path="/d/account" component={Account} />
      <AuthRoute
        path="/d/pending_applications"
        component={PendingApplication}
      />

      <AuthRoute path="/d/administrators" component={Administrators} />
      <AuthRoute path="/d/sectors" component={Sectors} />
      <CustomRoute path="/d/contact" component={Contact} />
      <CustomRoute path="/d/project_brief" component={About} />
      <CustomRoute path="/d/help" component={Help} />
      <CustomRoute path="/d/privacy" component={PrivacyPolicy} />
      <CustomRoute path="/d/terms" component={TermsConditions} />

      <CustomRoute exact path="/d/profile/:id" component={Profile} />
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
      <CustomRoute path={`/business/uploads`} component={Uploads} />
      <CustomRoute path={`/business/preview`} component={Preview} />
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
