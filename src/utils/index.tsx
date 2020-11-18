import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import AuthLayout from "../containers/AuthLayout";

const AuthRoute: FC<RouteProps> = ({ component, path, ...rest }: any) => {
  const auth = useSelector((state: any) => state.auth);

  const location = useLocation();

  return auth.isAuthenticated ? (
    <AuthLayout>
      <Route component={component} path={path} {...rest} />
    </AuthLayout>
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: location } }} />
  );

  // return (
  //   <Route
  //     {...rest}
  //     render={props => {
  //       auth.isAuthenticated ? (
  //         <AuthLayout>
  //           <Component {...props} />
  //         </AuthLayout>
  //       ) : (
  //         <Redirect to="/login" />
  //       );
  //     }}
  //   />
  // );
};

export default AuthRoute;
