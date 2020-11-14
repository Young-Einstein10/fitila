import React, { FunctionComponent } from 'react';
import { Layout, Breadcrumb, Button, Menu, Col, Row, Dropdown, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../static/svg/logo.svg';
import { ReactComponent as UserIcon } from '../../static/svg/user.svg';
import { ReactComponent as LoginIcon } from '../../static/svg/login.svg';

import { FooterStyled } from './styled';
import styled from 'styled-components';

const { Header, Content } = Layout;

// const BtnWithIcon = styled.div`
//   display: inline;
//   .anticon i,
//   .anticon svg,
//   .anticon img {
//     width: 10px;
//     height: 10px;
//   }
//   .ant-btn-group button.active {
//     ${({ theme }) => (theme.rtl ? 'border-left' : 'border-right')}: 0px;
//   }
// `;

const NonAuthLayout: FunctionComponent = ({ children }) => {
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserIcon />}>
        <NavLink to="/login">Log In</NavLink>
      </Menu.Item>
      <Menu.Item key="2" icon={<LoginIcon />}>
        <NavLink to="/signup">Sign Up</NavLink>
      </Menu.Item>
    </Menu>
  );

  function handleMenuClick(e: any) {
    message.info('Click on menu item.');
    console.log('click', e);
  }
  return (
    <Layout className="layout nonAuthLayout">
      <Header style={{ boxShadow: '0px 2px 8px rgba(53, 55, 81, 0.04)' }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <div className="align-center-v navbar-brand">
            <Link className={`striking-logo top-menu' `} to="/admin">
              <img src={Logo} alt="Logo" />
            </Link>

            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <Button className="listBusiness">
              <NavLink to="/business">List Your Business</NavLink>
            </Button>

            {/* <Dropdown placement="topLeft">
              <BtnWithIcon>
                <Button size="default" outlined type="white">
                  Account
                  <DownOutlined />
                </Button>
              </BtnWithIcon>
            </Dropdown> */}

            <Dropdown overlay={menu}>
              <Button type="ghost">
                <UserOutlined /> Account <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </Row>
      </Header>

      {/* <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header> */}

      <Content style={{ padding: '0 50px', background: '#fff', minHeight: 'calc(100vh - 128px)' }}>
        <section>{children}</section>
      </Content>

      <FooterStyled className="admin-footer">
        <Row>
          <Col md={12} xs={24}>
            <span className="admin-footer__copyright">2020, Copyright, Enterprise Data Map</span>
          </Col>

          <Col md={12} xs={24}>
            <div className="admin-footer__links">
              <NavLink to="#">Privacy Poilicy</NavLink>
              <NavLink to="#">Terms and Condition</NavLink>
              <NavLink to="#">Cookie Poilicy</NavLink>
            </div>
          </Col>
        </Row>

        {/* <div>
          <p>2020, Copyright, Enterprise Data Map</p>
        </div>

        <ul>
          <li>
            <a href="/privacy">Privacy Poilicy</a>
          </li>

          <li>
            <a href="/privacy">Terms and Condition</a>
          </li>

          <li>
            <a href="/privacy">Cookie Poilicy</a>
          </li>
        </ul> */}
      </FooterStyled>
    </Layout>
  );
};

export default NonAuthLayout;
