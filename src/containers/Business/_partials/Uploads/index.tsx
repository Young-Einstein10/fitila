import React, { FunctionComponent, useContext, useState } from "react";
import { Row, Form, Select } from "antd";
import { MainColStyled } from "../AddCompany/styled";

import Heading from "../../../../components/heading/heading";
import { StepsStyled } from "../ListOrganization/styled";
import { ButtonStyled, InputStyled } from "../../../Styles";
import { RouteComponentProps } from "react-router-dom";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { BusinessContext } from "../../context";

const { Step } = StepsStyled;
const InputGroup = InputStyled.Group;
const Option = Select.Option;

const Uploads: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [num_of_employees_custom, setNum_of_employees_custom] = useState();

  const customDot = (dot: any) => dot;

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  const handleSubmit = values => {
    if (values.num_of_employees === "Above 1000") {
      values.num_of_employees = values.num_of_employees_custom;
    }
    console.log(values);
    setState({
      ...state,
      ...values,
      funding: `${values.currency}${values.currency_value}`,
    });
    history.push("/business/preview");
  };

  const onNumberOfEmployeesChange = value => {
    setNum_of_employees_custom(value);
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
                {/* <Form.Item name="cac_doc">
                  <InputStyled placeholder="Business RC Number" />
                </Form.Item> */}

                <Form.Item name="cac_doc">
                  <InputStyled placeholder="Business RC Number" />
                </Form.Item>

                <Form.Item name="num_of_employees">
                  <Select
                    placeholder="Number of Employees"
                    onChange={e => onNumberOfEmployeesChange(e)}
                    allowClear
                  >
                    <Option value="1-100">1-100</Option>
                    <Option value="101-200">101-200</Option>
                    <Option value="201-300">201-300</Option>
                    <Option value="301-400">301-400</Option>
                    <Option value="401-500">401-500</Option>
                    <Option value="501-600">501-1000</Option>
                    <Option value="Above 1000">Above 1000</Option>
                  </Select>
                </Form.Item>

                {num_of_employees_custom === "Above 1000" && (
                  <Form.Item name="num_of_employees_custom">
                    <InputStyled
                      placeholder="Number of Employees"
                      type="number"
                    />
                  </Form.Item>
                )}

                <Form.Item name="funding">
                  <InputGroup compact style={{ display: "flex" }}>
                    <Form.Item initialValue="₦" name="currency">
                      <Select>
                        <Option value="₦">₦</Option>
                        <Option value="$">$</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="currency_value" style={{ width: "100%" }}>
                      <InputStyled placeholder="Funding" type="number" />
                    </Form.Item>
                  </InputGroup>
                </Form.Item>

                {/* <Form.Item name="gov_id">
                  <InputStyled placeholder="Government ID" />
                </Form.Item> */}

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
