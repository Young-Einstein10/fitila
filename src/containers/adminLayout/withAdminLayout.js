/* eslint-disable no-shadow */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Button, Row, Col, Breadcrumb } from "antd";
import { NavLink, Link, useRouteMatch, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { ThemeProvider } from "styled-components";
import MenueItems from "./MenueItems";
import { CurrentUserButton, Div, SidebarFooterStyled } from "./style";
import logo from "../../static/svg/logo.svg";
import { ReactComponent as ArrowRight } from "../../static/svg/arrowright.svg";
import burgermenu from "../../static/svg/burgermenu.svg";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import { capitalize } from "../Admin/containers/Dashboard/functions";

const { darkTheme } = require("../../config/theme/themeVariables");

const { Header, Footer, Sider, Content } = Layout;
// const { darkMode } = config;

const ThemeLayout = WrappedComponent => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed } = this.state;
      const { location } = this.props;

      const topMenu = false;
      const rtl = false;
      const ChangeLayoutMode = true;

      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 1200) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const breadcrumbNameMap = (name = "") => ({
        "/d": "Dashboard",
        "/d/organizations": "Organizations",
        "/d/states": "States",
        "/d/account": "Account",
        "/d/contact": "Contact",
        "/d/project_brief": "Project Brief",
        "/d/help": "Help",
        "/d/segments": "Ecosystem Segments",
        [`/d/segments/${name}`]: capitalize(
          `${name
            .split("_")
            .join(" ")
            .toString()}`
        ),
      });

      const pathSnippets = location.pathname.split("/").filter(i => i);

      // console.log("Path Snippets", pathSnippets);

      const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

        // console.log(`URL ${index}`, url);

        let filteredUrl = url.split("/").filter(i => i);

        // console.log(`Filtered URL ${index}`, filteredUrl);

        return (
          <BreadcrumbItem key={url}>
            <Link to={url}>
              {filteredUrl.length >= 3
                ? breadcrumbNameMap(filteredUrl[2])[url]
                : breadcrumbNameMap()[url]}
            </Link>
          </BreadcrumbItem>
        );
      });

      const breadcrumbItems = [
        <BreadcrumbItem key="home">
          <Link to="/">Home</Link>
        </BreadcrumbItem>,
      ].concat(extraBreadcrumbItems);

      const footerStyle = {
        padding: "20px 30px 18px",
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "16px",
        background: "#F2F2F2",
        boxShadow: "0 -5px 10px rgba(146,153,184, 0.05)",
      };

      const SideBarStyle = {
        margin: "63px 0 0 0",
        padding: "15px 15px 55px 15px",
        overflowY: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        zIndex: 998,
        boxShadow: "0px 2px 8px rgba(53, 55, 81, 0.08)",
        background: "#fff",
      };

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
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? "#ffffff16" : "#F1F2F6",
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      return (
        <Div>
          <Layout className="layout">
            <Header
              style={{
                position: "fixed",
                width: "100%",
                top: 0,
                left: 0,
                background: "#fff",
              }}
            >
              <Row
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
                    <img src={logo} alt="Logo" style={{ width: "100px" }} />
                  </Link>

                  <Breadcrumb separator={<ArrowRight />}>
                    {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Separator>
                      <ArrowRight />
                    </Breadcrumb.Separator>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Separator>
                      <ArrowRight />
                    </Breadcrumb.Separator>
                    <Breadcrumb.Item>Current</Breadcrumb.Item> */}

                    {breadcrumbItems}
                  </Breadcrumb>
                </div>

                <CurrentUserButton size="large">
                  <span></span>
                  {this.props.auth.user.first_name}{" "}
                  {this.props.auth.user.last_name}
                </CurrentUserButton>
              </Row>
            </Header>

            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={darkTheme}>
                  <Sider
                    width={220}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={"light"}
                  >
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

                      <SidebarFooterStyled>
                        <p>2020, Copyright, Enterprise Data Map</p>

                        <ul>
                          <li>Privacy Policy</li>
                          <li>Terms and Conditions</li>
                          <li>Cookie Policy</li>
                        </ul>
                      </SidebarFooterStyled>
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}

              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  <Footer className="admin-footer" style={footerStyle}>
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
                  </Footer>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Div>
      );
    }
  }

  const mapStateTopProps = state => ({
    auth: state.auth,
  });

  return connect(mapStateTopProps, null)(withRouter(LayoutComponent));
};

export default ThemeLayout;
