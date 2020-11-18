import React, { FC, useContext, useEffect } from "react";
import { Row, Form, Select, Divider, Button } from "antd";
import { SectionWrapper } from "../../../Styles";
import { MainColStyled } from "../AddCompany/styled";
import Heading from "../../../../components/heading/heading";
import { ButtonStyled, InputStyled } from "../../../Styles";
import { StepsStyled } from "./styled";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { BusinessContext } from "../../context";

const { Option } = Select;
const { Step } = StepsStyled;

const ListOrganization: FC<RouteComponentProps> = ({ history }) => {
  const customDot = (dot: any) => dot;

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  useEffect(() => {}, [state]);

  if (!state.business_type) {
    <Redirect to="/business" />;
  }

  const handleSubmit = values => {
    console.log(values);
    setState({ ...state, ...values });
    history.push("/business/uploads");
  };

  return (
    <SectionWrapper className="section-list-organization">
      <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
        <MainColStyled>
          <div style={{ marginBottom: "1.5rem" }}>
            <div>
              <Heading className="text-center font-weight-700" as="h3">
                List your Organization <br /> ({state.business_type})
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

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              className="list-organization"
            >
              <Form.Item name="name">
                <InputStyled placeholder="Organization Name" />
              </Form.Item>

              <Form.Item name="state">
                <Select placeholder="State" allowClear>
                  <Option value="male">Lagos</Option>
                  <Option value="female">Ogun</Option>
                  <Option value="other">Abuja</Option>
                </Select>
              </Form.Item>

              <Form.Item name="state_address">
                <InputStyled placeholder="State Address" />
              </Form.Item>

              <Form.Item name="business_sector">
                <Select placeholder="Sector" allowClear>
                  <Option value="health">Health</Option>
                  <Option value="agriculture">Agriculture</Option>
                  <Option value="creatives">Creatives</Option>
                  <Option value="education">Education</Option>
                  <Option value="manufacturers">Manufacturers</Option>
                  <Option value="ict">ICT</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item name="town">
                <Select placeholder="Zone" allowClear>
                  <Option value="male">Zone A</Option>
                  <Option value="female">Zone B</Option>
                  <Option value="other">Zone C</Option>
                </Select>
              </Form.Item>

              <Divider />

              <Form.Item name="business_level">
                <Select placeholder="Business Level" allowClear>
                  <Option value="micro">Micro</Option>
                  <Option value="small">Small</Option>
                  <Option value="medium">Medium</Option>
                </Select>
              </Form.Item>

              <Form.Item name="startup">
                <Select placeholder="Are You A StartUp" allowClear>
                  <Option value="yes">Yes</Option>
                  <Option value="no">No</Option>
                </Select>
              </Form.Item>

              <Form.Item name="num_supported_business">
                <Select
                  placeholder=" Number of businesses supported over the last 5 years"
                  allowClear
                >
                  <Option value="5-20">5-20</Option>
                  <Option value="20-50">20-50</Option>
                  <Option value="50-100">50-100</Option>
                </Select>
              </Form.Item>

              <Form.Item name="website">
                <InputStyled placeholder="Website Address" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { message: "Please input your Email!", required: true },
                ]}
              >
                <InputStyled placeholder="Email Address" />
              </Form.Item>

              <Form.Item name="phone">
                <InputStyled placeholder="Phone Number" />
              </Form.Item>

              <Divider />

              {[
                { name: "Facebook Url", key: "facebook" },
                { name: "Instagram Url", key: "instagram" },
                { name: "Twitter Url", key: "twitter" },
                { name: "LinkedIn Url", key: "linkedin" },
              ].map((inputField, key) => (
                <Form.Item key={key} name={inputField.key}>
                  <InputStyled placeholder={inputField.name} />
                </Form.Item>
              ))}

              <p style={{ fontWeight: "bold" }}>
                Press Realeases, Web mentions
              </p>

              {["Url 1", "Url 2", "Url 3"].map((url, key) => (
                <Form.Item key={key} name={url}>
                  <InputStyled placeholder={url} />
                </Form.Item>
              ))}

              <Button
                type="link"
                className="font-weight-700"
                style={{ fontSize: "16px", color: "#E7833B" }}
              >
                <span style={{ textDecoration: "underline" }}>
                  Add New Link
                </span>
              </Button>

              <Form.Item>
                <ButtonStyled
                  className=""
                  htmlType="submit"
                  type="primary"
                  size="large"
                  // onClick={() => history.push("")}
                >
                  Continue
                </ButtonStyled>
              </Form.Item>
            </Form>
          </div>
        </MainColStyled>
      </Row>
    </SectionWrapper>
  );
};

export default ListOrganization;
