import React, { FunctionComponent } from "react";
import {
  Layout,
  Breadcrumb,
  Button,
  Menu,
  Col,
  Row,
  Dropdown,
  message,
} from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../static/svg/logo.svg";
import { ReactComponent as UserIcon } from "../../static/svg/user.svg";
import { ReactComponent as LoginIcon } from "../../static/svg/login.svg";

import { FooterStyled, HeaderStyled } from "./styled";
import Styled from "styled-components";

const { Header, Content } = Layout;

const AccountButton = Styled(Button)`
  backround: #F7F9FA;
`;

const NonAuthLayout: FunctionComponent = ({ children }) => {
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<UserIcon />}>
        <NavLink to="/login">Log In</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<LoginIcon />}>
        <NavLink to="/signup">Sign Up</NavLink>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout nonAuthLayout">
      <HeaderStyled>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div className="navItem-left">
            <Link className={`striking-logo top-menu' `} to="/admin">
              <img src={Logo} alt="Logo" />
            </Link>

            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="navItem-right">
            <Button size="large" className="listBusiness">
              <NavLink to="/business">List Your Business</NavLink>
            </Button>

            <Dropdown className="account-btn" overlay={menu}>
              <AccountButton size="large">
                <UserOutlined /> Account <DownOutlined />
              </AccountButton>
            </Dropdown>
          </div>
        </Row>
      </HeaderStyled>

      <Content
        style={{
          padding: "0 50px",
          background: "#fff",
          minHeight: "calc(100vh - 128px)",
        }}
      >
        <section>{children}</section>
      </Content>

      <FooterStyled className="admin-footer">
        <Row>
          <Col md={12} xs={24}>
            <span className="admin-footer__copyright">
              2020, Copyright, Enterprise Data Map
            </span>
          </Col>

          <Col md={12} xs={24}>
            <div className="admin-footer__links">
              <NavLink to="#">Privacy Poilicy</NavLink>
              <NavLink to="#">Terms and Condition</NavLink>
              <NavLink to="#">Cookie Poilicy</NavLink>
            </div>
          </Col>
        </Row>

        {/* <div>
          <p>2020, Copyright, Enterprise Data Map</p>
        </div>

        <ul>
          <li>
            <a href="/privacy">Privacy Poilicy</a>
          </li>

          <li>
            <a href="/privacy">Terms and Condition</a>
          </li>

          <li>
            <a href="/privacy">Cookie Poilicy</a>
          </li>
        </ul> */}
      </FooterStyled>
    </Layout>
  );
};

export default NonAuthLayout;
