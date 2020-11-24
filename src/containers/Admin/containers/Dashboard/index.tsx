import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Dropdown, Menu, Row, Space, Table, Spin } from "antd";
import { connect } from "react-redux";
import FeatherIcon from "feather-icons-react";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { Link, NavLink } from "react-router-dom";
import {
  getEcosystem,
  getOrganization,
} from "../../../../redux/actions/businessActions";
import { ReactComponent as BriefCase } from "../../../../static/svg/briefcase.svg";
import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as ArrowDown } from "../../../../static/svg/arrowDown.svg";
import {
  CardSegmentStyled,
  TableHeaderButtonStyled,
  ViewProfileBtnStyled,
} from "./styled";
import SummaryData from "./_partials/SummaryData";
import FilterOption from "./_partials/Filter";

const content = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

const menu = (
  <Menu onClick={() => {}}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Ceo/Founder",
    dataIndex: "ceo_founder",
    key: "ceo_founder",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Sectors",
    dataIndex: "sectors",
    key: "sectors",
  },
  {
    title: "Market Cap",
    dataIndex: "market_cap",
    key: "market_cap",
  },
  {
    title: "Employees",
    dataIndex: "employees",
    key: "employees",
  },
  {
    title: "Funding",
    dataIndex: "funding",
    key: "funding",
  },
  {
    // title: "Action",
    key: "action",
    render: (record, key) => (
      <Space size="middle">
        <ViewProfileBtnStyled>
          <Link to={`/d/profile/${record.key}`}>View Profile</Link>
        </ViewProfileBtnStyled>
      </Space>
    ),
  },
];

const tableHeader = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>Newly Added</span>
    <Dropdown overlay={menu}>
      <TableHeaderButtonStyled type="ghost" size="middle">
        Past Month <ArrowDown />
      </TableHeaderButtonStyled>
    </Dropdown>
  </div>
);

const Dashboard = ({ business, getEcosystem, getOrganization }) => {
  const [isEcosystemLoading, setIsEcosystemLoading] = useState(false);
  const [isOrganizationLoading, setIsOrganizationLoading] = useState(false);

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
    <AdminSectionWrapper>
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
                  {business.ecosystem.map(ecosystem => (
                    <Col className="gutter-row" span={6} key={ecosystem.id}>
                      <Link
                        to={`/d/segments/${ecosystem.name
                          .split(" ")
                          .join("_")
                          .toLowerCase()}`}
                      >
                        <CardSegmentStyled>
                          <BriefCase />

                          <div>
                            <strong>{ecosystem.name}</strong>
                            <br />
                            <span>05 Sub-classes</span>
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

        <Row gutter={16} style={{ marginTop: "2rem" }}>
          <Col span={8}>
            <Cards title="2020 Investments" size="large" more={content}>
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>

          <Col span={8}>
            <Cards title="Female Led Startups" size="large" more={content}>
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>

          <Col span={8}>
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
                dataSource={business.organization.map(org => {
                  return {
                    key: org.id,
                    rank: org.id,
                    company: org.name,
                    ceo_founder: org.ceo_name,
                    state: org.state,
                    sectors: org.sector,
                    market_cap: org.market_cap || null,
                    employees: org.employess || null,
                    funding: org.funding || null,
                  };
                })}
                columns={columns}
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
