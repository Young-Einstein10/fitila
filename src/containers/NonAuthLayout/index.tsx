import React, { FC } from "react";
import { Layout, Col, Row, Dropdown, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
// import { ReactComponent as Logo } from "../../static/svg/logo.svg";
import burgermenu from "../../static/svg/burgermenu.svg";
import { ReactComponent as UserIcon } from "../../static/svg/usericon.svg";
import { ReactComponent as ArrowDown } from "../../static/svg/arrowDown.svg";
// import { ReactComponent as UserPlus } from "../../static/svg/user.svg";
import {
  BusinessButton,
  ButtonStyled,
  Div,
  FooterStyled,
  HeaderStyled,
  LayoutStyled,
} from "./styled";
import "./styles.less";
import { Popover } from "../../components/popup/popup";
import { UserDropdown } from "../adminLayout/style";
import { Logo } from "../../components/svgs";

const { Content } = Layout;

const NonAuthLayout: FC = ({ children }) => {
  const toggleMenuContent = (
    <ul className="toggle-menu-content">
      <li style={{ marginBottom: "1.5rem" }}>
        <BusinessButton size="large">
          <NavLink to="/business">List Your Organization</NavLink>
        </BusinessButton>
      </li>

      <li style={{ marginBottom: "1.5rem" }}>
        <BusinessButton size="large">
          <NavLink to="/d">See Dashboard</NavLink>
        </BusinessButton>
      </li>

      <li style={{ marginBottom: "1.5rem" }}>
        <NavLink to="/signin">
          <BusinessButton size="large">
            <UserIcon style={{ marginRight: "10px" }} />
            Sign In
          </BusinessButton>
        </NavLink>
      </li>

      <li>
        <NavLink to="/signup">
          <BusinessButton size="large">
            <UserIcon style={{ marginRight: "10px" }} />
            Sign Up
          </BusinessButton>
        </NavLink>
      </li>
    </ul>
  );

  const userContent = (
    <UserDropdown>
      <div className="user-dropdwon">
        <ul className="user-dropdwon__links">
          <li>
            <Link to="/signin">
              <FeatherIcon icon="user" /> <strong>Sign In</strong>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <FeatherIcon icon="settings" /> <strong>Sign Up</strong>
            </Link>
          </li>
        </ul>
      </div>
    </UserDropdown>
  );

  const YEAR = new Date().getFullYear();

  return (
    <Div>
      <LayoutStyled className="layout nonAuthLayout">
        <HeaderStyled>
          <Row
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <div className="navItem-left">
              <Link className={`striking-logo top-menu' `} to="/">
                {/* <img src={Logo} alt="Logo" /> */}
                <Logo />
              </Link>
            </div>

            <div id="navItem-right" className="navItem-right">
              <BusinessButton size="large">
                <NavLink to="/business">List Your Organization</NavLink>
              </BusinessButton>

              <BusinessButton size="large">
                <NavLink to="/d">See Dashboard</NavLink>
              </BusinessButton>

              <Popover
                placement="bottomRight"
                action="click"
                content={userContent}
              >
                <ButtonStyled size="large">
                  <UserIcon />
                  <strong>Account</strong>
                  <ArrowDown />
                </ButtonStyled>
              </Popover>
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
                {YEAR} © Copyright. Enterprise Data Map
              </span>
            </Col>

            <Col md={12} xs={24}>
              <div className="admin-footer__links">
                <NavLink to="/signin">Admin</NavLink>
                <NavLink to="/d/privacy">Privacy Policy</NavLink>
                <NavLink to="/d/terms">Terms and Condition</NavLink>
                {/* <NavLink to="#">Cookie Policy</NavLink> */}
              </div>
            </Col>
          </Row>
        </FooterStyled>
      </LayoutStyled>
    </Div>
  );
};

export default NonAuthLayout;
