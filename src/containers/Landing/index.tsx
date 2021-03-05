import React from "react";
import { EcosystemProvider, OrganizationProvider } from "../../context";
import LandingScreen from "./LandingScreen";

const Landing = () => {
  return (
    <OrganizationProvider>
      <EcosystemProvider>
        <LandingScreen />
      </EcosystemProvider>
    </OrganizationProvider>
  );
};

export default Landing;
