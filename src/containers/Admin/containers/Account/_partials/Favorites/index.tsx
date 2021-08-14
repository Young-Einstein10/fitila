import React from "react";
import { Col, Row } from "antd";
import { Deactivate } from "../Main";

const Favorites = () => {
  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Deactivate />
      </Col>
    </Row>
  );
};

export default Favorites;
