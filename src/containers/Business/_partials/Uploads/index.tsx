import React, { FunctionComponent } from "react";
import { Row, Form } from "antd";
import { SectionWrapper } from "../../../Styles";
import { MainColStyled, SpanFooter } from "../AddCompany/styled";
import Heading from "../../../../components/heading/heading";
import { StepsStyled } from "../ListOrganization/styled";
import { ButtonStyled, InputStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";

const { Step } = StepsStyled;

const Uploads: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const customDot = (dot: any) => dot;

  return (
    <SectionWrapper className="business-uploads">
      <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
        <MainColStyled>
          <div style={{ marginBottom: "1.5rem" }}>
            <div>
              <Heading className="text-center font-weight-700" as="h3">
                List your Organization <br /> (Enterpreneur)
              </Heading>

              <StepsStyled
                labelPlacement="vertical"
                current={1}
                progressDot={customDot}
              >
                <Step description="Details" />
                <Step description="Upload" />
                <Step description="Finish" />
              </StepsStyled>
            </div>

            <Form className="text-center">
              <Form.Item name="other_info">
                <InputStyled.TextArea placeholder="Other Information" />
              </Form.Item>

              <Form.Item>
                <ButtonStyled
                  className=""
                  htmlType="submit"
                  type="primary"
                  size="large"
                  onClick={() => history.push("/business/preview")}
                >
                  Continue
                </ButtonStyled>
              </Form.Item>

              <SpanFooter>
                Please note, each upload cannot be larger than 20 MB, Document
                type allowed: PDF, Docx and Xcel
              </SpanFooter>
            </Form>
          </div>
        </MainColStyled>
      </Row>
    </SectionWrapper>
  );
};

export default Uploads;
