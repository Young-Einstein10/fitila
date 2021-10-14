import React, { useState, useEffect } from "react";
import { Layout, Button, Row, Col, Breadcrumb } from "antd";
import { NavLink, Link, withRouter, useHistory } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import MenueItems from "./MenueItems";
// import logo from "../../static/img/logo.png";
import { ReactComponent as ArrowRight } from "../../static/svg/arrowright.svg";
import { ReactComponent as ArrowDown } from "../../static/svg/arrowDown.svg";
import burgermenu from "../../static/svg/burgermenu.svg";
import { useAuthContext } from "../../context";
import FeatherIcon from "feather-icons-react";
import { Popover } from "../../components/popup/popup";
import { CurrentUserButton, Div, UserDropdown } from "./style";
import { breadcrumbNameMap } from "../../utils/helpers";
import { Logo } from "../../components/svgs";

const { Header, Footer, Sider, Content } = Layout;
const BreadcrumbItem = Breadcrumb.Item;

const ThemeLayout = WrappedComponent => {
  const LayoutComponent = props => {
    const [collapsed, setCollapsed] = useState(false);
    const [isLoggingOut] = useState(false);

    const { auth, signOut } = useAuthContext();

    useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      updateDimensions();
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }, []);

    const updateDimensions = () => {
      setCollapsed(window.innerWidth <= 1200 && true);
    };

    const { location } = props;

    const history = useHistory();

    const topMenu = false;
    const rtl = false;
    const ChangeLayoutMode = true;

    const handleLogout = () => {
      signOut(history);
    };

    const toggleCollapsed = () => setCollapsed(open => !open);

    const toggleCollapsedMobile = () => {
      if (window.innerWidth <= 1200) {
        toggleCollapsed();
      }
    };

    const pathSnippets = location.pathname.split("/").filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      let filteredUrl = url.split("/").filter(i => i);

      return (
        <BreadcrumbItem key={url}>
          {url === "/d/segments" ? (
            <span>
              {filteredUrl.length >= 3
                ? breadcrumbNameMap(filteredUrl[2], "")[url]
                : breadcrumbNameMap()[url]}
            </span>
          ) : url === "/d/profile" ? (
            <span>{breadcrumbNameMap()[url]}</span>
          ) : url === `/d/profile/${filteredUrl[2]}` ? (
            <span>
              {filteredUrl.length >= 3
                ? breadcrumbNameMap("", filteredUrl[2])[url]
                : breadcrumbNameMap()[url]}
            </span>
          ) : (
            <Link to={url}>
              {filteredUrl.length >= 3
                ? breadcrumbNameMap(filteredUrl[2], "")[url]
                : breadcrumbNameMap()[url]}
            </Link>
          )}
        </BreadcrumbItem>
      );
    });

    const breadcrumbItems = [
      <BreadcrumbItem key="home">
        <Link to="/">Home</Link>
      </BreadcrumbItem>,
    ].concat(extraBreadcrumbItems);

    const renderView = ({ style, ...props }) => {
      const customStyle = {
        marginRight: "auto",
        [rtl ? "marginLeft" : "marginRight"]: "-17px",
      };
      return <div {...props} style={{ ...style, ...customStyle }} />;
    };

    const renderThumbVertical = ({ style, ...props }) => {
      const thumbStyle = {
        borderRadius: 6,
        backgroundColor: ChangeLayoutMode ? "#ffffff16" : "#F1F2F6",
        left: "2px",
      };
      return <div style={{ ...style, ...thumbStyle }} props={props} />;
    };

    const renderTrackVertical = () => {
      const thumbStyle = {
        position: "absolute",
        width: "6px",
        transition: "opacity 200ms ease 0s",
        opacity: 0,
        [rtl ? "left" : "right"]: "2px",
        bottom: "2px",
        top: "2px",
        borderRadius: "3px",
      };
      return <div style={thumbStyle} />;
    };

    const renderThumbHorizontal = ({ style, ...props }) => {
      const { ChangeLayoutMode } = props;
      const thumbStyle = {
        borderRadius: 6,
        backgroundColor: ChangeLayoutMode ? "#ffffff16" : "#F1F2F6",
      };
      return <div style={{ ...style, ...thumbStyle }} props={props} />;
    };

    const YEAR = new Date().getFullYear();

    const userContent = (
      <UserDropdown>
        <div className="user-dropdwon">
          <ul className="user-dropdwon__links">
            <li>
              <Link to="/d/account">
                <FeatherIcon icon="user" /> Account
              </Link>
            </li>
          </ul>
          <Button
            className="user-dropdwon__bottomAction"
            onClick={handleLogout}
            loading={isLoggingOut}
          >
            <FeatherIcon icon="log-out" /> Log Out
          </Button>
        </div>
      </UserDropdown>
    );

    return (
      <Div>
        <Layout className="layout">
          <Header>
            <Row>
              <div className="navitem-left">
                {window.innerWidth <= 1200 ? (
                  <Button type="link" onClick={toggleCollapsed}>
                    <img src={burgermenu} alt="menu" />
                  </Button>
                ) : null}

                <Link
                  className={
                    topMenu && window.innerWidth > 991
                      ? "striking-logo top-menu"
                      : "striking-logo"
                  }
                  to="/"
                >
                  {/* <img src={logo} alt="Logo" /> */}
                  <Logo />
                </Link>

                <Breadcrumb separator={<ArrowRight />}>
                  {breadcrumbItems}
                </Breadcrumb>
              </div>

              {auth.isAuthenticated && (
                <Popover
                  placement="bottomRight"
                  action="click"
                  content={userContent}
                >
                  <CurrentUserButton className="user-info" size="large">
                    <span></span>
                    {auth.user.first_name} {auth.user.last_name}
                    <ArrowDown />
                  </CurrentUserButton>
                </Popover>
              )}
            </Row>
          </Header>

          <Layout>
            {!topMenu || window.innerWidth <= 991 ? (
              <Sider width={300} collapsed={collapsed} theme={"light"}>
                <Scrollbars
                  className="custom-scrollbar"
                  autoHide
                  autoHideTimeout={500}
                  autoHideDuration={200}
                  renderThumbHorizontal={renderThumbHorizontal}
                  renderThumbVertical={renderThumbVertical}
                  renderView={renderView}
                  renderTrackVertical={renderTrackVertical}
                >
                  <MenueItems
                    topMenu={topMenu}
                    rtl={rtl}
                    toggleCollapsed={toggleCollapsedMobile}
                  />
              
                </Scrollbars>
              </Sider>
            ) : null}

            <Layout className="atbd-main-layout">
              <Content>
                {/* =================== WRAPPED COMPONENT =================== */}
                <WrappedComponent {...props} />
                {/* =================== WRAPPED COMPONENT =================== */}

                <Footer className="admin-footer">
                  <Row>
                    <Col md={12} xs={24}>
                      <span className="admin-footer__copyright">
                        {YEAR} © Copyright. Ecosystem Data Map by{" "}
                        <a href="http://www.fatefoundation.org" rel="noopener">
                          FATE Foundation
                        </a>
                      </span>
                    </Col>
                    <Col md={12} xs={24}>
                      <div className="admin-footer__links">
                        <NavLink to="/d/signin">Admin</NavLink>
                        <NavLink to="/d/privacy">Privacy Policy</NavLink>
                        <NavLink to="/d/terms">Terms and Condition</NavLink>
                      </div>
                    </Col>
                  </Row>
                </Footer>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Div>
    );
  };

  return withRouter(LayoutComponent);
};

export default ThemeLayout;
