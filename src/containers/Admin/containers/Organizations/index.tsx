import React from "react";
import { OrganizationProvider } from "../../../../context";
import OrganizationScreen from "./OrganizationScreen";

const Organizations = props => {
  return (
    <OrganizationProvider>
      <OrganizationScreen {...props} />
    </OrganizationProvider>
  );
};

export default Organizations;
