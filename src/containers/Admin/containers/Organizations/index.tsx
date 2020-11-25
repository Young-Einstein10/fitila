import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Row, Menu, Col, Table, Space } from "antd";
import FeatherIcon from "feather-icons-react";
import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { getOrganization } from "../../../../redux/actions/businessActions";
import { AdminSectionWrapper } from "../../styled";
import { ReactComponent as FilterOutlined } from "../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../static/svg/arrowDown.svg";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { Link, NavLink } from "react-router-dom";
import {
  TableHeaderButtonStyled,
  ViewProfileBtnStyled,
} from "../Dashboard/styled";

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
  // {
  //   title: "Market Cap",
  //   dataIndex: "market_cap",
  //   key: "market_cap",
  // },
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
    <span>Business Support</span>
    <Dropdown overlay={menu}>
      <TableHeaderButtonStyled type="ghost" size="middle">
        Past Month <ArrowDown />
      </TableHeaderButtonStyled>
    </Dropdown>
  </div>
);

const Organizations = ({ getOrganization, organization }) => {
  const [isOrganizationLoading, setIsOrganizationLoading] = useState(false);

  useEffect(() => {
    setIsOrganizationLoading(true);

    getOrganization()
      .then(res => setIsOrganizationLoading(false))
      .catch(err => setIsOrganizationLoading(false));
  }, [getOrganization]);

  return (
    <AdminSectionWrapper>
      <div>
        <PageHeader
          title="Organizations in Lagos"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button size="large" type="primary">
                <NavLink to="/business">List Your Business</NavLink>
              </Button>
            </div>,
          ]}
        />

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
          style={{ padding: "0 1.3rem 1.3rem" }}
        >
          {[1, 2, 3, 4].map((item, key) => (
            <Col key={key} span={6}>
              <Dropdown overlay={menu}>
                <Button
                  style={{
                    width: "100%",
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FilterOutlined style={{ marginRight: "15px" }} /> Filter By
                  Zones <ArrowDown style={{ marginLeft: "15px" }} />
                </Button>
              </Dropdown>
            </Col>
          ))}
        </Row>
      </div>

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards title={tableHeader} more={content}>
              <Table
                className="table-responsive"
                pagination={false}
                dataSource={organization.map((org, key) => {
                  return {
                    key: key,
                    rank: key + 1,
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
  organization: state.business.organization,
});

export default connect(mapStateToProps, { getOrganization })(Organizations);
