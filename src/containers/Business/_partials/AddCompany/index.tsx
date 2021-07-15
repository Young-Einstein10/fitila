import React, { FC, useContext, useState } from "react";
import Heading from "../../../../components/heading/heading";
import { ReactComponent as Enterpreneur } from "../../../../static/svg/enterpreneur.svg";
import { ReactComponent as Ecosystem } from "../../../../static/svg/ecosystem.svg";
// import { ReactComponent as EcosystemColored } from "../../../../static/svg/ecosystemcolored.svg";
import { EcosystemColored } from "../../../../components/svgs";

import { Col, Row, Tooltip } from "antd";
import { ColStyled, SpanStyled, SpanFooter } from "./styled";
import { ButtonStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";
import { BusinessContext } from "../../context";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";

const AddCompany: FC<RouteComponentProps> = ({ history }) => {
  const [isEnterpreneurActive, setIsEnterpreneurActive] = useState("");
  const [isEcosystemActive, setIsEcosystemActive] = useState("");

  const { state, setState } = useContext(BusinessContext);

  return (
    <AdminSectionWrapper className="section-add-business" background="#fff">
      <Main background="#fff">
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
                  <Tooltip
                    title="You are currently running a registered business"
                    placement="left"
                  >
                    <SpanStyled
                      onClick={() => {
                        setIsEcosystemActive("");
                        setIsEnterpreneurActive("enterpreneur");
                        setState({
                          ...state,
                          business_type: "Enterpreneur",
                          is_enterpreneur: true,
                          is_ecosystem: false,
                        });
                      }}
                      className={`enterpreneur ${isEnterpreneurActive ===
                        "enterpreneur" && "active"}`}
                    >
                      <Enterpreneur />
                    </SpanStyled>
                  </Tooltip>
                  <span style={{ marginTop: "15px" }}>
                    I am an Enterpreneur
                  </span>
                </ColStyled>

                <ColStyled span={12} className="text-center">
                  <Tooltip
                    title=" You provide support to businesses around training, funding, business support, policy & regulation, market access, resources, research & development "
                    placement="right"
                  >
                    <SpanStyled
                      className={`ecosystem ${isEcosystemActive ===
                        "ecosystem" && "active"}`}
                      // onMouseOver={() => setIsEcosystemActive(true)}
                      // onMouseOut={() => setIsEcosystemActive(false)}
                      onClick={() => {
                        setIsEnterpreneurActive("");

                        setIsEcosystemActive("ecosystem");
                        setState({
                          ...state,
                          business_type: "Ecosystem Enabler",
                          is_ecosytem: true,
                          is_enterpreneur: false,
                        });
                      }}
                    >
                      {isEcosystemActive ? <EcosystemColored /> : <Ecosystem />}
                    </SpanStyled>
                  </Tooltip>
                  <span style={{ marginTop: "15px" }}>
                    I am an Ecosystem Player
                  </span>
                </ColStyled>
              </Row>

              <ButtonStyled
                onClick={() => history.push("/business/listorg")}
                size="large"
                type="primary"
                style={{ marginTop: "3rem" }}
                disabled={!isEnterpreneurActive && !isEcosystemActive && true}
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
      </Main>
    </AdminSectionWrapper>
  );
};

export default AddCompany;
