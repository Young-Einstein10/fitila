import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { EcosystemProvider, OrganizationProvider } from "../../../../context";
import DashboardScreen from "./DashboardScreen";

const Dashboard: FC<RouteComponentProps> = props => {
  return (
    <OrganizationProvider>
      <EcosystemProvider>
        <DashboardScreen {...props} />
      </EcosystemProvider>
    </OrganizationProvider>
  );
};

export default Dashboard;
