import React from "react";
import { Button, Row, Col } from "antd";
import { SectionWrapper } from "../../../Styles";
import Heading from "../../../../components/heading/heading";
import Styled from "styled-components";

const FooterStyled = Styled(Button)`
  color: ${({ theme }) => theme["dark-color"]};
  font-size: 16px;
`;

const Success = () => {
  return (
    <SectionWrapper>
      <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
        <Col className="text-center" style={{ maxWidth: "600px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <Heading className="font-weight-700" as="h1">
              Thank You!
            </Heading>

            <p>
              Turpis blandit convallis faucibus odio lobortis auctor cursus.
              Scelerisque libero dictum ut velit metus etiam nunc tincidunt
              quis. we’ll get back to you via the email you provided
            </p>
          </div>

          <FooterStyled className="font-weight-700" type="link" href="/">
            Go Back Home
          </FooterStyled>
        </Col>
      </Row>
    </SectionWrapper>
  );
};

export default Success;
