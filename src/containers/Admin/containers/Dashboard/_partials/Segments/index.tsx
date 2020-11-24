import React from "react";
import { Button, Dropdown, Row, Menu, Col, Table, Space, Card } from "antd";
import FeatherIcon from "feather-icons-react";

import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../../../components/page-headers/page-headers";
import { ReactComponent as FilterOutlined } from "../../../../../../static/svg/filter.svg";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { ReactComponent as Icon1 } from "../../../../../../static/svg/icon1.svg";

import { ReactComponent as BusinessSupportIcon } from "../../../../../../static/svg/businessSupport.svg";
import { Main } from "../../../../../AuthLayout/styled";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { NavLink } from "react-router-dom";
import Styled from "styled-components";
import { AdminSectionWrapper } from "../../../../styled";
import { Tab } from "../../../../../../components/tabs/tabs";
import { Child, TabBasic } from "../../../../../../components/tabs/style";

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

const tableHeader = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>Business Advisory and Consulting organizations</span>
    <Dropdown overlay={menu}>
      <TableHeaderButtonStyled type="ghost" size="middle">
        Past Month <ArrowDown />
      </TableHeaderButtonStyled>
    </Dropdown>
  </div>
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
    key: "2",
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
    key: "3",
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
    key: "4",
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
    key: "5",
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
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button>View Profile</Button>
      </Space>
    ),
  },
];

const data = [
  {
    id: 1,
    title: "Business Advisory",
    tabTitle: "Business Advisory",
    content: (
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
    ),
  },
  {
    id: 2,
    title: "Mentoring",
    tabTitle: "Mentoring",
    content: (
      <Row gutter={15}>
        <Col xs={24}>
          <Cards
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Mentoring</span>
                <Dropdown overlay={menu}>
                  <TableHeaderButtonStyled type="ghost" size="middle">
                    Past Month <ArrowDown />
                  </TableHeaderButtonStyled>
                </Dropdown>
              </div>
            }
            more={content}
          >
            <Table
              className="table-responsive"
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
          </Cards>
        </Col>
      </Row>
    ),
  },
  {
    id: 3,
    title: "Incubators",
    tabTitle: "Incubators",
    content: (
      <Row gutter={15}>
        <Col xs={24}>
          <Cards
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Incubators</span>
                <Dropdown overlay={menu}>
                  <TableHeaderButtonStyled type="ghost" size="middle">
                    Past Month <ArrowDown />
                  </TableHeaderButtonStyled>
                </Dropdown>
              </div>
            }
            more={content}
          >
            <Table
              className="table-responsive"
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
          </Cards>
        </Col>
      </Row>
    ),
  },
  {
    id: 4,
    title: "Churches/Mosques",
    tabTitle: "Churches/Mosques",
    content: (
      <Row gutter={15}>
        <Col xs={24}>
          <Cards
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Churches / Mosques</span>
                <Dropdown overlay={menu}>
                  <TableHeaderButtonStyled type="ghost" size="middle">
                    Past Month <ArrowDown />
                  </TableHeaderButtonStyled>
                </Dropdown>
              </div>
            }
            more={content}
          >
            <Table
              className="table-responsive"
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
          </Cards>
        </Col>
      </Row>
    ),
  },
];

const Segment = () => {
  let counter = 0;

  return (
    <AdminSectionWrapper>
      <Row gutter={25}>
        <Col span={24}>
          <TabBasic defaultActiveKey="1" tabPosition={"top"}>
            {data.map(item => {
              const { content: tabContent, tabTitle } = item;
              counter += 1;
              return (
                <Child tab={tabTitle} key={counter}>
                  {/* <h2>{title}</h2>
                  <p>{content}</p> */}

                  <div>
                    <PageHeader
                      title={
                        <div>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "0",
                            }}
                          >
                            <BusinessSupportIcon
                              style={{ marginRight: "15px" }}
                            />{" "}
                            Segment
                          </p>
                        </div>
                      }
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
                          <Card>
                            <p
                              style={{ color: "#81868C", borderRadius: "4px" }}
                            >
                              Number of Organizations
                            </p>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "48px",
                                  fontWeight: "bold",
                                  marginBottom: "0px",
                                }}
                              >
                                36
                              </p>
                              <Icon1 />
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <Main>{tabContent}</Main>
                </Child>
              );
            })}
          </TabBasic>
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

export default Segment;
