import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Row, Menu, Col, Table } from "antd";
import FeatherIcon from "feather-icons-react";
import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { getOrganization } from "../../../../redux/actions/businessActions";
import { AdminSectionWrapper } from "../../styled";
import { ReactComponent as ArrowDown } from "../../../../static/svg/arrowDown.svg";
import { Main } from "../../../AuthLayout/styled";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import { NavLink } from "react-router-dom";
import { TableHeaderButtonStyled } from "../Dashboard/styled";
import Filter from "../Dashboard/_partials/Filter";
import { createDataSource, createTableColumns } from "../helpers";

const content = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

const menu = (
  <Menu onClick={() => {}}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      1st menu item
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      2nd menu item
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      3rd menu item
    </Menu.Item>
  </Menu>
);

const tableHeader = (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <span>Organization</span>
    <Dropdown overlay={menu}>
      <TableHeaderButtonStyled type="ghost" size="middle">
        Past Month <ArrowDown />
      </TableHeaderButtonStyled>
    </Dropdown>
  </div>
);

const Organizations = ({ getOrganization, organization }) => {
  const [isOrganizationLoading, setIsOrganizationLoading] = useState(false);

  useEffect(() => {
    setIsOrganizationLoading(true);

    getOrganization()
      .then(res => setIsOrganizationLoading(false))
      .catch(err => setIsOrganizationLoading(false));
  }, [getOrganization]);

  return (
    <AdminSectionWrapper className="organizations">
      <div>
        <PageHeader
          title="Organizations"
          buttons={[
            <div key="1" className="page-header-actions">
              <Button size="large" type="primary">
                <NavLink to="/business">List Your Business</NavLink>
              </Button>
            </div>,
          ]}
          style={{
            background: "none",
          }}
        />

        <Filter />
      </div>

      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards title={tableHeader} more={content}>
              <Table
                className="table-responsive"
                pagination={false}
                dataSource={createDataSource(organization)}
                columns={createTableColumns()}
                loading={isOrganizationLoading}
              />
            </Cards>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

const mapStateToProps = state => ({
  organization: state.business.organization,
});

export default connect(mapStateToProps, { getOrganization })(Organizations);
