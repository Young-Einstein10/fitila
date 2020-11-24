import React, { useContext } from "react";
import { Button, Row, Col } from "antd";
import Heading from "../../../../components/heading/heading";
import Styled from "styled-components";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { BusinessContext } from "../../context";

const FooterStyled = Styled(Button)`
  color: ${({ theme }) => theme["dark-color"]};
  font-size: 16px;
`;

const Success = () => {
  const { state } = useContext(BusinessContext);

  return (
    <AdminSectionWrapper
      className="section-sdd-business-success"
      background="#fff"
    >
      <Main background="#fff">
        <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
          <Col className="text-center" style={{ maxWidth: "600px" }}>
            <div style={{ marginBottom: "2rem" }}>
              <Heading className="font-weight-700" as="h1">
                Thank You!
              </Heading>

              <p>
                {`Thank you for listing your ${
                  state.business_type === "Enterpreneur"
                    ? "Business"
                    : "Organization"
                } on the Enterprise Data Map. A confirmation link has been sent to your email. Please follow the link to complete this process.`}
              </p>
            </div>

            <FooterStyled className="font-weight-700" type="link" href="/">
              Go Back Home
            </FooterStyled>
          </Col>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default Success;
