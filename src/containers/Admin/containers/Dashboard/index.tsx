import React, { FC } from "react";
import { Button, Col, Row, Table } from "antd";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { tableHeader } from "./functions";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { createDataSource, createTableColumns } from "../helpers";
import { useOrganizationContext } from "../../../../context";
import Charts from "./_partials/Charts";
import Summary from "./_partials/Summary";
import EcosystemList from "./_partials/EcosystemList";
import { MapOfNigeria } from "../../../../components/svgs/MapOfNigeria";
import states from "../../../../states.json";

const Dashboard: FC<RouteComponentProps> = () => {
  const {
    isLoading: isOrganizationLoading,
    data: organizations,
  } = useOrganizationContext();

  const statesData = states.map((state, idx) => {
    const organizationList = organizations.filter(
      org => org.state.toLowerCase() === state.name.toLowerCase()
    );

    const totalFunding = organizationList.reduce(
      (total, org) => total + Number(org.funding ? org.funding : 0),
      0
    );

    return {
      id: state.code,
      name: state.name,
      funding: totalFunding,
      organizations: organizationList,
      numOfOrganizations: organizationList.length,
    };
  });

  console.log({
    startupOrganizations: organizations.filter(org => org.is_startup),
  });

  return (
    <AdminSectionWrapper className="dashboard">
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

      <Main style={{ padding: "1.3rem" }}>
        <Summary />

        {/* ========= CHARTS ========== */}
        <Charts />
        {/* ========= CHARTS ========== */}

        {/* ECOSYSTEMS */}
        <EcosystemList />

        {/* STATES */}
        <Row gutter={24} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            {
              <Cards
                loading={isOrganizationLoading}
                title="Explore by States"
                size="large"
              >
                <MapOfNigeria statesData={statesData} />
              </Cards>
            }
          </Col>
        </Row>

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
