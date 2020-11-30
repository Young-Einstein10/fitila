import React, { FC, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Form, Select, Divider, InputNumber, Tooltip } from "antd";
import { MainColStyled } from "../AddCompany/styled";
import Heading from "../../../../components/heading/heading";
import { ButtonStyled, InputNumberStyled, InputStyled } from "../../../Styles";
import { StepsStyled } from "./styled";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { WithBusinessProvider } from "../../index";

import { BusinessContext } from "../../context";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { getEcosystem } from "../../../../redux/actions/businessActions";

const { Option } = Select;
const { Step } = StepsStyled;
const InputGroup = InputStyled.Group;

const ListOrganization = ({ history, getEcosystem, business }) => {
  const [ecosystemDropdown, setEcosystemDropdown] = useState({
    business_support: [
      "Business Advisory and Consulting Organizations",
      "Mentoring (Individuals & Organization)",
      "Incubators",
      "Acceleratorss",
      "Churches/Mosques",
    ],
    business_advisory: ["Mentoring", "Legal", "Tax", "HR", "Book-Keeping"],
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
  const [subSegmentList, setSubSegmentList] = useState([]);
  // const [ecosystem, setEcosystem] = useState([]);
  const [subSegment, setSubSegment] = useState([]);
  const [num_supported_business, setNum_supported_business] = useState();
  const [is_startUp, setIs_Startup] = useState(false);
  const [subEcosystemSubClass, setSubEcosystemSubClass] = useState("");

  const { ecosystem } = business;

  const customDot = (dot: any) => dot;

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  useEffect(() => {
    if (!state.business_type) {
      <Redirect to="/business" />;
    }

    getEcosystem();
  }, [state, getEcosystem]);

  const handleSubEcosystemChange = value => setSubEcosystemSubClass(value);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (values.num_supported_business === "Above 1000") {
        values.num_supported_business = values.num_supported_business_custom;
      }

      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === values.ecosystem
      );

      console.log(values);

      let selectedSubEcosystem = [];

      if (state.business_type === "Ecosystem Enabler") {
        selectedSubEcosystem = selectedEcosystem[0].sub_ecosystem.filter(
          sub_eco => sub_eco.name === values.sub_ecosystem
        );

        setState({
          ...state,
          ...values,
          company_valuation: `${values.currency}${values.currency_value}`,
          ecosystem: selectedEcosystem[0].id,
          sub_ecosystem: selectedSubEcosystem[0].id,
          sub_segment: selectedSubEcosystem[0].id,
          is_ecosystem:
            state.business_type === "Ecosystem Enabler" ? true : false,
          is_enterpreneur:
            state.business_type === "Enterpreneur" ? true : false,
        });
      } else {
        setState({
          ...state,
          ...values,
          company_valuation: `${values.currency}${values.currency_value}`,
          is_ecosystem:
            state.business_type === "Ecosystem Enabler" ? true : false,
          is_enterpreneur:
            state.business_type === "Enterpreneur" ? true : false,
        });
      }

      history.push("/business/uploads");
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubSegment = value => {
    const selectedEcosystem = ecosystem.filter(eco => eco.name === value);

    setSubSegment(selectedEcosystem[0].sub_ecosystem);
  };

  const onNumberOfBusinessChange = value => {
    if (value === "Above 1000") {
      setNum_supported_business(value);
    }
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
                  List your{" "}
                  {state.business_type === "Enterpreneur"
                    ? "Business"
                    : "Organization"}{" "}
                  <br /> ({state.business_type})
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
                {/* BUSINESS NAME */}
                <Form.Item
                  name="name"
                  rules={[
                    {
                      message: "Please input your business name",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="Business Name" />
                </Form.Item>
                {/* BUSINESS NAME */}

                {/* CEO/FOUNDER"S NAME */}
                <Form.Item
                  name="ceo_name"
                  rules={[
                    {
                      message: "Please input your ceo/founder's name",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="CEO/Founder's Name" />
                </Form.Item>
                {/* CEO/FOUNDER's ANME */}

                {/* HEADQUARTERS */}
                {/* <Form.Item
                  name="head_quarters"
                  rules={[
                    {
                      message: "Please input your headquarters",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="CEO/Founder's Name" />
                </Form.Item> */}
                {/* HEADQUARTERS */}

                {/* STATE */}
                <Form.Item
                  name="state"
                  rules={[
                    {
                      message: "Please select state organization is located in",
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="State" allowClear>
                    <Option value="Lagos">Lagos</Option>
                    <Option value="Ogun">Ogun</Option>
                    <Option value="Abuja">Abuja</Option>
                    <Option value="Kano">Kano</Option>
                    <Option value="Kaduna">Kaduna</Option>
                  </Select>
                </Form.Item>
                {/* STATE */}

                {/* ADDRESS */}
                <Form.Item
                  name="address"
                  rules={[
                    {
                      message: "Please input your address!",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="Address" />
                </Form.Item>
                {/* ADDRESS */}

                <Divider />

                {/* ECOSYTEM SEGMENT */}
                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item
                    name="ecosystem"
                    rules={[
                      {
                        message: "Please select an ecosystem segment!",
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      onChange={e => updateSubSegment(e)}
                      placeholder="Ecosystem Segment"
                      allowClear
                    >
                      {/* {Object.keys(ecosystemDropdown).map((ecosystem, key) => (
                        <Option
                          key={key}
                          value={ecosystem
                            .split("_")
                            .join(" ")
                            .toLocaleUpperCase()}
                        >
                          {ecosystem
                            .split("_")
                            .join(" ")
                            .toLocaleUpperCase()}
                        </Option>
                      ))} */}

                      {ecosystem.map((eco, key) => (
                        <Option key={eco.id} value={eco.name}>
                          {eco.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
                {/* ECOSYTEM SEGMENT */}

                {/* SUB-ECOSYTEM SEGMENT */}
                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item
                    name="sub_ecosystem"
                    rules={[
                      {
                        message: "Please select an ecosystem sub-segment!",
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      onChange={e => handleSubEcosystemChange(e)}
                      placeholder="Sub-Segment"
                      allowClear
                    >
                      {/* {subSegmentList.map((segment, key) => (
                        <Option
                          key={key}
                          value={segment}
                          style={{ textTransform: "capitalize" }}
                        >
                          {segment}
                        </Option>
                      ))} */}

                      {subSegment.map(segment => (
                        <Option key={segment.id} value={segment.name}>
                          {segment.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
                {/* SUB-ECOSYTEM SEGMENT */}

                {/* SUB-CLASS */}
                {state.business_type === "Ecosystem Enabler" &&
                  subEcosystemSubClass === "Business Advisory" && (
                    <Form.Item
                      name="sub_ecosystem_sub_class"
                      rules={[
                        {
                          message: "Please select a sub-segment class!",
                          required: true,
                        },
                      ]}
                    >
                      <Select placeholder="Sub-Class" allowClear>
                        {/* {subSegmentList.map((segment, key) => (
                        <Option
                          key={key}
                          value={segment}
                          style={{ textTransform: "capitalize" }}
                        >
                          {segment}
                        </Option>
                      ))} */}

                        {ecosystemDropdown.business_advisory.map(
                          (subclass, key) => (
                            <Option key={key} value={subclass}>
                              {subclass}
                            </Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  )}
                {/* SUB-CLASS */}

                {/* BUSINESS SECTOR */}

                <Form.Item
                  name="sector"
                  rules={[
                    {
                      message: "Please select your sector!",
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Sector" allowClear>
                    <Option value="Health">Health</Option>
                    <Option value="Agriculture">Agriculture</Option>
                    <Option value="Creatives">Creatives</Option>
                    <Option value="Education">Education</Option>
                    <Option value="Manufacturers">Manufacturers</Option>
                    <Option value="ICT">ICT</Option>
                    <Option value="Finance">Finance</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>

                {/* BUSINESS SECTOR */}

                {/* BUSINESS LEVEL */}
                {state.business_type === "Enterpreneur" && (
                  <Form.Item
                    name="business_level"
                    rules={[
                      {
                        message: "Please select your business level!",
                        required: true,
                      },
                    ]}
                  >
                    <Select placeholder="Business Level" allowClear>
                      <Option value="Micro">
                        <Tooltip
                          title="businesses with 0 - 9 employees and  total assets (excluding land and building) of less than 10 million naira
"
                        >
                          <span>Micro</span>
                        </Tooltip>
                      </Option>

                      <Option value="Small">
                        <Tooltip
                          title="businesses with 10 - 49 employees and total assets (excluding
land and building) of 10million to 99million naira
"
                        >
                          <span>Small</span>
                        </Tooltip>
                      </Option>

                      <Option value="Medium">
                        <Tooltip
                          title="businesses with 50 - 199 employees and total assets (excluding
land and building) of 100million to 1billion naira
"
                        >
                          <span>Medium</span>
                        </Tooltip>
                      </Option>
                    </Select>
                  </Form.Item>
                )}
                {/* BUSINESS LEVEL */}

                {/* ARE YOU A STARTUP */}
                {state.business_type === "Enterpreneur" && (
                  <Form.Item
                    name="is_startup"
                    rules={[
                      {
                        message: "Please select an option!",
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      onChange={e => {
                        if (e === "Yes") {
                          setIs_Startup(true);
                        } else {
                          setIs_Startup(false);
                        }
                      }}
                      placeholder={
                        <Tooltip title="High-growth young business typically 0 - 5 years old">
                          <span>Are You A StartUp</span>
                        </Tooltip>
                      }
                      allowClear
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                )}
                {/* ARE YOU A STARTUP */}

                {/* COMPANY VALUATION */}
                {state.business_type === "Enterpreneur" && is_startUp && (
                  <Form.Item name="company_valuation">
                    <InputGroup compact style={{ display: "flex" }}>
                      <Form.Item initialValue="₦" name="currency">
                        <Select>
                          <Option value="₦">₦</Option>
                          <Option value="$">$</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        name="currency_value"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            type: "number",
                            message: "Only Numbers are allowed",
                          },
                          {
                            message: "Please input your company valuation!",
                            required: true,
                          },
                        ]}
                      >
                        <InputNumberStyled
                          placeholder="Company Valuation"
                          size="large"
                          formatter={value =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={value => value.replace(/\bNGN\s?|(,*)/g, "")}
                        />
                      </Form.Item>
                    </InputGroup>
                  </Form.Item>
                )}
                {/* COMPANY VALUATION */}

                {/* NUMBER OF SUPPORTED BUSINESSES */}
                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item
                    name="num_supported_business"
                    rules={[
                      {
                        message:
                          "Please input the number of businesses you've supported!",
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder=" Number of businesses supported over the last 5 years"
                      onChange={e => onNumberOfBusinessChange(e)}
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
                )}
                {/* NUMBER OF SUPPORTED BUSINESSES */}

                {/* NUMBER OF SUPPORTED BUSINESSES: ABOVE 1000 */}
                {state.business_type === "Ecosystem Enabler" &&
                  num_supported_business === "Above 1000" && (
                    <Form.Item
                      name="num_supported_business_custom"
                      rules={[
                        {
                          message:
                            "Please input the number of businesses you've supported!",
                          required: true,
                        },
                      ]}
                    >
                      <InputStyled type="number" />
                    </Form.Item>
                  )}
                {/* NUMBER OF SUPPORTED BUSINESSES: ABOVE 1000 */}

                {/* WEBSITE */}
                <Form.Item
                  name="website"
                  rules={[
                    {
                      message: "Please input your organization website !",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="Website Address" />
                </Form.Item>
                {/* WEBSITE */}

                {/* ORGANIZATION EMAIL */}
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid E-mail!",
                    },
                    {
                      message: "Please input your organization email!",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="Email Address" />
                </Form.Item>
                {/* ORGANIZATION EMAIL */}

                <Divider />

                {/* ORGANIZATION PHONE */}
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      message: "Please input your organization phone number !",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled placeholder="Phone Number" />
                </Form.Item>
                {/* ORGANIZATION PHONE */}

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

const mapStateToProps = state => ({
  business: state.business,
});

export default connect(mapStateToProps, { getEcosystem })(ListOrganization);
