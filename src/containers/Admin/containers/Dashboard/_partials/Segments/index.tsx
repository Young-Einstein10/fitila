import React, { Fragment, FC, ChangeEvent, useRef, useState } from "react";
import { Button, Row, Spin, Col, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PageHeader } from "../../../../../../components/page-headers/page-headers";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { NavLink, RouteComponentProps, useRouteMatch } from "react-router-dom";
import { AdminSectionWrapper } from "../../../../styled";
import { Child, TabBasic } from "../../../../../../components/tabs/style";
import SummaryData from "../SummaryData";
import { generateIcons } from "../../functions";
import { createDataSource, createTableColumns } from "../../../helpers";
import { useEcosystemContext } from "../../../../../../context";
import { SpinnerStyled } from "../../../../../Styles";
import {
  ISubclassProps,
  ISubEcosystem,
} from "../../../../../../context/Ecosystem/types";
import SearchInput from "../../../../../../components/searchInput";
import styled from "styled-components";

const LoadingSpinner = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const InfoBox = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  height: 60px;
  color: #fff;
  background-color: #0d79df;
  border: 2px solid #0d79df;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
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
    </div>
  );

  return template;
};

const Segment: FC<RouteComponentProps> = () => {
  const {
    params: { name },
  } = useRouteMatch<{ name: string }>();

  const [, setForceUpdate] = useState(Date.now());

  let counter = 0;

  const orgRef = useRef<{ organizations: any[]; name?: string }>({
    organizations: [],
  });

  const handleSearch = (
    e: ChangeEvent<HTMLInputElement>,
    data: ISubEcosystem
  ) => {
    // console.log(data);
    const filterValue = e.target.value.toLowerCase();

    const result = data.organizations.filter(org => {
      return Object.keys(org).some(
        key =>
          org[key] &&
          org[key]
            .toString()
            .toLowerCase()
            .includes(filterValue)
      );
    });

    orgRef.current = {
      organizations: result,
    };

    console.log(orgRef.current);

    setForceUpdate(Date.now());
  };

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
    currEcosystem.length > 0 &&
    currEcosystem[0].sub_ecosystem
      ?.filter(subEco => subEco.name)
      .filter(subEco => subEco.name !== "Churches/Mosques")
      .map(subEco => {
        const subClassList = [
          ...new Set(
            subEco.organizations.map(
              ({ sub_ecosystem_sub_class_name }) =>
                sub_ecosystem_sub_class_name && sub_ecosystem_sub_class_name
            )
          ),
        ].filter(a => a);

        // console.log({
        //   subClassList,
        //   subEco: subEco.organizations.filter(
        //     ({ sub_ecosystem_sub_class_name }) => sub_ecosystem_sub_class_name
        //   ),
        // });

        const sub_class: ISubclassProps[] = subClassList.map(subClass => {
          let organizations = subEco.organizations.filter(
            org =>
              org.sub_ecosystem_sub_class_name.toLowerCase() ===
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
                  <Cards
                    title={generateTableTitle(subEco.name)}
                    more={
                      <SearchInput onChange={e => handleSearch(e, subEco)} />
                    }
                  >
                    <Table
                      className="table-responsive"
                      dataSource={
                        orgRef.current?.organizations &&
                        orgRef.current?.organizations?.length
                          ? createDataSource(orgRef.current.organizations)
                          : createDataSource(subEco.organizations)
                      }
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
      <Row>
        <Col span={24}>
          {isEcosystemLoading ? (
            <SpinnerStyled>
              <Spin indicator={LoadingSpinner} />
            </SpinnerStyled>
          ) : (
            <TabBasic
              defaultActiveKey="1"
              tabPosition={"top"}
              onChange={() => window.scrollTo(0, 0)}
            >
              {ecosystemTabData?.length ? (
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
                                {generateIcons(pageHeader.toLowerCase())}{" "}
                                <span style={{ marginLeft: "15px" }}>
                                  {pageHeader}
                                </span>
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

                        <SummaryData currEcosystem={currEcosystem[0]} />
                      </div>

                      {tabContent}
                    </Child>
                  );
                })
              ) : (
                <InfoBox>Ecosystem has no sub-ecosystem.</InfoBox>
              )}
            </TabBasic>
          )}
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

export default Segment;
