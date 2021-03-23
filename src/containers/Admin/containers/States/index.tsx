import React from "react";
import { Button, Col, Row, Table } from "antd";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { NavLink } from "react-router-dom";
import { createDataSource, createTableColumns, TableOptions } from "../helpers";
import { useOrganizationContext } from "../../../../context";

const cardHeader = (
  <div>
    <span>Newly Added</span>
  </div>
);

const States = () => {
  const {
    isLoading: isOrganizationLoading,
    data: organizations,
  } = useOrganizationContext();

  return (
    <AdminSectionWrapper>
      <div>
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
      </div>

      <Main>
        <Row gutter={24} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            <Cards title="Explore by States" size="large">
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "400px" }}
              ></div>
            </Cards>
          </Col>
        </Row>

        <Row gutter={15}>
          <Col xs={24}>
            <Cards title={cardHeader} more={TableOptions()}>
              <Table
                className="table-responsive"
                dataSource={createDataSource(organizations)}
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

export default States;
