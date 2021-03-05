import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  EcosystemProvider,
  OrganizationProvider,
} from "../../../../../../context";
import SegmentScreen from "./SegmentScreen";

const Segments: FC<RouteComponentProps> = ({ match }) => {
  return (
    <OrganizationProvider>
      <EcosystemProvider>
        <SegmentScreen match={match} />
      </EcosystemProvider>
    </OrganizationProvider>
  );
};

export default Segments;
