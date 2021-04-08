import React, { FC } from "react";
import { Button, Col, Row, Table, Spin, Skeleton } from "antd";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import { generateIcons, tableHeader } from "./functions";
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
import Charts from "./_partials/Charts";
import { capitalize } from "../../../../utils/helpers";

const Dashboard: FC<RouteComponentProps> = () => {
  const {
    isLoading: isOrganizationLoading,
    data: organizations,
    states,
  } = useOrganizationContext();

  const {
    isLoading: isEcosystemLoading,
    data: ecosystems,
  } = useEcosystemContext();

  const statesData = states.slice(0, 11).map((state, idx) => {
    let organizationList = organizations.filter(
      org => org.state.toLowerCase() === state.toLowerCase()
    );

    return {
      id: idx + 1,
      name: capitalize(state),
      organizations: organizationList.length,
    };
  });

  return (
    <AdminSectionWrapper className="dashboard">
      <div style={{ background: "#F4F4F4" }}>
        <PageHeader
          title="Gain credible insights into Nigeria’s most thriving Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button className="btn-main" size="large" type="primary">
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
            <Cards title="Explore by ecosystem segments" size="large">
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
            {isOrganizationLoading ? (
              <Cards headless>
                <Skeleton active />
              </Cards>
            ) : (
              <Cards title="Explore by States" size="large">
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
                </RowStyled>
              </Cards>
            )}
          </Col>
        </Row>

        {/* ========= CHARTS ========== */}
        <Charts />
        {/* ========= CHARTS ========== */}

        <Row gutter={15}>
          <Col xs={24}>
            {/* // more={TableOptions()} */}
            <Cards title={tableHeader}>
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

export default Dashboard;
