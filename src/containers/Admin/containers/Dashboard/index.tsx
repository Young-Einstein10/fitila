import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table, Spin } from "antd";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { content, generateIcons, tableHeader } from "./functions";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import {
  getEcosystem,
  getOrganization,
} from "../../../../redux/actions/businessActions";
import SummaryData from "./_partials/SummaryData";
import FilterOption from "./_partials/Filter";

import { CardSegmentStyled } from "./styled";
import { createDataSource, createTableColumns } from "../helpers";

const Dashboard = ({ business, getEcosystem, getOrganization }) => {
  const [isEcosystemLoading, setIsEcosystemLoading] = useState(false);
  const [isOrganizationLoading, setIsOrganizationLoading] = useState(false);

  const { segments } = business;

  useEffect(() => {
    setIsEcosystemLoading(true);
    setIsOrganizationLoading(true);

    getEcosystem()
      .then(res => setIsEcosystemLoading(false))
      .catch(err => setIsEcosystemLoading(false));

    getOrganization()
      .then(res => setIsOrganizationLoading(false))
      .catch(err => setIsOrganizationLoading(false));
  }, [getEcosystem, getOrganization]);

  return (
    <AdminSectionWrapper className="dasboard">
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

        <FilterOption />
      </div>

      <Main style={{ padding: "1.3rem" }}>
        <SummaryData business={business} />

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
                  {segments.map(segment => (
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
                            <span>{segment.sub_class.length} Sub-Classes</span>
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
            <Cards
              title="Explore by Ecosystem States"
              size="large"
              more={content}
            >
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "400px" }}
              ></div>
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
                pagination={false}
                dataSource={createDataSource(business.organization)}
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

const mapStateToProps = state => ({
  business: state.business,
});

export default connect(mapStateToProps, { getEcosystem, getOrganization })(
  Dashboard
);
