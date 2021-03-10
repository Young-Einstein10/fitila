import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { OrganizationProvider } from "../../../../context";
import ProfileScreen from "./ProfileScreen";

const Profile: FC<RouteComponentProps> = props => {
  return <ProfileScreen {...props} />;
};

export default Profile;
