import React, { FC } from "react";
import { Button, Col, Row, Table, Spin } from "antd";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import { content, generateIcons, tableHeader } from "./functions";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";

import SummaryData from "./_partials/SummaryData";

import { CardSegmentStyled, RowStyled } from "./styled";
import { createDataSource, createTableColumns } from "../helpers";
import {
  useEcosystemContext,
  useOrganizationContext,
} from "../../../../context";

const DashboardScreen: FC<RouteComponentProps> = ({ history }) => {
  const {
    isLoading: isOrganizationLoading,
    data: organizations,
  } = useOrganizationContext();

  const {
    isLoading: isEcosystemLoading,
    data: ecosystems,
  } = useEcosystemContext();

  const statesData = [
    {
      id: 1,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 2,
      name: "Abuja",
      organizations: 40,
    },
    {
      id: 3,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 4,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 5,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 6,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 7,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 8,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 9,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 10,
      name: "Lagos",
      organizations: 40,
    },
    {
      id: 11,
      name: "Lagos",
      organizations: 40,
    },
  ];

  return (
    <AdminSectionWrapper className="dashboard">
      <div style={{ background: "#F4F4F4" }}>
        <PageHeader
          title="Gain credible insights into Nigeria’s most thriving Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button size="large" type="primary">
                <NavLink to="/business">List Your Business</NavLink>
              </Button>
            </div>,
          ]}
        />

        {/* <FilterOption /> */}
      </div>

      <Main style={{ padding: "1.3rem" }}>
        <SummaryData />

        {/* ECOSYSTEMS */}
        <Row gutter={25} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            <Cards
              title="Explore by ecosystem segments"
              size="large"
              more={content}
            >
              {isEcosystemLoading ? (
                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px",
                  }}
                >
                  <Spin />
                </Row>
              ) : (
                <Row gutter={[16, 16]}>
                  {ecosystems.map(segment => (
                    <Col
                      className="gutter-row"
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      key={segment.id}
                      style={{ minHeight: "122px" }}
                    >
                      <Link
                        to={`/d/segments/${segment.name
                          .split(" ")
                          .join("_")
                          .toLowerCase()}`}
                      >
                        <CardSegmentStyled>
                          {generateIcons(segment.name)}

                          <div>
                            <strong>{segment.name}</strong>
                            <br />
                            <span>
                              {segment.sub_ecosystem.length} Sub-Classes
                            </span>
                          </div>
                        </CardSegmentStyled>
                      </Link>
                    </Col>
                  ))}
                </Row>
              )}
            </Cards>
          </Col>
        </Row>

        {/* STATES */}
        <Row gutter={24} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            <Cards title="Explore by States" size="large" more={content}>
              <RowStyled>
                {statesData.map((state, i) => (
                  <Link
                    className={`cell cell--${i + 1}`}
                    key={state.id}
                    to={`/d/organizations/${state.name}`}
                  >
                    <div>
                      <p>{state.name}</p>
                      <span>{state.organizations} Organizations</span>
                    </div>
                  </Link>
                ))}

                {/* 
                <div className="cell cell--2" />
                <div className="cell cell--3" />
                <div className="cell cell--4" />
                <div className="cell cell--5" />
                <div className="cell cell--6" />
                <div className="cell cell--7" />
                <div className="cell cell--8" />
                <div className="cell cell--9" />
                <div className="cell cell--10" />
                <div className="cell cell--11" /> */}
              </RowStyled>
            </Cards>
          </Col>
        </Row>

        {/* CHARTS */}
        <Row gutter={[16, 16]} style={{ marginTop: "2rem" }}>
          <Col xs={24} sm={24} md={12} lg={8}>
            <Cards title="2020 Investments" size="large" more={content}>
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8}>
            <Cards title="Female Led Startups" size="large" more={content}>
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8}>
            <Cards title="Funding by Sector" size="large" more={content}>
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>
        </Row>

        <Row gutter={15}>
          <Col xs={24}>
            <Cards title={tableHeader} more={content}>
              <Table
                className="table-responsive"
                dataSource={createDataSource(
                  organizations.slice(organizations.length - 5)
                )}
                columns={createTableColumns()}
                loading={isOrganizationLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default DashboardScreen;
