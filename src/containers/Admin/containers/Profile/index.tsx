import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { OrganizationProvider } from "../../../../context";
import ProfileScreen from "./ProfileScreen";

const Profile: FC<RouteComponentProps> = ({ match }) => {
  return (
    <OrganizationProvider>
      <ProfileScreen match={match} />
    </OrganizationProvider>
  );
};

export default Profile;
