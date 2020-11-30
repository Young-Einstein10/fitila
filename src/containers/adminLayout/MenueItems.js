import React from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { NavLink, useRouteMatch, withRouter } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { logout } from "../../redux/actions/authActions";
import { ReactComponent as DashboardIcon } from "../../static/svg/dashboardIcon.svg";
import { ReactComponent as OrganizationNavIcon } from "../../static/svg/orgNavIcon.svg";
import { ReactComponent as HelpNavIcon } from "../../static/svg/helpNavIcon.svg";
import { ReactComponent as AccountsNavIcon } from "../../static/svg/accountsNavIcon.svg";
import { ReactComponent as ContactNavIcon } from "../../static/svg/contactNavIcon.svg";
import { ReactComponent as LogOutNavIcon } from "../../static/svg/logoutNavIcon.svg";
import { ReactComponent as AboutNavIcon } from "../../static/svg/aboutNavIcon.svg";

const MenuItems = ({ darkMode, topMenu, toggleCollapsed, logout, history }) => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split("/");

  return (
    <Menu
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1
                  ? "home"
                  : mainPathSplit.length === 2
                  ? mainPathSplit[1]
                  : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={
        !topMenu
          ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
          : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
    >
      <Menu.Item icon={<DashboardIcon />} key="home">
        <NavLink onClick={toggleCollapsed} to={`/d`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<OrganizationNavIcon />} key="organizations">
        <NavLink onClick={toggleCollapsed} to={`/d/organizations`}>
          Organizations
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<DashboardIcon />} key="States">
        <NavLink onClick={toggleCollapsed} to={`/d/states`}>
          States
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<AccountsNavIcon />} key="Account">
        <NavLink onClick={toggleCollapsed} to={`/d/account`}>
          Account
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<ContactNavIcon />} key="Contact">
        <NavLink onClick={toggleCollapsed} to={`/d/contact`}>
          Contact
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<AboutNavIcon />} key="About">
        <NavLink onClick={toggleCollapsed} to={`/d/project_brief`}>
          Project Brief
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<HelpNavIcon />} key="help_enter">
        <NavLink onClick={toggleCollapsed} to={`/d/help`}>
          Help Center
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<LogOutNavIcon />} key="Log_Out">
        <NavLink
          onClick={() => {
            toggleCollapsed();

            logout().then(() => {
              history.push("/");
            });
          }}
          to="#"
        >
          Log Out
        </NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default connect(null, { logout })(withRouter(MenuItems));
