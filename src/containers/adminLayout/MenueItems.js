import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation, withRouter } from "react-router-dom";
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
  const { darkMode, topMenu, toggleCollapsed } = props;

  // console.log(props);
  const location = useLocation();
  const { auth, signOut } = useAuthContext();

  return (
    <Menu
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
      defaultSelectedKeys={["/d"]}
      selectedKeys={[location.pathname]}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
    >
      <Menu.Item icon={<DashboardIcon />} key="/d">
        <NavLink onClick={toggleCollapsed} to={`/d`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<OrganizationNavIcon />} key="/d/organizations">
        <NavLink onClick={toggleCollapsed} to={`/d/organizations`}>
          Organizations
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<DashboardIcon />} key="/d/states">
        <NavLink onClick={toggleCollapsed} to={`/d/states`}>
          States
        </NavLink>
      </Menu.Item>

      {auth.isAuthenticated && (
        <Menu.Item icon={<AccountsNavIcon />} key="/d/account">
          <NavLink onClick={toggleCollapsed} to={`/d/account`}>
            Account
          </NavLink>
        </Menu.Item>
      )}

      {auth.isAuthenticated && (
        <Menu.Item icon={<AboutNavIcon />} key="/d/sectors">
          <NavLink onClick={toggleCollapsed} to={`/d/sectors`}>
            Sectors
          </NavLink>
        </Menu.Item>
      )}

      <Menu.Item icon={<ContactNavIcon />} key="/d/contact">
        <NavLink onClick={toggleCollapsed} to={`/d/contact`}>
          Contact
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<AboutNavIcon />} key="/d/project_brief">
        <NavLink onClick={toggleCollapsed} to={`/d/project_brief`}>
          Project Brief
        </NavLink>
      </Menu.Item>

      <Menu.Item icon={<HelpNavIcon />} key="/d/help">
        <NavLink onClick={toggleCollapsed} to={`/d/help`}>
          Help Center
        </NavLink>
      </Menu.Item>

      {auth.isAuthenticated && (
        <Menu.Item icon={<UserPlus />} key="/d/administrators">
          <NavLink onClick={toggleCollapsed} to={`/d/administrators`}>
            Administrators
          </NavLink>
        </Menu.Item>
      )}

      {auth.isAuthenticated && (
        <Menu.Item icon={<LogOutNavIcon />} key="log_out">
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
