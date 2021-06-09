import React, { Suspense, lazy } from "react";
import { Row, Col, Skeleton } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { useOrganizationContext } from "../../../../../../context";

const StateChart = lazy(() => import("./_partials/StateChart"));
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
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards title="Startups Ranking by State" size="large">
            <StateChart />
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
          <Cards title="Female and Male Led Startups" size="large">
            <BarChart
              labels={["Female", "Male"]}
              datasets={[
                {
                  data: [femaleFounders.length, maleFounders.length],
                  backgroundColor: [
                    "rgba(245, 71, 109, 0.645)",
                    "rgba(39, 149, 221, 0.686)",
                  ],
                  hoverBackgroundColor: [
                    "rgb(255, 0, 55)",
                    "rgb(10, 134, 216)",
                  ],
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
          <Cards title="Top Performing Sectors" size="large">
            <DoughnutChart />
          </Cards>
        </Suspense>
      </Col>
    </Row>
  );
};

export default Charts;
