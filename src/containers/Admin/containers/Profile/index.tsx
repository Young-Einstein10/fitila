import React from "react";
import { Row, Col } from "antd";
import { Main } from "../../../AuthLayout/styled";
import { AdminSectionWrapper } from "../../styled";
import { Child, TabBasic } from "../../../../components/tabs/style";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import cowrywise_small from "../../../../static/img/cowrywise_small.png";
import john_doe from "../../../../static/img/john_doe.png";
import SimilarCompanies from "./_partials/SimilarCompanies";
import Revenue from "./_partials/Revenue";
import Ratings from "./_partials/Ratings";
import PressReleases from "./_partials/PressReleases";
import Funding from "./_partials/Funding";
import SocialMedia from "./_partials/SocialMedia";
import Contact from "./_partials/Contact";
import { ViewProfileBtnStyled } from "../Dashboard/styled";
import { RowStyled } from "./styled";

const data = [
  {
    id: 1,
    title: "Summary",
    tabTitle: "Summary",
    content: (
      <Row>
        <Col xs={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={14}>
              <Cards headless bodypadding="15px">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img src={cowrywise_small} alt="Cowrywise" />

                  <ViewProfileBtnStyled>Add to Favorites</ViewProfileBtnStyled>
                </div>

                <div>
                  <h2 className="font-weight-700">Cowrywise</h2>
                  <p style={{ marginBottom: 0 }}>
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

            <Col xs={24} sm={24} md={12} lg={10}>
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
                  <Col className="profile-summary-data" span={12}>
                    <span>Sector</span>
                    <span>Annual Revenue</span>
                    <span>Market Cap</span>
                    <span>Employees</span>
                    <span>State</span>
                    <span>Headquarters</span>
                  </Col>
                  <Col className="profile-summary-data" span={12}>
                    <span>Fintech, Technology, Money</span>
                    <span>N380.7M</span>
                    <span>N30.7B</span>
                    <span>34</span>
                    <span>Lagos</span>
                    <span>Lagos Nigeria. Yaba</span>
                  </Col>
                </Row>
              </Cards>
            </Col>
          </Row>

          <Row gutter={[16, 8]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Cards headless bodypadding="15px">
                <p
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  12
                </p>
                <span>Total No of fintech companies in Lagos</span>
              </Cards>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {" "}
              <Cards headless bodypadding="15px">
                <p
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  3
                </p>
                <span>Total No of Fintech companies in Sabo Yaba</span>
              </Cards>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {" "}
              <Cards headless bodypadding="15px">
                <p
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  14
                </p>
                <span>Total No of Fintech companies in Nigeria</span>
              </Cards>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {" "}
              <Cards headless bodypadding="15px">
                <p
                  style={{
                    fontSize: "48px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  ₦8.5B
                </p>
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
    content: <Revenue />,
  },
  {
    id: 3,
    title: "Funding",
    tabTitle: "Funding",
    content: <Funding />,
  },
  {
    id: 3,
    title: "Press Releases",
    tabTitle: "Press Releases",
    content: <PressReleases />,
  },
  {
    id: 3,
    title: "Social Media",
    tabTitle: "Social Media",
    content: <SocialMedia />,
  },
  {
    id: 3,
    title: "Ratings",
    tabTitle: "Ratings",
    content: <Ratings />,
  },
  {
    id: 3,
    title: "Contact",
    tabTitle: "Contact",
    content: <Contact />,
  },
];

const Profile = () => {
  let counter = 0;

  return (
    <AdminSectionWrapper className="company-profile">
      <RowStyled className="company-profile-row" gutter={25}>
        <Col span={24}>
          <TabBasic defaultActiveKey="1" tabPosition={"top"}>
            {data.map(item => {
              const { content: tabContent, tabTitle } = item;
              counter += 1;
              return (
                <Child tab={tabTitle} key={counter}>
                  <Main
                    className="main-content"
                    style={{ padding: "0" }}
                    background="#e5e5e5"
                  >
                    {tabContent}
                  </Main>
                </Child>
              );
            })}
          </TabBasic>
        </Col>
      </RowStyled>
    </AdminSectionWrapper>
  );
};

export default Profile;
