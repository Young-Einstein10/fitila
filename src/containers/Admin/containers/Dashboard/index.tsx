import { Button, Card, Col, Dropdown, Menu, Row } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import FeatherIcon from "feather-icons-react";
import React, { Fragment } from "react";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { ReactComponent as FilterOutlined } from "../../../../static/svg/filter.svg";
import { AdminSectionWrapper } from "../../styled";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { NavLink } from "react-router-dom";
import { ReactComponent as Icon1 } from "../../../../static/svg/icon1.svg";
import { ReactComponent as BriefCase } from "../../../../static/svg/briefcase.svg";
import { CardSegmentStyled } from "./styled";

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

const Dashboard = () => {
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

  return (
    <AdminSectionWrapper>
      <div style={{ background: "#F4F4F4" }}>
        <PageHeader
          title="Gain credible insights into Nigeria’s most thriving Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button size="large" type="primary">
                List Your Business
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
                  Zones <DownOutlined style={{ marginLeft: "15px" }} />
                </Button>
              </Dropdown>
            </Col>
          ))}
        </Row>
      </div>

      <Main style={{ padding: "1.3rem" }}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {[1, 2, 3, 4].map((_, key) => (
            <Col key={key} span={6}>
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
                    36
                  </p>
                  <Icon1 />
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={25} style={{ marginTop: "2rem" }}>
          <Col xs={24}>
            <Cards
              title="Explore by ecosystem segments"
              size="large"
              more={content}
            >
              <Row gutter={[16, 16]}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((_, key) => (
                  <Col className="gutter-row" span={6} key={key}>
                    <CardSegmentStyled>
                      <BriefCase />

                      <div>
                        <strong>Funding</strong>
                        <br />
                        <span>05 Sub-classes</span>
                      </div>
                    </CardSegmentStyled>
                  </Col>
                ))}
              </Row>
            </Cards>
          </Col>
        </Row>

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

        <Row gutter={16} style={{ marginTop: "2rem" }}>
          <Col span={8}>
            <Cards
              title="Explore by ecosystem segments"
              size="large"
              more={content}
            >
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>
          <Col span={8}>
            <Cards
              title="Explore by ecosystem segments"
              size="large"
              more={content}
            >
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>
          <Col span={8}>
            <Cards
              title="Explore by ecosystem segments"
              size="large"
              more={content}
            >
              <div
                className="states-lga"
                style={{ background: "#B1E2CB", height: "330px" }}
              ></div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default Dashboard;
