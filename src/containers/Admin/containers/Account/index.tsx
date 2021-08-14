import React, { FC } from "react";
import { Button, Row, Col } from "antd";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { Child, TabBasic } from "../../../../components/tabs/style";
import { Profile, Security } from "./_partials/Main";
import Activity from "./_partials/Activity";
import Favorites from "./_partials/Favorites";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { useAuthContext } from "../../../../context";

const Account: FC<RouteComponentProps> = () => {
  const {
    auth: { user },
  } = useAuthContext();

  let counter = 0;

  const data = [
    {
      id: 1,
      title: "Your Profile",
      tabTitle: "Your Profile",
      content: (
        <Row gutter={15}>
          <Col xs={24}>
            <Profile user={user} />

            <Security />

            {/* <ModifyAccount /> */}
          </Col>
        </Row>
      ),
    },
    {
      id: 2,
      title: "Activity",
      tabTitle: "Activity",
      content: <Activity />,
    },
    {
      id: 3,
      title: "Settings",
      tabTitle: "Settings",
      content: <Favorites />,
    },
  ];

  return (
    <AdminSectionWrapper>
      <Row gutter={25}>
        <Col span={24}>
          <TabBasic defaultActiveKey="1" tabPosition={"top"}>
            {data.map(item => {
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
                              fontWeight: "bold",
                              fontSize: "24px",
                            }}
                          >
                            Account
                          </p>
                        </div>
                      }
                      buttons={[
                        <div key="1" className="page-header-actions">
                          <Button size="large" type="primary">
                            <NavLink to="/business">List Your Business</NavLink>
                          </Button>
                        </div>,
                      ]}
                      style={{
                        padding: "0",
                        background: "none",
                      }}
                    />
                  </div>

                  <Main style={{ paddingRight: "0", paddingLeft: "0" }}>
                    {tabContent}
                  </Main>
                </Child>
              );
            })}
          </TabBasic>
        </Col>
      </Row>
    </AdminSectionWrapper>
  );
};

export default Account;
