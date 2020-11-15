import React, { FunctionComponent } from "react";
import { Row } from "antd";
import { SectionWrapper } from "../../../Styles";
import { MainColStyled } from "../AddCompany/styled";
import Heading from "../../../../components/heading/heading";
import { StepsStyled } from "../ListOrganization/styled";
import { ButtonStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";

const { Step } = StepsStyled;

const Preview: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const customDot = (dot: any) => dot;

  return (
    <SectionWrapper className="preview-section">
      <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
        <MainColStyled>
          <div style={{ marginBottom: "1.5rem" }}>
            <div>
              <Heading className="text-center font-weight-700" as="h3">
                List your Organization <br /> (Enterpreneur)
              </Heading>

              <StepsStyled
                labelPlacement="vertical"
                current={0}
                progressDot={customDot}
              >
                <Step description="Details" />
                <Step description="Upload" />
                <Step description="Finish" />
              </StepsStyled>
            </div>

            <div className="preview-info">
              <p>
                <strong>Business Kind:</strong>
                <br />
                Business Support, Mentoring
              </p>

              <p>
                <strong>Business Name:</strong>
                <br />
                Metaphysics
              </p>

              <p>
                <strong>Business Address:</strong>
                <br />
                44, Ilesanmi Road, Yaba, Yaba LGA, Lagos
              </p>

              <p>
                <strong>Website Address:</strong>
                <br />
                www.metaphysics.com
              </p>

              <p>
                <strong>Funding Type:</strong>
                <br />
                Series A
              </p>

              <p>
                <strong>Year Established:</strong>
                <br />
                2010
              </p>

              <p>
                <strong>
                  Number of businesses supported over the last 5 years:
                </strong>
                <br />
                200
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
              </p>

              <p>
                <strong>Uploads:</strong>
                <br />
                CAC Document.Pdf
              </p>
            </div>

            <ButtonStyled
              size="large"
              htmlType="submit"
              type="primary"
              onClick={() => history.push("/business/success")}
            >
              Submit
            </ButtonStyled>
          </div>
        </MainColStyled>
      </Row>
    </SectionWrapper>
  );
};

export default Preview;
