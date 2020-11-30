import React, { useContext, useState, useEffect } from "react";
import { Row } from "antd";
import { connect } from "react-redux";
import { MainColStyled } from "../AddCompany/styled";

import Heading from "../../../../components/heading/heading";
import { StepsStyled } from "../ListOrganization/styled";
import { ButtonStyled } from "../../../Styles";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { BusinessContext } from "../../context";
import { addOrganization } from "../../../../redux/actions/businessActions";
import { numberWithCommas } from "../../../../utils/helpers";
import api from "../../../../config/api";

const { Step } = StepsStyled;

const Preview = ({ history, addOrganization, auth: { user } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ecosystem, setEcosystem] = useState([]);
  const [selectedEcosystem, setSelectedEcosystem] = useState([]);
  const [selectedSubEcosystem, setSelectedSubEcosystem] = useState([]);

  const customDot = (dot: any) => dot;

  const { state } = useContext(BusinessContext);

  const {
    business_type,
    name,
    ceo_name,
    ceo_image,
    comapany_logo,
    address,
    state: organization_state,
    ecosystem: ecosystemId,
    sub_ecosystem,
    sub_ecosystem_sub_class,
    sub_segment: subSegmentId,
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

  useEffect(() => {
    const getEcosystem = async () => {
      const res = await api.business.getEcosystem();

      if (res && res.status === 200) {
        const { data } = res.data;

        setEcosystem(data);

        let selectedecosystem = data.filter(eco => eco.id === ecosystemId);

        let selectedSubEcosystem =
          selectedecosystem.length &&
          selectedecosystem[0].sub_ecosystem.filter(
            sub_eco => sub_eco.id === subSegmentId
          );

        setSelectedEcosystem(selectedecosystem);
        setSelectedSubEcosystem(selectedSubEcosystem);
      }
    };

    getEcosystem();
  }, [state, ecosystem, ecosystemId, subSegmentId, selectedEcosystem]);

  const handleSubmit = async () => {
    setIsLoading(true);

    const data = { ...state, user: user.id };
    console.log(data);

    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    addOrganization(formData)
      .then(res => {
        setIsLoading(false);
        if (res && res.status === 201) {
          history.push("/business/success");
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
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
                  {name}
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
                    <strong>Ecosystem Segment:</strong>
                    <br />
                    {selectedEcosystem.length > 0 && selectedEcosystem[0].name}
                  </p>
                )}

                {business_type === "Ecosystem Enabler" && (
                  <p>
                    <strong>Sub-Segement of Ecosystem:</strong>
                    <br />
                    {selectedSubEcosystem.length &&
                      selectedSubEcosystem[0].name}
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
                    {numberWithCommas(company_valuation)}
                  </p>
                )}

                {business_type === "Ecosystem Enabler" && (
                  <p>
                    <strong>
                      Number of businesses supported over the last 5 years:
                    </strong>
                    <br />
                    {num_supported_business}
                  </p>
                )}

                {
                  <p>
                    <strong>Funding:</strong>
                    <br />
                    {numberWithCommas(funding)}
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

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addOrganization })(Preview);
