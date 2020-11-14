import React, { Fragment } from 'react';
import { Row, Col, Layout, Breadcrumb } from 'antd';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from '../../../components/dropdown/dropdown';
import { BtnWithIcon } from '../../styled';
import { Link } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

const Navbar = () => {
  return <Header></Header>;
};

const AuthLayout = WraperContent => {
  return () => {
    return (
      <Layout className="layout">
        <Header>
          <Row>
            <Col lg={4} sm={6} xs={12} className="align-center-v navbar-brand">
              <Link className={`striking-logo top-menu' `} to="/admin">
                <img src={require(`../../../static/svg/logo.svg`)} alt="" />
              </Link>
            </Col>

            <Col lg={4} sm={6} xs={12}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
            </Col>

            <Col lg={8} sm={4} xs={0} />

            <Col lg={4} sm={6} xs={12}>
              <Button size="default" outlined type="primary">
                List Your Business
              </Button>
            </Col>

            <Col lg={4} sm={6} xs={12}>
              <Dropdown placement="topLeft">
                <BtnWithIcon>
                  <Button size="default" outlined type="white">
                    Account
                    <DownOutlined />
                  </Button>
                </BtnWithIcon>
              </Dropdown>
            </Col>
          </Row>
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Fragment>
            <Navbar />
            <Row>
              <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
                <WraperContent />
              </Col>
            </Row>
            <Footer />
          </Fragment>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  };
};

export default AuthLayout;
