import React, { Fragment, FC } from "react";
import { Button, Row, Spin, Col, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
// import { UserOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../../../components/page-headers/page-headers";
// import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { AdminSectionWrapper } from "../../../../styled";
import { Child, TabBasic } from "../../../../../../components/tabs/style";
import SummaryData from "../SummaryData";
import { capitalize, generateIcons } from "../../functions";
import { createDataSource, createTableColumns } from "../../../helpers";
import { useEcosystemContext } from "../../../../../../context";
import { SpinnerStyled } from "../../../../../Styles";
import { ISubclassProps } from "../../../../../../context/Ecosystem/types";

const LoadingSpinner = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const generateTableTitle = title => {
  const template = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{title}</span>
    </div>
  );

  return template;
};

const Segment: FC<RouteComponentProps<{ name: string }>> = ({
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

  // console.log(currEcosystem);

  const ecosystemTabData =
    currEcosystem.length &&
    currEcosystem[0].sub_ecosystem
      .filter(subEco => subEco.name)
      .filter(subEco => subEco.name !== "Churches/Mosques")
      .map(subEco => {
        const subClassList = [
          ...new Set(
            subEco.organizations.map(org => org.sub_ecosystem_sub_class)
          ),
        ].filter(a => a);

        const sub_class: ISubclassProps[] = subClassList.map(subClass => {
          let organizations = subEco.organizations.filter(
            org =>
              org.sub_ecosystem_sub_class.toLowerCase() ===
              subClass.toLowerCase()
          );

          return {
            name: subClass,
            organizations,
          };
        });

        // console.log({ subClassList, sub_class });

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

              {sub_class.length
                ? sub_class.map((subclass, idx) => (
                    <Row key={idx} gutter={15} style={{ marginTop: "2rem" }}>
                      <Col xs={24}>
                        <Cards title={generateTableTitle(subclass.name)}>
                          <Table
                            className="table-responsive"
                            dataSource={createDataSource(
                              subclass.organizations
                            )}
                            columns={createTableColumns()}
                          />
                        </Cards>
                      </Col>
                    </Row>
                  ))
                : null}
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

export default Segment;
