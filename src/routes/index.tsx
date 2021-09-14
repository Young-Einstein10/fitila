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
import Success from "../containers/Business/_partials/Success";
import Landing from "../containers/Landing";
import Signin from "../containers/Signin";
import NonAuthLayout from "../containers/NonAuthLayout";
import Signup from "../containers/Signup";
import ForgotPassword from "../containers/ForgotPassword";
import ConfirmPassword from "../containers/ForgotPassword/confirm";
import OTPVerification from "../containers/OTPVerification";
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
      <CustomRoute path="/d/contact" component={Contact} />
      <CustomRoute path="/d/about" component={About} />
      <CustomRoute path="/d/help" component={Help} />
      <CustomRoute path="/d/privacy" component={PrivacyPolicy} />
      <CustomRoute path="/d/terms" component={TermsConditions} />
      <CustomRoute exact path="/d/profile/:id" component={Profile} />
      <CustomRoute path="/d/segments/:name" component={Segment} />
      <AuthRoute path="/d/account" component={Account} />
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

          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/otpverification" component={OTPVerification} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path="/forgot-password/:token" component={ConfirmPassword} />
          <Route path="*" component={NotFound} />
        </Switch>
      </NonAuthLayout>
    </Switch>
  );
};

export default Routes;
