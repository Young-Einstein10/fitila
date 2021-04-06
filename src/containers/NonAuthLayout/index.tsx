import React, { FunctionComponent } from "react";
import { Layout, Col, Row, Dropdown, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../static/svg/logo.svg";
import burgermenu from "../../static/svg/burgermenu.svg";

import { ReactComponent as UserPlus } from "../../static/svg/user.svg";
import { ReactComponent as UserIcon } from "../../static/svg/usericon.svg";
import { ButtonStyled } from "../Styles";
import { DownOutlined } from "@ant-design/icons";
import {
  BusinessButton,
  Div,
  FooterStyled,
  HeaderStyled,
  LayoutStyled,
  LinkStyled,
} from "./styled";
import "./styles.less";

const { Content } = Layout;

const NonAuthLayout: FunctionComponent = ({ children }) => {
  const menu = (
    <div style={{ padding: "1rem", background: "#fff" }}>
      <LinkStyled
        to="#"
        style={{
          padding: "1rem",
          background: "#F7F9FA",
          marginBottom: ".5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>
          <UserPlus style={{ marginRight: "1.25rem" }} /> Sign Up
        </span>
      </LinkStyled>

      <LinkStyled
        to="/signin"
        style={{
          padding: "1rem",
          background: "#F7F9FA;",
          marginBottom: ".5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>
          <UserPlus style={{ marginRight: "1.25rem" }} /> Sign In
        </span>
      </LinkStyled>
    </div>
  );

  const toggleMenuContent = (
    <ul className="toggle-menu-content">
      <li>
        <BusinessButton size="large">
          <NavLink to="/business">List Your Organization</NavLink>
        </BusinessButton>
      </li>

      <li>
        <ButtonStyled size="large">
          <UserIcon style={{ marginRight: "10px" }} />
          <NavLink to="/signin">Sign In</NavLink>
        </ButtonStyled>
      </li>

      <li>
        <ButtonStyled size="large">
          <UserIcon style={{ marginRight: "10px" }} />
          <NavLink to="#">Sign Up</NavLink>
        </ButtonStyled>
      </li>
    </ul>
  );

  return (
    <Div>
      <LayoutStyled className="layout nonAuthLayout">
        <HeaderStyled>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="navItem-left">
              <Link className={`striking-logo top-menu' `} to="/">
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            <div id="navItem-right" className="navItem-right">
              <BusinessButton size="large">
                <NavLink to="/business">List Your Organization</NavLink>
              </BusinessButton>

              <Dropdown className="account-btn" overlay={menu}>
                <ButtonStyled size="large">
                  <UserIcon style={{ marginRight: "10px" }} />
                  <strong>
                    Account
                    <DownOutlined style={{ marginLeft: "10px" }} />
                  </strong>
                </ButtonStyled>
              </Dropdown>
            </div>

            <div className="toggle-menu">
              <Dropdown
                overlay={toggleMenuContent}
                placement="bottomRight"
                trigger={["click"]}
                overlayClassName="toggle-menu-container"
                overlayStyle={{
                  top: "65px",
                  boxShadow: "0px 2px 8px rgb(53 55 81 / 4%)",
                }}
              >
                <Button>
                  <img src={burgermenu} alt="menu" />
                </Button>
              </Dropdown>
            </div>
          </Row>
        </HeaderStyled>

        <Content>
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
                <NavLink to="/login">Admin</NavLink>
                <NavLink to="/d/privacy">Privacy Poilicy</NavLink>
                <NavLink to="/d/terms">Terms and Condition</NavLink>
                <NavLink to="#">Cookie Poilicy</NavLink>
              </div>
            </Col>
          </Row>
        </FooterStyled>
      </LayoutStyled>
    </Div>
  );
};

export default NonAuthLayout;
