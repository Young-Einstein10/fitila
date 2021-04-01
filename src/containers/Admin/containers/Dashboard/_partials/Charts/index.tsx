import React, { Suspense, lazy } from "react";
import { Row, Col, Skeleton } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { TableOptions } from "../../../helpers";

const DoughnutChart = lazy(() => import("./_partials/DoughnutChart"));

const Charts = () => {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
      <Col xs={24} sm={24} md={12} lg={8}>
        <Cards title="2020 Investments" size="large" more={TableOptions}>
          <div
            className="states-lga"
            style={{ background: "#B1E2CB", height: "330px" }}
          ></div>
        </Cards>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Cards title="Female Led Startups" size="large" more={TableOptions}>
          <div
            className="states-lga"
            style={{ background: "#B1E2CB", height: "330px" }}
          ></div>
        </Cards>
      </Col>

      <Col xs={24} sm={24} md={12} lg={8}>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards title="Funding by Sector" size="large" more={TableOptions}>
            <DoughnutChart />
          </Cards>
        </Suspense>
      </Col>
    </Row>
  );
};

export default Charts;
