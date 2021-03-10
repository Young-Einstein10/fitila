import React from "react";
import { OrganizationProvider } from "../../../../context";
import StateScreen from "./StateScreen";

const States = props => {
  return (
    <OrganizationProvider>
      <StateScreen {...props} />
    </OrganizationProvider>
  );
};

export default States;
