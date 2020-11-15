import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Business from "../containers/Business";
import ListOrganization from "../containers/Business/_partials/ListOrganization";
import Preview from "../containers/Business/_partials/Preview";
import Success from "../containers/Business/_partials/Success";
import Uploads from "../containers/Business/_partials/Uploads";
import Landing from "../containers/Landing";
import Login from "../containers/Login";
import Signup from "../containers/Signup";

const NotFound = () => {
  return <Redirect to="/" />;
};

export const PublicRoutes = () => {
  return (
    <Fragment>
      {/* <AuthRoute exact path="/d" component={Dashboard} />
      <AuthRoute exact path="/d/organizations" component={Organizations} /> */}
      <Route exact path="/business" component={Business} />
      <Route exact path={`/business/listorg`} component={ListOrganization} />
      <Route exact path={`/business/uploads`} component={Uploads} />
      <Route exact path={`/business/preview`} component={Preview} />
      <Route exact path={`/business/success`} component={Success} />

      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={Landing} />
      <Route path="*" component={NotFound} />
    </Fragment>
  );
};

// export const PrivateRoutes = () => {
//   return (
//     <Fragment>
//       <AuthRoute exact path="/d" component={Dashboard} />
//       <AuthRoute exact path="/d/organizations" component={Organizations} />
//       {/* <Route path="*" component={NotFound} /> */}
//     </Fragment>
//   );
// };
