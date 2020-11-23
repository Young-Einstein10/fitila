import React, { FunctionComponent, useContext } from "react";
import { Row, Form } from "antd";
import { MainColStyled } from "../AddCompany/styled";

import Heading from "../../../../components/heading/heading";
import { StepsStyled } from "../ListOrganization/styled";
import { ButtonStyled, InputStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { BusinessContext } from "../../context";

const { Step } = StepsStyled;

const Uploads: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const customDot = (dot: any) => dot;

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  const handleSubmit = values => {
    console.log(values);
    setState({ ...state, ...values });
    history.push("/business/preview");
  };

  return (
    <AdminSectionWrapper className="business-uploads" background="#fff">
      <Main background="#fff">
        <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
          <MainColStyled>
            <div style={{ marginBottom: "1.5rem" }}>
              <div>
                <Heading className="text-center font-weight-700" as="h3">
                  List your Organization <br /> ({state.business_type})
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

              <Form
                form={form}
                onFinish={handleSubmit}
                className="uploads"
                layout="vertical"
              >
                <Form.Item name="cac_doc">
                  <InputStyled placeholder="Business RC Number" />
                </Form.Item>

                <Form.Item name="gov_id">
                  <InputStyled placeholder="Government ID" />
                </Form.Item>

                <Form.Item name="other_info">
                  <InputStyled.TextArea placeholder="Other Information" />
                </Form.Item>

                <Form.Item>
                  <ButtonStyled
                    className=""
                    htmlType="submit"
                    type="primary"
                    size="large"
                    // onClick={() => history.push("/business/preview")}
                  >
                    Continue
                  </ButtonStyled>
                </Form.Item>
                {/* 
                <SpanFooter>
                  Please note, each upload cannot be larger than 20 MB, Document
                  type allowed: PDF, Docx and Xcel
                </SpanFooter> */}
              </Form>
            </div>
          </MainColStyled>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default Uploads;
