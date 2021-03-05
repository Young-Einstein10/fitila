import React, { FC } from "react";
import { Route, RouteProps } from "react-router-dom";
import AuthLayout from "../containers/AuthLayout";

const AuthRoute: FC<RouteProps> = ({ component, path, ...rest }: any) => {
  // const auth = useSelector((state: any) => state.auth);

  // const location = useLocation();

  return (
    <AuthLayout>
      <Route component={component} path={path} {...rest} />
    </AuthLayout>
  );

  // return auth.isAuthenticated ? (
  //   <AuthLayout>
  //     <Route component={component} path={path} {...rest} />
  //   </AuthLayout>
  // ) : (
  //   <Redirect to={{ pathname: "/login", state: { next: location.pathname } }} />
  // );
};

export default AuthRoute;
