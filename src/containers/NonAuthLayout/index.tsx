import React, { FunctionComponent } from "react";
import { Layout, Breadcrumb, Col, Row, Button } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../static/svg/logo.svg";
import { ReactComponent as UserIcon } from "../../static/svg/user.svg";
import { ReactComponent as LoginIcon } from "../../static/svg/login.svg";

import { FooterStyled, HeaderStyled } from "./styled";
import Styled from "styled-components";
import { Dropdown } from "../../components/dropdown/dropdown";
// import { Button as ButtonStyled } from "../../components/buttons/buttons";

const { Content } = Layout;

const BusinessButton = Styled(Button)`
  border: ${({ theme }) => `solid 1px ${theme["primary-color"]}`}
  color: ${({ theme }) => theme["primary-color"]}
  margin-right: 15px;
`;

const ButtonStyled = Styled(Button)`
  background: #F7F9FA
  color: #000000;
  font-weight: 700;
  border: 0;

  &:hover, &:active {
   background: #F7F9FA
  color: #000000;
  font-weight: 700;
  border: 0;
  }
`;

const NonAuthLayout: FunctionComponent = ({ children }) => {
  const menu = (
    <div style={{ padding: "20px" }}>
      <Link to="/login" style={{ background: "#F7F9FA", marginBottom: "15px" }}>
        <span>
          <LoginIcon /> Login
        </span>
      </Link>
      <Link to="/signup" style={{ background: "#F7F9FA" }}>
        <span>
          <UserIcon /> Sign Up
        </span>
      </Link>
    </div>
  );

  return (
    <Layout className="layout nonAuthLayout">
      <HeaderStyled>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div className="navItem-left">
            <Link className={`striking-logo top-menu' `} to="/">
              <img src={Logo} alt="Logo" />
            </Link>

            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="navItem-right">
            <BusinessButton size="large">
              <NavLink to="/business">List Your Business</NavLink>
            </BusinessButton>

            <Dropdown className="account-btn" content={menu}>
              <ButtonStyled size="large" type="primary">
                <UserOutlined style={{ marginRight: "10px" }} /> Account{" "}
                <DownOutlined />
              </ButtonStyled>
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
              2020 ©, Copyright, Enterprise Data Map
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
      </FooterStyled>
    </Layout>
  );
};

export default NonAuthLayout;
