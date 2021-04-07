import React, { Fragment, FC } from "react";
import { Button, Dropdown, Row, Spin, Menu, Col, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../../../components/page-headers/page-headers";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { NavLink } from "react-router-dom";
import Styled from "styled-components";
import { AdminSectionWrapper } from "../../../../styled";
import { Child, TabBasic } from "../../../../../../components/tabs/style";
import SummaryData from "../SummaryData";
import { capitalize, generateIcons } from "../../functions";
import { createDataSource, createTableColumns } from "../../../helpers";
import { useEcosystemContext } from "../../../../../../context";
import { SpinnerStyled } from "../../../../../Styles";

const LoadingSpinner = <LoadingOutlined style={{ fontSize: 50 }} spin />;

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

// const tableHeader = (
//   <div style={{ display: "flex", justifyContent: "space-between" }}>
//     <span>Business Advisory and Consulting organizations</span>
//     <Dropdown overlay={menu}>
//       <TableHeaderButtonStyled type="ghost" size="middle">
//         Past Month <ArrowDown />
//       </TableHeaderButtonStyled>
//     </Dropdown>
//   </div>
// );

const SegmentScreen: FC<{ match?: any }> = ({
  match: {
    params: { name },
  },
}) => {
  let counter = 0;

  const {
    data: ecosystems,
    isLoading: isEcosystemLoading,
  } = useEcosystemContext();

  let pageHeader = name.split("_").join(" ");

  const currEcosystem = ecosystems.filter(
    segment =>
      segment.name
        .split(" ")
        .join("_")
        .toLowerCase() === name
  );

  console.log(currEcosystem);

  const ecosystemTabData =
    currEcosystem.length &&
    currEcosystem[0].sub_ecosystem
      .filter(subEco => subEco.name)
      .filter(subEco => subEco.name !== "Churches/Mosques")
      .map(subEco => {
        return {
          id: subEco.id,
          title: subEco.name,
          tabTitle: subEco.name,
          content: (
            <Fragment>
              <Row key="key" gutter={15} style={{ marginTop: "2rem" }}>
                <Col xs={24}>
                  <Cards title={generateTableTitle(subEco.name)}>
                    <Table
                      className="table-responsive"
                      dataSource={createDataSource(subEco.organizations)}
                      columns={createTableColumns()}
                    />
                  </Cards>
                </Col>
              </Row>

              {/* {subEco.sub_class.length ? (
                subEco.sub_class.map(subclass => (
                  <Row key="key" gutter={15} style={{ marginTop: "2rem" }}>
                    <Col xs={24}>
                      <Cards
                        title={generateTableTitle(subclass.name)}
                        more={content}
                      >
                        <Table
                          className="table-responsive"
                          dataSource={createDataSource(subclass.organizations)}
                          columns={createTableColumns()}
                        />
                      </Cards>
                    </Col>
                  </Row>
                ))
              ) : (
                <Row key="key" gutter={15} style={{ marginTop: "2rem" }}>
                  <Col xs={24}>
                    <Cards title={generateTableTitle("")} more={""}>
                      <Table
                        className="table-responsive"
                        dataSource={createDataSource([])}
                        columns={createTableColumns()}
                      />
                    </Cards>
                  </Col>
                </Row>
              )} */}
            </Fragment>
          ),
        };
      });

  return (
    <AdminSectionWrapper className="ecosystem-segments">
      <Row gutter={25}>
        <Col span={24}>
          {isEcosystemLoading ? (
            <SpinnerStyled>
              <Spin indicator={LoadingSpinner} />
            </SpinnerStyled>
          ) : (
            <TabBasic defaultActiveKey="1" tabPosition={"top"}>
              {ecosystemTabData.length &&
                ecosystemTabData.map(item => {
                  const { content: tabContent, tabTitle } = item;
                  counter += 1;
                  return (
                    <Child tab={tabTitle} key={counter}>
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
                                {generateIcons(capitalize(pageHeader), {
                                  marginRight: "15px",
                                })}{" "}
                                {pageHeader}
                              </p>
                            </div>
                          }
                          buttons={[
                            <div key="1" className="page-header-actions">
                              <Button size="large" type="primary">
                                <NavLink to="/business">
                                  List Your Business
                                </NavLink>
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

                        <SummaryData />
                      </div>

                      {tabContent}
                    </Child>
                  );
                })}
            </TabBasic>
          )}
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

export default SegmentScreen;
