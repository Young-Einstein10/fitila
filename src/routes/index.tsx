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
  Account,
} from "../containers/Admin";
import Ecosystem from "../containers/Admin/containers/Dashboard/_partials/Ecosystem";
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
// import { useAuthContext } from "../context";
import { AuthRoute } from "../utils";

const NotFound = () => {
  return <Redirect to="/" />;
};

const Routes = () => {
  // const {
  //   auth: { user },
  // } = useAuthContext();

  return (
    <Switch>
      <AuthRoute exact path="/d" component={Dashboard} />
      <AuthRoute exact path="/d/organizations" component={Organizations} />
      <AuthRoute
        exact
        path="/d/organizations/:state"
        component={Organizations}
      />
      <AuthRoute path="/d/states" component={States} />
      <AuthRoute path="/d/account" component={Account} />
      <AuthRoute path="/d/contact" component={Contact} />
      <AuthRoute path="/d/about" component={About} />
      <AuthRoute path="/d/help" component={Help} />
      <AuthRoute path="/d/privacy" component={PrivacyPolicy} />
      <AuthRoute path="/d/terms" component={TermsConditions} />
      <AuthRoute exact path="/d/profile/:id" component={Profile} />
      <AuthRoute path="/d/segments/:name" component={Segment} />
      <AuthRoute exact path="/business" component={AddCompany} />
      <AuthRoute path={`/business/listorg`} component={ListOrganization} />
      <AuthRoute path={`/business/success`} component={Success} />

      <AuthRoute path="/d/sectors" component={Sectors} />
      <AuthRoute path="/d/listings" component={PendingApplication} />
      <AuthRoute path="/d/ecosystem" component={Ecosystem} />
      <AuthRoute path="/d/administrators" component={Administrators} />

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
