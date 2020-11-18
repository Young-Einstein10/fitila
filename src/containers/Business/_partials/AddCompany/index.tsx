import React, { FC, useState } from "react";
import Heading from "../../../../components/heading/heading";
import { ReactComponent as Enterpreneur } from "../../../../static/svg/enterpreneur.svg";
import { ReactComponent as Ecosystem } from "../../../../static/svg/ecosystem.svg";
import { ReactComponent as EcosystemColored } from "../../../../static/svg/ecosystemcolored.svg";

import { SectionWrapper } from "../../../Styles";
import { Col, Row } from "antd";
import { ColStyled, SpanStyled, SpanFooter } from "./styled";
import { ButtonStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";

const AddCompany: FC<RouteComponentProps> = ({ history }) => {
  const [isEnterpreneurActive, setIsEnterpreneurActive] = useState("");
  const [isEcosystemActive, setIsEcosystemActive] = useState("");

  return (
    <SectionWrapper>
      <Row
        className="add_company_container"
        style={{ justifyContent: "center", paddingTop: "3rem" }}
      >
        <Col className="text-center" style={{ maxWidth: "400px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div className="text-center" style={{ marginBottom: "2rem" }}>
              <Heading className="text-center" as="h3">
                List your Organization
              </Heading>
              <p>
                Thanks for choosing to list your Business on Enterprise Data
                Map, Please select a role to get started
              </p>
            </div>

            <Row>
              <ColStyled span={12} className="text-center">
                <SpanStyled
                  onClick={() => {
                    setIsEcosystemActive("");
                    setIsEnterpreneurActive("enterpreneur");
                  }}
                  className={`enterpreneur ${isEnterpreneurActive ===
                    "enterpreneur" && "active"}`}
                >
                  <Enterpreneur />
                </SpanStyled>
                <span style={{ marginTop: "15px" }}>I am an Enterpreneur</span>
              </ColStyled>

              <ColStyled span={12} className="text-center">
                <SpanStyled
                  className={`ecosystem ${isEcosystemActive === "ecosystem" &&
                    "active"}`}
                  // onMouseOver={() => setIsEcosystemActive(true)}
                  // onMouseOut={() => setIsEcosystemActive(false)}
                  onClick={() => {
                    setIsEnterpreneurActive("");

                    setIsEcosystemActive("ecosystem");
                  }}
                >
                  {isEcosystemActive ? <EcosystemColored /> : <Ecosystem />}
                </SpanStyled>
                <span style={{ marginTop: "15px" }}>
                  I am an Ecosystem Enabler
                </span>
              </ColStyled>
            </Row>
            <ButtonStyled
              onClick={() => history.push("/business/listorg")}
              size="large"
              type="primary"
              style={{ marginTop: "3rem" }}
            >
              Continue
            </ButtonStyled>
          </div>

          <SpanFooter>
            By Clicking “continue” you agree to our Terms and Conditions an
            Privacy policy.
          </SpanFooter>
        </Col>
      </Row>
    </SectionWrapper>
  );
};

export default AddCompany;
