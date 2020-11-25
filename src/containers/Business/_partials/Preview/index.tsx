import React, { FunctionComponent, useContext, useState } from "react";
import { Row, Form, notification } from "antd";
import { connect } from "react-redux";
import { SectionWrapper } from "../../../Styles";
import { MainColStyled } from "../AddCompany/styled";
import { WithBusinessProvider } from "../../index";

import Heading from "../../../../components/heading/heading";
import { StepsStyled } from "../ListOrganization/styled";
import { ButtonStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { BusinessContext } from "../../context";
import api from "../../../../config/api";
import { addOrganization } from "../../../../redux/actions/businessActions";

const { Step } = StepsStyled;

const Preview = ({ history, addOrganization }) => {
  const [isLoading, setIsLoading] = useState(false);
  const customDot = (dot: any) => dot;

  const { state } = useContext(BusinessContext);

  const {
    business_type,
    organization_name,
    ceo_name,
    address,
    state: organization_state,
    ecosystem,
    sub_ecosystem,
    sub_ecosystem_sub_class,
    sub_segment,
    business_sector,
    business_level,
    is_startup,
    company_valuation,
    funding,
    num_supported_business,
    num_of_employees,
    website,
    email,
    phone,
    facebook,
    instagram,
    linkedin,
    twitter,
    cac_doc,
  } = state;

  const handleSubmit = async () => {
    setIsLoading(true);

    addOrganization({
      ...state,
      // sub_ecosystem_sub_class: "Legal",
    })
      .then(res => {
        if (res && res.status === 201) {
          setIsLoading(false);

          history.push("/business/success");
        }
      })
      .catch(err => setIsLoading(false));

    const res = await api.business.addBusiness(state);

    console.log(res.data);
  };

  return (
    <AdminSectionWrapper className="preview-section" background="#fff">
      <Main background="#fff">
        <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
          <MainColStyled>
            <div style={{ marginBottom: "1.5rem" }}>
              <div>
                <Heading className="text-center font-weight-700" as="h3">
                  List your Organization <br /> ({business_type})
                </Heading>

                <StepsStyled
                  labelPlacement="vertical"
                  current={2}
                  progressDot={customDot}
                >
                  <Step description="Details" />
                  <Step description="Upload" />
                  <Step description="Finish" />
                </StepsStyled>
              </div>

              <div className="preview-info">
                <p>
                  <strong>Business Type:</strong>
                  <br />
                  {business_type}
                </p>

                {/* <p>
                  <strong>Business Kind:</strong>
                  <br />
                  Business Support, Mentoring
                </p> */}

                <p>
                  <strong>Organization Name:</strong>
                  <br />
                  {organization_name}
                </p>

                <p>
                  <strong>Founder's Name:</strong>
                  <br />
                  {ceo_name}
                </p>

                <p>
                  <strong>State:</strong>
                  <br />
                  {organization_state}
                </p>

                <p>
                  <strong>Business Address:</strong>
                  <br />
                  {address}
                </p>

                {business_type === "Ecosystem Enabler" && (
                  <p>
                    <strong>Ecosystem Segement:</strong>
                    <br />
                    {ecosystem}
                  </p>
                )}

                {/* {business_type === "Ecosystem Enabler" && (
                  <p>
                    <strong>Sub-Ecosystem:</strong>
                    <br />
                    {sub_ecosystem}
                  </p>
                )} */}

                {business_type === "Ecosystem Enabler" && (
                  <p>
                    <strong>Sub-Segement of Ecosystem:</strong>
                    <br />
                    {sub_segment}
                  </p>
                )}

                {business_type === "Enterpreneur" && (
                  <p>
                    <strong>Sector:</strong>
                    <br />
                    {business_sector}
                  </p>
                )}

                {business_type === "Enterpreneur" && (
                  <p>
                    <strong>Business Level:</strong>
                    <br />
                    {business_level}
                  </p>
                )}

                {business_type === "Enterpreneur" && (
                  <p>
                    <strong>Are You A StartUp:</strong>
                    <br />
                    {is_startup ? "Yes" : "No"}
                  </p>
                )}

                {business_type === "Enterpreneur" && is_startup && (
                  <p>
                    <strong>Company Valuation:</strong>
                    <br />
                    {company_valuation}
                  </p>
                )}

                <p>
                  <strong>
                    Number of businesses supported over the last 5 years:
                  </strong>
                  <br />
                  {num_supported_business}
                </p>

                {
                  <p>
                    <strong>Funding:</strong>
                    <br />
                    {funding}
                  </p>
                }

                <p>
                  <strong>CAC Registration Number:</strong>
                  <br />
                  {cac_doc}
                </p>

                <p>
                  <strong>Number of Employees:</strong>
                  <br />
                  {num_of_employees}
                </p>

                <p>
                  <strong>Website Address:</strong>
                  <br />
                  {website}
                </p>

                <p>
                  <strong>Email Address:</strong>
                  <br />
                  {email}
                </p>

                <p>
                  <strong>Phone Number:</strong>
                  <br />
                  {phone}
                </p>

                {facebook && (
                  <p>
                    <strong>Facebook Url:</strong>
                    <br />
                    {facebook}
                  </p>
                )}

                {linkedin && (
                  <p>
                    <strong>LinkedIn Url:</strong>
                    <br />
                    {linkedin}
                  </p>
                )}

                {instagram && (
                  <p>
                    <strong>Instagram Url:</strong>
                    <br />
                    {instagram}
                  </p>
                )}

                {twitter && (
                  <p>
                    <strong>Twitter Url:</strong>
                    <br />
                    {twitter}
                  </p>
                )}
                {/* <p>
                  <strong>Year Established:</strong>
                  <br />
                  2010
                </p>

                <p>
                  <strong>Valuation:</strong>
                  <br />
                  $30m
                </p>

                <p>
                  <strong>Investors:</strong>
                  <br />
                  Luminate, Bill & Melinda Gates, Ford
                </p> */}
              </div>

              <ButtonStyled
                size="large"
                htmlType="submit"
                type="primary"
                loading={isLoading}
                onClick={() => handleSubmit()}
              >
                Submit
              </ButtonStyled>
            </div>
          </MainColStyled>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default connect(null, { addOrganization })(Preview);
