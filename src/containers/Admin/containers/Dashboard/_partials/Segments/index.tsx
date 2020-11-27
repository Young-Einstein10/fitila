import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Button, Dropdown, Row, Menu, Col, Table, Space } from "antd";
import FeatherIcon from "feather-icons-react";

import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../../../components/page-headers/page-headers";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { ReactComponent as BusinessSupportIcon } from "../../../../../../static/svg/businessSupport.svg";
import { Main } from "../../../../../AuthLayout/styled";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { Link, NavLink } from "react-router-dom";
import Styled from "styled-components";
import { AdminSectionWrapper } from "../../../../styled";
import { Child, TabBasic } from "../../../../../../components/tabs/style";
import SummaryData from "../SummaryData";
import { ViewProfileBtnStyled } from "../../styled";

const TableHeaderButtonStyled = Styled(Button)`
  background: #F7F9FA;
  color: #1D429C;
  font-weight: 700;
  border: 0;

  &:hover {
    background: #F7F9FA;
    color: #1D429C;
    border-color: #F7F9FA;
  }

  svg {
    margin-left: 25px
  }
`;

const generateTableTitle = title => {
  const template = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{title}</span>
      <Dropdown overlay={menu}>
        <TableHeaderButtonStyled type="ghost" size="middle">
          Past Month <ArrowDown />
        </TableHeaderButtonStyled>
      </Dropdown>
    </div>
  );

  return template;
};

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
    <span>Business Advisory and Consulting organizations</span>
    <Dropdown overlay={menu}>
      <TableHeaderButtonStyled type="ghost" size="middle">
        Past Month <ArrowDown />
      </TableHeaderButtonStyled>
    </Dropdown>
  </div>
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
    dataIndex: "ceo_name",
    key: "ceo_name",
    render: text => (
      <Space size="middle" style={{ display: "flex", alignItems: "center" }}>
        <>
          <p
            className="img_placeholder"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50px",
              background: "#e6e6e6",
              // marginRight: "10px",
              marginBottom: 0,
            }}
          ></p>
          <span>{text}</span>
        </>
      </Space>
    ),
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
  {
    title: "Market Cap",
    dataIndex: "market_cap",
    key: "market_cap",
  },
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

const Segment = ({
  match: {
    params: { name },
  },
  business,
}) => {
  let counter = 0;

  const { segments } = business;

  let pageHeader = name.split("_").join(" ");

  const currSegment = segments.filter(
    segment =>
      segment.name
        .split(" ")
        .join("_")
        .toLowerCase() === name
  );

  const tabData =
    currSegment.length &&
    currSegment[0].sub_class.map((subecosystem, key) => {
      return {
        id: key,
        title: subecosystem.name,
        tabTitle: subecosystem.name,
        content: (
          <Fragment>
            {subecosystem.sub_class.length
              ? subecosystem.sub_class.map((subclass, key) => (
                  <Row key={key} gutter={15} style={{ marginTop: "2rem" }}>
                    <Col xs={24}>
                      <Cards
                        title={generateTableTitle(subclass)}
                        more={content}
                      >
                        <Table
                          className="table-responsive"
                          pagination={false}
                          dataSource={business.organization.map((org, key) => {
                            return {
                              key: key,
                              rank: key + 1,
                              company: org.name,
                              ceo_name: org.ceo_name,
                              state: org.state,
                              sectors: org.sector,
                              market_cap: org.market_cap,
                              employees: org.num_of_employees,
                              funding: org.funding,
                            };
                          })}
                          columns={columns}
                        />
                      </Cards>
                    </Col>
                  </Row>
                ))
              : null}

            <Row gutter={15} style={{ marginTop: "2rem" }}>
              <Col xs={24}>
                <Cards
                  title={generateTableTitle(subecosystem.name)}
                  more={content}
                >
                  <Table
                    className="table-responsive"
                    pagination={false}
                    dataSource={business.organization.map((org, key) => {
                      return {
                        key: key,
                        rank: key + 1,
                        company: org.name,
                        ceo_name: org.ceo_name,
                        state: org.state,
                        sectors: org.sector,
                        market_cap: org.market_cap,
                        employees: org.num_of_employees,
                        funding: org.funding,
                      };
                    })}
                    columns={columns}
                  />
                </Cards>
              </Col>
            </Row>
          </Fragment>
        ),
      };
    });

  // const currentEcosystem = business.ecosystem.filter(
  //   eco =>
  //     eco.name
  //       .split(" ")
  //       .join("_")
  //       .toLowerCase() === name
  // );

  // const { sub_ecosystem } = currentEcosystem.length && currentEcosystem[0];

  // const tabData = sub_ecosystem.map(subecosystem => {
  //   return {
  //     id: subecosystem.id,
  //     title: subecosystem.name,
  //     tabTitle: subecosystem.name,
  //     content: (
  //       <Row gutter={15} style={{ marginTop: "2rem" }}>
  //         <Col xs={24}>
  //           <Cards title={tableHeader} more={content}>
  //             <Table
  //               className="table-responsive"
  //               pagination={false}
  //               dataSource={business.organization.map((org, key) => {
  //                 return {
  //                   key: key,
  //                   rank: key + 1,
  //                   company: org.name,
  //                   ceo_name: org.ceo_name,
  //                   state: org.state,
  //                   sectors: org.sector,
  //                   market_cap: org.market_cap,
  //                   employees: org.num_of_employees,
  //                   funding: org.funding,
  //                 };
  //               })}
  //               columns={columns}
  //             />
  //           </Cards>
  //         </Col>
  //       </Row>
  //     ),
  //   };
  // });

  // const data = [
  //   {
  //     id: 1,
  //     title: "Business Advisory",
  //     tabTitle: "Business Advisory",
  //     content: (
  //       <Row gutter={15}>
  //         <Col xs={24}>
  //           <Cards title={tableHeader} more={content}>
  //             <Table
  //               className="table-responsive"
  //               pagination={false}
  //               dataSource={dataSource}
  //               columns={columns}
  //             />
  //           </Cards>
  //         </Col>
  //       </Row>
  //     ),
  //   },
  // ];

  return (
    <AdminSectionWrapper>
      <Row gutter={25}>
        <Col span={24}>
          <TabBasic defaultActiveKey="1" tabPosition={"top"}>
            {tabData.map(item => {
              const { content: tabContent, tabTitle } = item;
              counter += 1;
              return (
                <Child tab={tabTitle} key={counter}>
                  {/* <h2>{title}</h2>
                  <p>{content}</p> */}

                  <div>
                    <PageHeader
                      title={
                        <div>
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "0",
                              textTransform: "capitalize",
                            }}
                          >
                            <BusinessSupportIcon
                              style={{ marginRight: "15px" }}
                            />{" "}
                            {pageHeader}
                          </p>
                        </div>
                      }
                      buttons={[
                        <div key="1" className="page-header-actions">
                          <Button size="large" type="primary">
                            <NavLink to="/business">List Your Business</NavLink>
                          </Button>

                          {pageHeader === "Funding" && (
                            <Button size="large" type="primary">
                              View Businesses
                            </Button>
                          )}
                        </div>,
                      ]}
                      style={{ paddingLeft: 0, paddingRight: 0 }}
                    />

                    <SummaryData business={business} />
                  </div>

                  {tabContent}
                </Child>
              );
            })}
          </TabBasic>
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

const mapStateToProps = state => ({
  business: state.business,
});

export default connect(mapStateToProps, null)(Segment);
