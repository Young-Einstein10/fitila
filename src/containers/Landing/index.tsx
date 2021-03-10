import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import LandingScreen from "./LandingScreen";

const Landing: FC<RouteComponentProps> = props => {
  return <LandingScreen {...props} />;
};

export default Landing;
