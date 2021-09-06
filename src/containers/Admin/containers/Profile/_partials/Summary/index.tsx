import React, { FC, Fragment } from "react";
import { Row, Col } from "antd";
import { ReactComponent as UnknownAvatar } from "../../../../../../static/svg/unknownAvatar.svg";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import { RowStyled, StyledCompanyLogo } from "./styled";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import Heading from "../../../../../../components/heading/heading";
import { capitalize } from "../../../../../../utils/helpers";
import numberWithCommas from "../../../../../../utils/numberFormatter";

interface ISummaryProps {
  selectedOrganization: IOrganizationProps[];
  isLoading: boolean;
}

const Summary: FC<ISummaryProps> = ({ selectedOrganization, isLoading }) => {
  const ceo_name_label =
    selectedOrganization.length && selectedOrganization[0].is_entrepreneur
      ? "CEO/Founder's Name"
      : "CEO/DG/Head/Founder's Name";

  const {
    name,
    ceo_name,
    state,
    sector_name,
    num_of_employees,
    funding,
    funding_disbursed_for_support,
    address,
    business_level,
    ceo_gender,
    company_valuation,
    description,
    phone,
    num_supported_business,
    is_ecosystem,
    is_entrepreneur,
    is_startup,
    ecosystem_name,
    sub_ecosystem_name,
    sub_ecosystem_sub_class_name,
    cac_doc,
    linkedIn,
    twitter,
    facebook,
    website,
    date_created,
  } = selectedOrganization.length && selectedOrganization[0];

  return (
    <Fragment>
      <Row gutter={16}>
        {/* =============== COMPANY NAME =================== */}
        <Col xs={24} sm={24} md={24} lg={24}>
          {
            <Cards
              className="card-exception"
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
                  <Heading as="h1" fontSize="32px" className="font-weight-700">
                    {selectedOrganization[0] && selectedOrganization[0].name}
                  </Heading>
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
                    <p style={{ marginBottom: 0, fontSize: "24px" }}>
                      {selectedOrganization[0] &&
                        selectedOrganization[0].ceo_name}
                    </p>
                    <span style={{ fontSize: "12px" }}>{ceo_name_label}</span>
                  </div>
                </div>
              }
            >
              <RowStyled>
                <Col className="profile-summary-data" span={12}>
                  <p>
                    <strong>Company</strong>: {name || "--"}
                  </p>

                  <p>
                    <strong>Business Type</strong>:{" "}
                    {is_ecosystem ? "Ecosystem Player" : "Enterpreneur"}
                  </p>

                  <p>
                    <strong>Description</strong>: {description || "--"}
                  </p>

                  <p>
                    <strong>CEO/Founder</strong>:{" "}
                    {(ceo_name && ceo_name.name) || "--"}
                  </p>

                  <p>
                    <strong>Phone</strong> {phone || "--"}
                  </p>

                  {is_ecosystem && (
                    <>
                      {" "}
                      <p>
                        <strong>Ecosystem</strong>: {ecosystem_name || "--"}
                      </p>
                      <p>
                        <strong>Sub-Ecosystem</strong>:{" "}
                        {sub_ecosystem_name || "--"}
                      </p>
                      <p>
                        <strong>Sub-Ecosystem Sub-Class </strong>:{" "}
                        {sub_ecosystem_sub_class_name || "--"}
                      </p>{" "}
                    </>
                  )}

                  <p>
                    <strong>CEO Gender</strong>:{" "}
                    {capitalize(ceo_gender) || "--"}
                  </p>
                  <p>
                    <strong>Address</strong>: {address || "--"}
                  </p>

                  <p>
                    <strong>State</strong>: {state || "--"}
                  </p>

                  {is_entrepreneur && (
                    <p>
                      <strong>Business Level</strong>: {business_level || "--"}
                    </p>
                  )}

                  <p>
                    <strong>Company Valuation</strong>:{" "}
                    {numberWithCommas(company_valuation) || "--"}
                  </p>
                </Col>

                <Col className="profile-summary-data" span={12}>
                  <p>
                    <strong>Sector</strong>: {sector_name || "--"}
                  </p>

                  <p>
                    <strong>Employees</strong>: {num_of_employees || "--"}
                  </p>

                  <p>
                    <strong>Number of Supported Businesses</strong>:{" "}
                    {num_supported_business || "--"}
                  </p>

                  <p>
                    <strong>Funding (₦)</strong>:{" "}
                    {numberWithCommas(funding) || "--"}
                  </p>

                  {is_ecosystem && (
                    <p>
                      <strong>Funding Disbursed for Support Businesses</strong>:{" "}
                      {funding_disbursed_for_support || "--"}
                    </p>
                  )}

                  <p>
                    <strong>Business RC Number</strong>: {cac_doc || "--"}
                  </p>

                  <p>
                    <strong>LinkedIn</strong>:{" "}
                    {(linkedIn && (
                      <a
                        href={linkedIn}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {linkedIn}
                      </a>
                    )) ||
                      "--"}
                  </p>

                  <p>
                    <strong>Twitter</strong>:{" "}
                    {(twitter && (
                      <a
                        href={twitter}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {twitter}
                      </a>
                    )) ||
                      "--"}
                  </p>

                  <p>
                    <strong>Facebook</strong>:{" "}
                    {(facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {facebook}
                      </a>
                    )) ||
                      "--"}
                  </p>

                  <p>
                    <strong>Website</strong>:{" "}
                    {(website && (
                      <a
                        href={website}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {website}
                      </a>
                    )) ||
                      "--"}
                  </p>

                  <p>
                    <strong>Date Listed</strong>:{" "}
                    {new Date(date_created).toLocaleString() || "--"}
                  </p>
                </Col>
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
