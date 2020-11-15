import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Organizations from "./containers/Organizations";

const Routes = () => {
  return (
    <Fragment>
      <Route path="/admin" component={Dashboard} />
      <Route exact path="/admin/organizations" component={Organizations} />
    </Fragment>
  );
};

const Admin = () => {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
};

export default Admin;
