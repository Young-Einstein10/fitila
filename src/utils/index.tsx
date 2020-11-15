import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import AuthLayout from "../containers/AuthLayout";

const AuthRoute: FC<RouteProps> = ({ component: Component, ...rest }: any) => {
  const auth = useSelector((state: any) => state.auth);

  if (!auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Route
      {...rest}
      render={props => {
        return (
          <AuthLayout>
            <Component {...props} />
          </AuthLayout>
        );
      }}
    />
  );
};

export default AuthRoute;
