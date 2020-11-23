import React, { FC, useContext, useEffect, useState } from "react";
import { Row, Form, Select, Divider } from "antd";
import { MainColStyled } from "../AddCompany/styled";
import Heading from "../../../../components/heading/heading";
import { ButtonStyled, InputStyled } from "../../../Styles";
import { StepsStyled } from "./styled";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { WithBusinessProvider } from "../../index";

import { BusinessContext } from "../../context";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";

const { Option } = Select;
const { Step } = StepsStyled;

const ListOrganization: FC<RouteComponentProps> = ({ history }) => {
  const [ecosystemDropdown, setEcosystemDropdown] = useState({
    business_support: [
      "Business Advisory and Consulting Organizations",
      "Mentoring (Individuals & Organization)",
      "Incubators",
      "Acceleratorss",
      "Churches/Mosques",
    ],
    enterpreneurship_training: [
      "Enterprise Support Organizations",
      "Incubators",
      "Acceleratorss",
      "Churches/Mosques",
    ],
    funding: [
      "Loan Providers (*Rating, Loan disbursement data trend)",
      "Grant Providers (Grant Disbursement Data)",
      "Equity Funders (Equity Investment Data)",
    ],
    market_access: [
      "Distribution Channels that Faciliatte Trade",
      "Tech Platforms that facilitate Trade",
    ],
    policy_regulation: [
      "Government",
      "Regulators",
      "Enterpreneurship Advocacy Groups/Think-Tanks",
    ],
    resources: [
      "Virtual Resources",
      "In-Person Resources",
      "Tools",
      "Services",
    ],
    research_development: [
      "Markerspaces",
      "Research Drivers",
      "Innovation and Design Spaces for Hardware and Software",
    ],
    enterprises: [],
  });

  const customDot = (dot: any) => dot;

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  useEffect(() => {
    if (!state.business_type) {
      <Redirect to="/business" />;
    }
  }, [state]);

  const handleSubmit = values => {
    console.log(values);
    setState({ ...state, ...values });
    history.push("/business/uploads");
  };

  const updateSubSegment = e => {
    console.log(e);
  };

  return (
    <AdminSectionWrapper
      className="section-list-organization"
      background="#fff"
    >
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
                <Form.Item name="organization_name">
                  <InputStyled placeholder="Organization Name" />
                </Form.Item>

                <Form.Item name="founders_name">
                  <InputStyled placeholder="CEO/Founder's Name" />
                </Form.Item>

                <Form.Item name="state">
                  <Select placeholder="State" allowClear>
                    <Option value="male">Lagos</Option>
                    <Option value="female">Ogun</Option>
                    <Option value="other">Abuja</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="address">
                  <InputStyled placeholder="Address" />
                </Form.Item>

                <Divider />

                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item name="ecosystem">
                    <Select
                      onChange={e => updateSubSegment(e)}
                      placeholder="Ecosystem Segment"
                      allowClear
                    >
                      <Option value="Business Support">Business Support</Option>
                      <Option value="Enterpreneurship Training">
                        Enterpreneurship Training
                      </Option>
                      <Option value="Funding">Funding</Option>
                      <Option value="Market Access">Market Access</Option>
                      <Option value="Policy and Regulation">
                        Policy and Regulation
                      </Option>
                      <Option value="Resources">Resources</Option>
                      <Option value="Research and Development">
                        Research and Development
                      </Option>
                      <Option value="Enterprises">Enterprises</Option>
                    </Select>
                  </Form.Item>
                )}

                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item name="sub_segment">
                    <Select placeholder="Sub-Segment" allowClear>
                      <Option value="Business Advisory and Consulting Organizations">
                        Business Advisory and Consulting Organizations
                      </Option>

                      <Option value="Mentoring (Individuals & Organizations)">
                        Mentoring (Individuals & Organizations)
                      </Option>

                      <Option value="Incubators">Incubators</Option>
                      <Option value="Accelerators">Accelerators</Option>
                      <Option value="Churches/Mosques">Churches/Mosques</Option>
                      <Option value="Resources">Resources</Option>
                      <Option value="Research and Development">
                        Research and Development
                      </Option>
                      <Option value="Enterprises">Enterprises</Option>
                    </Select>
                  </Form.Item>
                )}

                {state.business_type === "Enterpreneur" && (
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
                )}

                {state.business_type === "Enterpreneur" && (
                  <Form.Item name="business_level">
                    <Select placeholder="Business Level" allowClear>
                      <Option value="micro">Micro</Option>
                      <Option value="small">Small</Option>
                      <Option value="medium">Medium</Option>
                    </Select>
                  </Form.Item>
                )}

                {state.business_type === "Enterpreneur" && (
                  <Form.Item name="is_startup">
                    <Select placeholder="Are You A StartUp" allowClear>
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                )}

                <Divider />

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
      </Main>
    </AdminSectionWrapper>
  );
};

export default ListOrganization;
