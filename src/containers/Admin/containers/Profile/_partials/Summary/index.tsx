import React, { Fragment } from "react";
import { Row, Col } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { ViewProfileBtnStyled } from "../../../Dashboard/styled";
import { ReactComponent as UnknownAvatar } from "../../../../../../static/svg/unknownAvatar.svg";
// import cowrywise_small from "../../../../../../static/img/cowrywise_small.png";
// import john_doe from "../../../../../../static/img/john_doe.png";

const Summary = ({ selectedOrganization }) => {
  const cardsSummary = [
    {
      value: 12,
      content: "Total No of fintech companies in Lagos",
    },
    {
      value: 3,
      content: "Total No of Fintech companies in Sabo Yaba",
    },
    {
      value: 14,
      content: "Total No of Fintech companies in Nigeria",
    },
    {
      value: "₦8.5B",
      content: "Total Market Capitalization Fintech companies",
    },
  ];

  return (
    <Fragment>
      <Row>
        {/* =============== COMPANY NAME =================== */}
        <Col xs={24}>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={24} lg={14}>
              <Cards
                headless
                bodypadding="15px"
                style={{
                  height: "202px",
                }}
              >
                <div
                  className="company-name-wrapper"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <img src={cowrywise_small} alt="Cowrywise" /> */}
                  <div
                    className="company-image-wrapper"
                    style={{ width: "97px" }}
                  >
                    {selectedOrganization[0] &&
                    selectedOrganization[0].company_logo_url ? (
                      <img
                        src={selectedOrganization[0].company_logo_url}
                        alt="Company Logo"
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                      />
                    ) : (
                      <UnknownAvatar
                        className="img-placeholder"
                        style={{ width: "97px", height: "97px" }}
                      />
                    )}
                  </div>

                  <ViewProfileBtnStyled>Add to Favorites</ViewProfileBtnStyled>
                </div>

                <div>
                  <h2 className="font-weight-700">
                    {selectedOrganization[0] && selectedOrganization[0].name}
                  </h2>
                  <p style={{ marginBottom: 0 }}>
                    {selectedOrganization[0] &&
                      selectedOrganization[0].description}
                  </p>
                </div>
              </Cards>
            </Col>
            {/* =============== COMPANY NAME =================== */}

            {/* =============== COMPANY DETAILS =================== */}
            <Col xs={24} sm={24} md={12} lg={10}>
              <Cards
                style={{
                  height: "202px",
                }}
                title={
                  <div
                    className="company-founder-wrapper"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className="founder-image-wrapper"
                      style={{ width: "50px", height: "50px" }}
                    >
                      {selectedOrganization[0] &&
                      selectedOrganization[0].ceo_image_url ? (
                        <img
                          src={selectedOrganization[0].ceo_image_url}
                          alt="John Doe"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "50px",
                          }}
                        />
                      ) : (
                        <UnknownAvatar
                          className="img-placeholder"
                          style={{ width: "60px", height: "60px" }}
                        />
                      )}
                    </div>

                    <div
                      className="founder-name-wrapper"
                      style={{ marginLeft: "15px" }}
                    >
                      <span>
                        {selectedOrganization[0] &&
                          selectedOrganization[0].ceo_name}
                      </span>
                      <span>CEO/Founder</span>
                    </div>
                  </div>
                }
              >
                <Row>
                  <div className="profile-summary-data">
                    <div>
                      <span>Sector</span>
                      <span>
                        {selectedOrganization[0] &&
                          selectedOrganization[0].sector}
                      </span>
                    </div>

                    <div>
                      <span>Employees</span>
                      <span>
                        {selectedOrganization[0] &&
                          selectedOrganization[0].num_of_employees}
                      </span>
                    </div>

                    <div>
                      <span>State</span>
                      <span>
                        {selectedOrganization[0] &&
                          selectedOrganization[0].state}
                      </span>
                    </div>

                    <div>
                      <span>Headquarters</span>
                      <span>Nigeria</span>
                    </div>
                  </div>
                </Row>
              </Cards>
            </Col>
            {/* =============== COMPANY DETAILS =================== */}
          </Row>

          {/* =============== CARD SUMMARY =================== */}
          <Row gutter={[16, 8]}>
            {cardsSummary.map((card, key) => (
              <Col key={key} xs={24} sm={12} md={8} lg={6}>
                <Cards headless bodypadding="15px">
                  <p
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      marginBottom: "0px",
                    }}
                  >
                    {card.value}
                  </p>
                  <span>{card.content}</span>
                </Cards>
              </Col>
            ))}
          </Row>
          {/* =============== CARD SUMMARY =================== */}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Summary;
