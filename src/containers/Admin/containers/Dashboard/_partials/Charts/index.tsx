import React, { Fragment } from "react";
import { Row, Col } from "antd";
import LineChart from "./_partials/LineChart";
import MSMEsChart from "./_partials/MSMEsChart";
import FemaleBarChart from "./_partials/FemaleBarChart";
// import StateChart from "./_partials/StateChart";
import EcosystemBarChart from "./_partials/EcosystemBarChart";

const Charts = () => {
  return (
    <Fragment>
      <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
        {/* ============= Startups Ranking by State ============= */}
        {/* <Col xs={24} sm={24} md={12} lg={8}>
          <StateChart />`
        </Col> */}

        {/* ============= Female and Male Led Startups ============= */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <FemaleBarChart />
        </Col>

        {/* ============= Funding by MSMEs and Startups ============= */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <MSMEsChart data={{}} />
        </Col>

        {/* ============= Funding by Ecosystem and Enterpreneurs ============= */}
        <Col xs={24} sm={24} md={12} lg={8}>
          <EcosystemBarChart />
        </Col>
      </Row>

      {/* ============= Funding by Sector ============= */}
      <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <LineChart />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Charts;
