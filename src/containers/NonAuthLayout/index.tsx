import React, { FC } from "react";
import { Layout, Col, Row, Dropdown, Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import Logo from "../../static/img/logo.png";
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
import { useAuthContext } from "../../context";
// import { DownOutlined } from "@ant-design/icons";
import { Popover } from "../../components/popup/popup";
import { UserDropdown } from "../adminLayout/style";

const { Content } = Layout;

const NonAuthLayout: FC = ({ children }) => {
  const {
    auth: { isAuthenticated },
  } = useAuthContext();

  const toggleMenuContent = (
    <ul className="toggle-menu-content">
      <li style={{ marginBottom: "1.5rem" }}>
        <BusinessButton size="large">
          <NavLink to="/business">List Your Organization</NavLink>
        </BusinessButton>
      </li>

      {isAuthenticated ? (
        <li>
          <BusinessButton size="large" type="link">
            <NavLink to="/d">See Dashboard</NavLink>
          </BusinessButton>
        </li>
      ) : (
        <>
          <li style={{ marginBottom: "1.5rem" }}>
            <NavLink to="/login">
              <BusinessButton size="large">
                <UserIcon style={{ marginRight: "10px" }} />
                Log In
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
        </>
      )}
    </ul>
  );

  const userContent = (
    <UserDropdown>
      <div className="user-dropdwon">
        <ul className="user-dropdwon__links">
          <li>
            <Link to="/login">
              <FeatherIcon icon="user" /> <strong>Log In</strong>
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
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            <div id="navItem-right" className="navItem-right">
              <BusinessButton size="large">
                <NavLink to="/business">List Your Organization</NavLink>
              </BusinessButton>

              {isAuthenticated ? (
                <BusinessButton size="large">
                  <NavLink to="/d">See Dashboard</NavLink>
                </BusinessButton>
              ) : (
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
              )}
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
                <NavLink to="/login">Admin</NavLink>
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
