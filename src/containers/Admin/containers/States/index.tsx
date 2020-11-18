import { Button, Col, Row, Table, Dropdown, Menu, Space } from "antd";
import React from "react";
import FeatherIcon from "feather-icons-react";

import { Cards } from "../../../../components/cards/frame/cards-frame";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as ArrowDown } from "../../../../static/svg/arrowDown.svg";
import Styled from "styled-components";

const TableHeaderButtonStyled = Styled(Button)`
  background: #F7F9FA;
  color: #1D429C;
  font-weight: 700;
  border: 0;

  &:hover {
    background: #F7F9FA;
    color: #1D429C;
    border-color: #F7F9FA;
  }

  svg {
    margin-left: 25px
  }
`;

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

const dataSource = [
  {
    key: "1",
    rank: "01",
    company: "Paystack",
    ceo_founder: "Sundar Pichai",
    state: "Adamawa",
    sectors: "Technology",
    market_cap: "$134.5B",
    employees: "20/200",
    funding: "$2.4M",
  },
  {
    key: "1",
    rank: "01",
    company: "Paystack",
    ceo_founder: "Sundar Pichai",
    state: "Adamawa",
    sectors: "Technology",
    market_cap: "$134.5B",
    employees: "20/200",
    funding: "$2.4M",
  },
  {
    key: "1",
    rank: "01",
    company: "Paystack",
    ceo_founder: "Sundar Pichai",
    state: "Adamawa",
    sectors: "Technology",
    market_cap: "$134.5B",
    employees: "20/200",
    funding: "$2.4M",
  },
  {
    key: "1",
    rank: "01",
    company: "Paystack",
    ceo_founder: "Sundar Pichai",
    state: "Adamawa",
    sectors: "Technology",
    market_cap: "$134.5B",
    employees: "20/200",
    funding: "$2.4M",
  },
  {
    key: "1",
    rank: "01",
    company: "Paystack",
    ceo_founder: "Sundar Pichai",
    state: "Adamawa",
    sectors: "Technology",
    market_cap: "$134.5B",
    employees: "20/200",
    funding: "$2.4M",
  },
];

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
    render: () => (
      <Space size="middle">
        <Button>View Profile</Button>
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

const States = () => {
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
            <Cards
              title="Explore by ecosystem segments"
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

        <Row gutter={15}>
          <Col xs={24}>
            <Cards title={tableHeader} more={content}>
              <Table
                className="table-responsive"
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default States;
