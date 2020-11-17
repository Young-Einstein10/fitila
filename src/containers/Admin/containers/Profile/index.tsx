import React from "react";
import { Button, Row, Col } from "antd";
import { PageHeader } from "../../../../components/page-headers/page-headers";
import { ReactComponent as FundingIcon } from "../../../../static/svg/funding.svg";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { Child, TabBasic } from "../../../../components/tabs/style";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import cowrywise_small from "../../../../static/img/cowrywise_small.png";
import john_doe from "../../../../static/img/john_doe.png";
import SimilarCompanies from "./_partials/SimilarCompanies";

const data = [
  {
    id: 1,
    title: "Summary",
    tabTitle: "Summary",
    content: (
      <Row gutter={15}>
        <Col xs={24}>
          <Row gutter={16}>
            <Col span={14}>
              <Cards headless>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img src={cowrywise_small} alt="Cowrywise" />

                  <Button>Add to Favorites</Button>
                </div>

                <div>
                  <h2>Cowrywise</h2>
                  <p>
                    Volutpat ultrices adipiscing fames blandit sed est pharetra,
                    sit semper. Suspendisse turpis elementum tellus orci
                    sollicitudin. Augue ultricies posuere maecenas vitae
                    bibendum lorem elementum, adipiscing. Morbi sollicitudin
                    lobortis massa egestas leo. Lacus iaculis neque dignissim
                    tempor eu tempor.
                  </p>
                </div>
              </Cards>
            </Col>
            <Col span={10}>
              <Cards
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <img src={john_doe} alt="John Doe" />
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                      <span style={{ display: "block" }}>John Doe Adams</span>
                      <span style={{ display: "block" }}>CEO/Founder</span>
                    </div>
                  </div>
                }
              >
                <Row>
                  <Col span={12}>
                    <span style={{ display: "block" }}>Sector</span>
                    <span style={{ display: "block" }}>Annual Revenue</span>
                    <span style={{ display: "block" }}>Market Cap</span>
                    <span style={{ display: "block" }}>Employees</span>
                    <span style={{ display: "block" }}>State</span>
                    <span style={{ display: "block" }}>Headquarters</span>
                  </Col>
                  <Col span={12}>
                    <span style={{ display: "block" }}>
                      Fintech, Technology, Money
                    </span>
                    <span style={{ display: "block" }}>N380.7M</span>
                    <span style={{ display: "block" }}>N30.7B</span>
                    <span style={{ display: "block" }}>34</span>
                    <span style={{ display: "block" }}>Lagos</span>
                    <span style={{ display: "block" }}>
                      Lagos Nigeria. Yaba
                    </span>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Cards headless>
                <p style={{ fontSize: "48px", marginBottom: "10px" }}>12</p>
                <span>Total No of fintech companies in Lagos</span>
              </Cards>
            </Col>
            <Col span={6}>
              {" "}
              <Cards headless>
                <p style={{ fontSize: "48px", marginBottom: "10px" }}>3</p>
                <span>Total No of Fintech companies in Sabo Yaba</span>
              </Cards>
            </Col>
            <Col span={6}>
              {" "}
              <Cards headless>
                <p style={{ fontSize: "48px", marginBottom: "10px" }}>14</p>
                <span>Total No of Fintech companies in Nigeria</span>
              </Cards>
            </Col>
            <Col span={6}>
              {" "}
              <Cards headless>
                <p style={{ fontSize: "48px", marginBottom: "10px" }}>₦8.5B</p>
                <span>Total Market Capitalization Fintech companies</span>
              </Cards>
            </Col>
          </Row>
        </Col>
      </Row>
    ),
  },
  {
    id: 2,
    title: "Similar Companies",
    tabTitle: "Similar Companies",
    content: <SimilarCompanies />,
  },
  {
    id: 3,
    title: "Revenue",
    tabTitle: "Revenue",
    // content: <Revenue />,
  },
  {
    id: 3,
    title: "Funding",
    tabTitle: "Funding",
    // content: <Funding />,
  },
  {
    id: 3,
    title: "Press Releases",
    tabTitle: "Press Releases",
    // content: <PressReleases />,
  },
  {
    id: 3,
    title: "Social Media",
    tabTitle: "Social Media",
    // content: <SocialMedia />,
  },
  {
    id: 3,
    title: "Ratings",
    tabTitle: "Ratings",
    // content: <Ratings />,
  },
  {
    id: 3,
    title: "Contact",
    tabTitle: "Contact",
    // content: <Contact />,
  },
];

const Profile = () => {
  let counter = 0;

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

export default Profile;
