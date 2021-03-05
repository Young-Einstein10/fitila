import React from "react";
import { EcosystemProvider, OrganizationProvider } from "../../../../context";
import DashboardScreen from "./DashboardScreen";

const Dashboard = () => {
  return (
    <OrganizationProvider>
      <EcosystemProvider>
        <DashboardScreen />
      </EcosystemProvider>
    </OrganizationProvider>
  );
};

export default Dashboard;
