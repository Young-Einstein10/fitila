import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
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
import { ReactComponent as UnknownAvatar } from "../../../../static/svg/unknownAvatar.svg";
import { RowStyled } from "./styled";

const Profile = ({ organization, match }) => {
  const { id: organizationId } = match.params;
  console.log("Organzaition", organizationId);

  const selectedorganization = organization.filter(
    org => org.id == organizationId
  );

  console.log("Slected Organzaition", selectedorganization);

  let counter = 0;

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
                    {/* <img src={cowrywise_small} alt="Cowrywise" /> */}
                    <div>
                      {selectedorganization[0] &&
                      selectedorganization[0].company_logo_url ? (
                        <img
                          src={selectedorganization[0].company_logo_url}
                          alt="Company Logo"
                        />
                      ) : (
                        <UnknownAvatar
                          style={{ width: "97px", height: "97px" }}
                        />
                      )}
                    </div>

                    <ViewProfileBtnStyled>
                      Add to Favorites
                    </ViewProfileBtnStyled>
                  </div>

                  <div>
                    <h2 className="font-weight-700">
                      {selectedorganization[0] && selectedorganization[0].name}
                    </h2>
                    <p style={{ marginBottom: 0 }}>
                      {selectedorganization[0] &&
                        selectedorganization[0].description}
                    </p>
                  </div>
                </Cards>
              </Col>

              <Col xs={24} sm={24} md={12} lg={10}>
                <Cards
                  title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div>
                        {selectedorganization[0] &&
                        selectedorganization[0].ceo_image_url ? (
                          <img
                            src={selectedorganization[0].ceo_image_url}
                            alt="John Doe"
                          />
                        ) : (
                          <UnknownAvatar
                            style={{ width: "60px", height: "60px" }}
                          />
                        )}
                      </div>
                      <div style={{ marginLeft: "15px" }}>
                        <span style={{ display: "block" }}>
                          {selectedorganization[0] &&
                            selectedorganization[0].ceo_name}
                        </span>
                        <span style={{ display: "block" }}>CEO/Founder</span>
                      </div>
                    </div>
                  }
                >
                  <Row>
                    <div className="profile-summary-data">
                      <div>
                        <span>Sector</span>
                        <span>
                          {selectedorganization[0] &&
                            selectedorganization[0].sector}
                        </span>
                      </div>

                      <div>
                        <span>Employees</span>
                        <span>
                          {selectedorganization[0] &&
                            selectedorganization[0].num_of_employees}
                        </span>
                      </div>

                      <div>
                        <span>State</span>
                        <span>
                          {selectedorganization[0] &&
                            selectedorganization[0].state}
                        </span>
                      </div>

                      <div>
                        <span>Headquarters</span>
                        <span>Nigeria</span>
                      </div>
                      {/* <span>Annual Revenue</span>
                      <span>Market Cap</span> */}
                    </div>
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
                  <Main className="main-content" style={{ padding: "0" }}>
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

const mapStateToProps = state => ({
  organization: state.business.organization,
});

export default connect(mapStateToProps, null)(Profile);
