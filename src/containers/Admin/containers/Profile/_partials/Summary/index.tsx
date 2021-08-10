import React, { FC, Fragment } from "react";
import { Row, Col } from "antd";
import { ReactComponent as UnknownAvatar } from "../../../../../../static/svg/unknownAvatar.svg";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import { RowStyled, StyledCompanyLogo } from "./styled";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";

interface ISummaryProps {
  selectedOrganization: IOrganizationProps[];
  isLoading: boolean;
}

const Summary: FC<ISummaryProps> = ({ selectedOrganization, isLoading }) => {
  const ceo_name_label =
    selectedOrganization.length && selectedOrganization[0].is_entrepreneur
      ? "CEO/Founder's Name"
      : "CEO/DG/Head/Founder's Name";

  return (
    <Fragment>
      <Row gutter={16}>
        {/* =============== COMPANY NAME =================== */}
        <Col xs={24} sm={24} md={24} lg={24}>
          {
            <Cards
              className="card-exception"
              bgcolor="rgba(100, 141, 236, 0.37)"
              loading={isLoading}
              headless
              bodypadding="15px"
            >
              <StyledCompanyLogo>
                <div className="company-image-wrapper">
                  {selectedOrganization[0] &&
                  selectedOrganization[0].company_logo_url ? (
                    <img
                      src={selectedOrganization[0].company_logo_url}
                      alt="Company Logo"
                    />
                  ) : (
                    <UnknownAvatar className="img-placeholder" />
                  )}
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
              </StyledCompanyLogo>
            </Cards>
          }
        </Col>
        {/* =============== COMPANY NAME =================== */}

        {/* =============== COMPANY DETAILS =================== */}
        <Col xs={24} sm={24} md={24} lg={24}>
          {
            <Cards
              className="card-exception"
              bgcolor="rgba(192, 233, 255, 0.52)"
              loading={isLoading}
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
                    style={{ marginLeft: "2rem" }}
                  >
                    <p style={{ marginBottom: 0 }}>
                      {selectedOrganization[0] &&
                        selectedOrganization[0].ceo_name}
                    </p>
                    <span>{ceo_name_label}</span>
                  </div>
                </div>
              }
            >
              <RowStyled>
                <div className="profile-summary-data">
                  <div>
                    <span>Business Level</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].business_level) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>Funding</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].funding) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>Startup</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].is_startup) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>Number of Supported Businesses</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].num_supported_business) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>Sector</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].sector_name) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>Employees</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].num_of_employees) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>State</span>
                    <span>
                      {(selectedOrganization[0] &&
                        selectedOrganization[0].state) ||
                        "--"}
                    </span>
                  </div>

                  <div>
                    <span>Headquarters</span>
                    <span>Nigeria</span>
                  </div>
                </div>
              </RowStyled>
            </Cards>
          }
        </Col>
        {/* =============== COMPANY DETAILS =================== */}
      </Row>
    </Fragment>
  );
};

export default Summary;
