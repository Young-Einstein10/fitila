import React from "react";
import { connect } from "react-redux";
import { Col, Row, Menu, Dropdown, Table } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { TableHeaderButtonStyled } from "../../../Dashboard/_partials/Businesses";
import { createDataSource, createTableColumns } from "../../../helpers";

const SimilarCompanies = ({ organization }) => {
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

  return (
    <Row gutter={15}>
      <Col xs={24}>
        <Cards
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Companies in Similar Locations and Sectors</span>
              <Dropdown overlay={menu}>
                <TableHeaderButtonStyled type="ghost" size="middle">
                  Past Month <ArrowDown />
                </TableHeaderButtonStyled>
              </Dropdown>
            </div>
          }
          more={content}
        >
          <Table
            className="table-responsive"
            pagination={false}
            dataSource={createDataSource(organization)}
            columns={createTableColumns()}
          />
        </Cards>
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  organization: state.business.organization,
});

export default connect(mapStateToProps, null)(SimilarCompanies);
