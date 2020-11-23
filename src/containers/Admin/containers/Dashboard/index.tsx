import { Button, Card, Col, Dropdown, Menu, Row, Space, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import FeatherIcon from "feather-icons-react";
import React, { Fragment } from "react";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as FilterOutlined } from "../../../../static/svg/filter.svg";
import { ReactComponent as Icon1 } from "../../../../static/svg/icon1.svg";
import { ReactComponent as BriefCase } from "../../../../static/svg/briefcase.svg";
import { ReactComponent as ArrowDown } from "../../../../static/svg/arrowDown.svg";
import { CardSegmentStyled } from "./styled";
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

const Dashboard = () => {
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

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }}
          style={{ padding: "0 1.3rem 1.3rem" }}
        >
          <Col span={6}>
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
                States <ArrowDown style={{ marginLeft: "15px" }} />
              </Button>
            </Dropdown>
          </Col>

          <Col span={6}>
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
                LGA's <ArrowDown style={{ marginLeft: "15px" }} />
              </Button>
            </Dropdown>
          </Col>

          <Col span={6}>
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
                Sector <ArrowDown style={{ marginLeft: "15px" }} />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>

      <Main style={{ padding: "1.3rem" }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={6}>
            <Card>
              <p style={{ color: "#81868C", borderRadius: "4px" }}>
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
                  863
                </p>
                <Icon1 />
              </div>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <p style={{ color: "#81868C", borderRadius: "4px" }}>
                Number of States
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

          <Col span={6}>
            <Card>
              <p style={{ color: "#81868C", borderRadius: "4px" }}>Locations</p>

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
                  376
                </p>
                <Icon1 />
              </div>
            </Card>
          </Col>

          <Col span={6}>
            <Card>
              <p style={{ color: "#81868C", borderRadius: "4px" }}>
                Estimated Market Size
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
                  ₦9.5B
                </p>
                <Icon1 />
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={25} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            <Cards
              title="Explore by ecosystem segments"
              size="large"
              more={content}
            >
              <Row gutter={[16, 16]}>
                {[
                  {
                    name: "Business Support",
                    key: "businessSupport",
                    iconUrl: "",
                  },
                  {
                    name: "Training",
                    key: "training",
                    iconUrl: "",
                  },
                  {
                    name: "Funding",
                    key: "funding",
                    iconUrl: "",
                  },
                  {
                    name: "Market Access",
                    key: "market",
                    iconUrl: "",
                  },
                  {
                    name: "Policy & Regulation",
                    key: "policy",
                    iconUrl: "",
                  },
                  {
                    name: "Resources",
                    key: "resources",
                    iconUrl: "",
                  },
                  {
                    name: "Rsearch",
                    key: "research",
                    iconUrl: "",
                  },
                  {
                    name: "Businesses",
                    key: "businesses",
                    iconUrl: "",
                  },
                ].map((item, key) => (
                  <Col className="gutter-row" span={6} key={key}>
                    <Link to={`/d/segments/${item.key}`}>
                      <CardSegmentStyled>
                        <BriefCase />

                        <div>
                          <strong>{item.name}</strong>
                          <br />
                          <span>05 Sub-classes</span>
                        </div>
                      </CardSegmentStyled>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Cards>
          </Col>
        </Row>

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

export default Dashboard;
