import React from "react";
import { connect } from "react-redux";
import { Col, Row, Menu, Dropdown, Table, Space } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";
import { Link, NavLink } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { TableHeaderButtonStyled } from "../../../Dashboard/_partials/Businesses";
import { ViewProfileBtnStyled } from "../../../Dashboard/styled";

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

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Ceo/Founder",
      dataIndex: "ceo_founder",
      key: "ceo_founder",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Sectors",
      dataIndex: "sectors",
      key: "sectors",
    },
    // {
    //   title: "Market Cap",
    //   dataIndex: "market_cap",
    //   key: "market_cap",
    // },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Funding",
      dataIndex: "funding",
      key: "funding",
    },
    {
      // title: "Action",
      key: "action",
      render: (record, key) => (
        <Space size="middle">
          <ViewProfileBtnStyled>
            <Link to={`/d/profile/${record.key}`}>View Profile</Link>
          </ViewProfileBtnStyled>
        </Space>
      ),
    },
  ];
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
            dataSource={organization.map((org, key) => {
              return {
                key: key,
                rank: key + 1,
                company: org.name,
                ceo_founder: org.ceo_name,
                state: org.state,
                sectors: org.sector,
                market_cap: org.market_cap || null,
                employees: org.employess || null,
                funding: org.funding || null,
              };
            })}
            columns={columns}
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
