import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import DashboardScreen from "./DashboardScreen";

const Dashboard: FC<RouteComponentProps> = props => {
  return <DashboardScreen {...props} />;
};

export default Dashboard;
