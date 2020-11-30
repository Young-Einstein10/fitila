import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import AuthLayout from "../containers/AuthLayout";

const AuthRoute: FC<RouteProps> = ({ component, path, ...rest }: any) => {
  const auth = useSelector((state: any) => state.auth);

  const location = useLocation();

  return true ? (
    <AuthLayout>
      <Route component={component} path={path} {...rest} />
    </AuthLayout>
  ) : (
    <Redirect to={{ pathname: "/login", state: { next: location.pathname } }} />
  );
};

export default AuthRoute;
