import React, { FC } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import AuthLayout from "../containers/AuthLayout";
import { useAuthContext } from "../context";

const AuthRoute: FC<RouteProps> = ({ component, path, ...rest }: any) => {
  const { auth } = useAuthContext();

  const location = useLocation();

  return auth.isAuthenticated ? (
    <AuthLayout>
      <Route component={component} path={path} {...rest} />
    </AuthLayout>
  ) : (
    <Redirect
      to={{ pathname: "/signin", state: { next: location.pathname } }}
    />
  );
};

const CustomRoute: FC<RouteProps> = ({ component, path, ...rest }: any) => (
  <AuthLayout>
    <Route component={component} path={path} {...rest} />
  </AuthLayout>
);

export { AuthRoute, CustomRoute };
