import React from "react";
import { Menu } from "antd";
import {
  NavLink,
  useLocation,
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ReactComponent as DashboardIcon } from "../../static/svg/dashboardIcon.svg";
import { ReactComponent as OrganizationNavIcon } from "../../static/svg/orgNavIcon.svg";
import { ReactComponent as HelpNavIcon } from "../../static/svg/helpNavIcon.svg";
import { ReactComponent as AccountsNavIcon } from "../../static/svg/accountsNavIcon.svg";
import { ReactComponent as ContactNavIcon } from "../../static/svg/contactNavIcon.svg";
import { ReactComponent as LogOutNavIcon } from "../../static/svg/logoutNavIcon.svg";
import { ReactComponent as AboutNavIcon } from "../../static/svg/aboutNavIcon.svg";
import { ReactComponent as UserPlus } from "../../static/svg/user.svg";
import { useAuthContext } from "../../context";

const MenuItems = props => {
  const { path } = useRouteMatch();
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split("/");

  const { darkMode, topMenu, toggleCollapsed } = props;

  // console.log(props);

  const { auth, signOut } = useAuthContext();

  return (
    <Menu
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
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
      // defaultSelectedKeys={["/d"]}
      // selectedKeys={[location.pathname]}
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

      {auth.isAuthenticated && (
        <Menu.Item icon={<AccountsNavIcon />} key="Account">
          <NavLink onClick={toggleCollapsed} to={`/d/account`}>
            Account
          </NavLink>
        </Menu.Item>
      )}

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

      <Menu.Item icon={<HelpNavIcon />} key="help_center">
        <NavLink onClick={toggleCollapsed} to={`/d/help`}>
          Help Center
        </NavLink>
      </Menu.Item>

      {auth.isAuthenticated && (
        <Menu.Item icon={<UserPlus />} key="administrators">
          <NavLink onClick={toggleCollapsed} to={`/d/administrators`}>
            Administrators
          </NavLink>
        </Menu.Item>
      )}

      {auth.isAuthenticated && (
        <Menu.Item icon={<LogOutNavIcon />} key="Log_Out">
          <NavLink
            onClick={() => {
              toggleCollapsed();

              signOut();
            }}
            to="#"
          >
            Log Out
          </NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default withRouter(MenuItems);
