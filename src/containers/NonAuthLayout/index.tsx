import React, { FunctionComponent } from "react";
import { Layout, Breadcrumb, Col, Row, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../static/svg/logo.svg";
import { ReactComponent as UserPlus } from "../../static/svg/user.svg";
import { ReactComponent as LoginIcon } from "../../static/svg/login.svg";
import { ReactComponent as UserIcon } from "../../static/svg/usericon.svg";

import { FooterStyled, HeaderStyled, LayoutStyled } from "./styled";
import Styled from "styled-components";
import { Dropdown } from "../../components/dropdown/dropdown";
// import { Button as ButtonStyled } from "../../components/buttons/buttons";

const { Content } = Layout;

const BusinessButton = Styled(Button)`
  border: ${({ theme }) => `solid 1px ${theme["primary-color"]}`}
  color: ${({ theme }) => theme["primary-color"]}
  margin-right: 2rem;
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

const LinkStyled = Styled(Link)`
  background: #F7F9FA; 
  
  span {
    display: flex;
    align-items: center;
  }
`;

const NonAuthLayout: FunctionComponent = ({ children }) => {
  const menu = (
    <div style={{ padding: "20px" }}>
      <LinkStyled to="/login">
        <span>
          <LoginIcon /> Login
        </span>
      </LinkStyled>

      <LinkStyled to="/signup">
        <span>
          <UserPlus /> Sign Up
        </span>
      </LinkStyled>
    </div>
  );

  return (
    <LayoutStyled className="layout nonAuthLayout">
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
                <UserIcon style={{ marginRight: "10px" }} /> Account{" "}
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
    </LayoutStyled>
  );
};

export default NonAuthLayout;
