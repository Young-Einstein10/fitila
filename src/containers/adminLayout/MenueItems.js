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

const LinkedIcon = ({ children, to }) => <NavLink to={to}>{children}</NavLink>;

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
      <Menu.Item
        icon={<LinkedIcon children={<DashboardIcon />} to="/d" />}
        key="/d"
      >
        <NavLink onClick={toggleCollapsed} to={`/d`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <LinkedIcon
            to={`/d/organizations`}
            children={<OrganizationNavIcon />}
          />
        }
        key="/d/organizations"
      >
        <NavLink onClick={toggleCollapsed} to={`/d/organizations`}>
          Organizations
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={
          <LinkedIcon
            children={<OrganizationNavIcon />}
            to={`/d/pending_applications`}
          />
        }
        key="/d/organizapending_applicationstions"
      >
        <NavLink onClick={toggleCollapsed} to={`/d/pending_applications`}>
          Pending Applications
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={<LinkedIcon children={<DashboardIcon />} to="/d/states" />}
        key="/d/states"
      >
        <NavLink onClick={toggleCollapsed} to={`/d/states`}>
          States
        </NavLink>
      </Menu.Item>

      {auth.isAuthenticated && (
        <Menu.Item
          icon={<LinkedIcon children={<AccountsNavIcon />} to="/d/account" />}
          key="/d/account"
        >
          <NavLink onClick={toggleCollapsed} to={`/d/account`}>
            Account
          </NavLink>
        </Menu.Item>
      )}

      {auth.isAuthenticated && (
        <Menu.Item
          icon={<LinkedIcon children={<AboutNavIcon />} to="/d/sectors" />}
          key="/d/sectors"
        >
          <NavLink onClick={toggleCollapsed} to={`/d/sectors`}>
            Sectors
          </NavLink>
        </Menu.Item>
      )}

      <Menu.Item
        icon={<LinkedIcon children={<ContactNavIcon />} to="/d/contact" />}
        key="/d/contact"
      >
        <NavLink onClick={toggleCollapsed} to={`/d/contact`}>
          Contact
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={<LinkedIcon children={<AboutNavIcon />} to="/d/project_brief" />}
        key="/d/project_brief"
      >
        <NavLink onClick={toggleCollapsed} to={`/d/project_brief`}>
          Project Brief
        </NavLink>
      </Menu.Item>

      <Menu.Item
        icon={<LinkedIcon children={<HelpNavIcon />} to="/d/help" />}
        key="/d/help"
      >
        <NavLink onClick={toggleCollapsed} to={`/d/help`}>
          Help Center
        </NavLink>
      </Menu.Item>

      {auth.isAuthenticated && (
        <Menu.Item
          icon={<LinkedIcon children={<UserPlus />} to="/d/administrators" />}
          key="/d/administrators"
        >
          <NavLink onClick={toggleCollapsed} to={`/d/administrators`}>
            Administrators
          </NavLink>
        </Menu.Item>
      )}

      {auth.isAuthenticated && (
        <Menu.Item
          icon={<LinkedIcon children={<LogOutNavIcon />} to="#" />}
          key="log_out"
        >
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
