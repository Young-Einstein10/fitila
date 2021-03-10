import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import SegmentScreen from "./SegmentScreen";

const Segments: FC<RouteComponentProps> = ({ match }) => {
  return <SegmentScreen match={match} />;
};

export default Segments;
