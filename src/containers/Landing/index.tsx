import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { EcosystemProvider, OrganizationProvider } from "../../context";
import LandingScreen from "./LandingScreen";

const Landing: FC<RouteComponentProps> = props => {
  return (
    <OrganizationProvider>
      <EcosystemProvider>
        <LandingScreen {...props} />
      </EcosystemProvider>
    </OrganizationProvider>
  );
};

export default Landing;
