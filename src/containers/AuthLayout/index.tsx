import React, { FC, Fragment } from "react";
import ThemeLayout from "../../adminLayout/withAdminLayout";

const AuthLayout: FC = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default ThemeLayout(AuthLayout);
