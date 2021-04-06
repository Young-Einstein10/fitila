import React, { Suspense, lazy } from "react";
import { Row, Col, Skeleton } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { TableOptions } from "../../../helpers";
import { useOrganizationContext } from "../../../../../../context";

const DoughnutChart = lazy(() => import("./_partials/DoughnutChart"));
const BarChart = lazy(() => import("./_partials/BarChart"));

const Charts = () => {
  const { data: organizationData } = useOrganizationContext();

  const maleFounders = organizationData.filter(
    organization => organization.ceo_gender.toLowerCase() === "male"
  );
  const femaleFounders = organizationData.filter(
    organization => organization.ceo_gender.toLowerCase() === "female"
  );

  const chartOptions = {
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          barPercentage: 1,
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

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
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards title="Female Led Startups" size="large" more={TableOptions}>
            <BarChart
              labels={["Male", "Female"]}
              datasets={[
                {
                  data: [maleFounders.length, femaleFounders.length],
                  backgroundColor: "#EFEFFE",
                  hoverBackgroundColor: "#5F63F2",
                  label: "Founders",
                },
              ]}
              options={chartOptions}
            />
          </Cards>
        </Suspense>
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
