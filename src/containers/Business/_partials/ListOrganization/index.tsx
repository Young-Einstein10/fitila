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
import api from "../../../../config/api";

const { Option } = Select;
const { Step } = StepsStyled;
const InputGroup = InputStyled.Group;

const ListOrganization: FC<RouteComponentProps> = ({ history }) => {
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
  const [ecosystem, setEcosystem] = useState([]);
  const [subSegment, setSubSegment] = useState([]);
  const [num_supported_business, setNum_supported_business] = useState();
  const [is_startUp, setIs_Startup] = useState(false);
  const [subEcosystemSubClass, setSubEcosystemSubClass] = useState("");

  const customDot = (dot: any) => dot;

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  useEffect(() => {
    if (!state.business_type) {
      <Redirect to="/business" />;
    }

    const getEcosystem = async () => {
      const res = await api.business.getEcosystem();

      if (res && res.status === 200) {
        const { data } = res.data;

        setEcosystem(data);
      }
    };

    getEcosystem();
  }, [state]);

  const handleSubEcosystemChange = value => setSubEcosystemSubClass(value);

  const handleSubmit = values => {
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
      });
    } else {
      setState({
        ...state,
        ...values,
        company_valuation: `${values.currency}${values.currency_value}`,
      });
    }

    history.push("/business/uploads");
  };

  const updateSubSegment = value => {
    // value = value
    //   .toLowerCase()
    //   .split(" ")
    //   .join("_");
    // console.log(value);
    // setSubSegmentList(ecosystemDropdown[value]);

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
                <Form.Item name="name">
                  <InputStyled placeholder="Business Name" />
                </Form.Item>

                <Form.Item name="ceo_name">
                  <InputStyled placeholder="CEO/Founder's Name" />
                </Form.Item>

                <Form.Item name="state">
                  <Select placeholder="State" allowClear>
                    <Option value="Lagos">Lagos</Option>
                    <Option value="Ogun">Ogun</Option>
                    <Option value="Abuja">Abuja</Option>
                    <Option value="Kano">Kano</Option>
                    <Option value="Kaduna">Kaduna</Option>
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

                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item name="sub_ecosystem">
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

                {state.business_type === "Ecosystem Enabler" &&
                  subEcosystemSubClass === "Business Advisory" && (
                    <Form.Item name="sub_ecosystem_sub_class">
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

                {state.business_type === "Enterpreneur" && (
                  <Form.Item name="business_sector">
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
                )}

                {state.business_type === "Enterpreneur" && (
                  <Form.Item name="business_level">
                    <Select placeholder="Business Level" allowClear>
                      <Option value="Micro">Micro</Option>
                      <Option value="Small">Small</Option>
                      <Option value="Medium">Medium</Option>
                    </Select>
                  </Form.Item>
                )}

                {state.business_type === "Enterpreneur" && (
                  <Form.Item name="is_startup">
                    <Select
                      onChange={e => {
                        if (e === "Yes") {
                          setIs_Startup(true);
                        } else {
                          setIs_Startup(false);
                        }
                      }}
                      placeholder="Are You A StartUp"
                      allowClear
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                )}

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
                      >
                        <InputStyled
                          placeholder="Compnay Valuation"
                          type="number"
                        />
                      </Form.Item>
                    </InputGroup>
                  </Form.Item>
                )}

                {state.business_type === "Ecosystem Enabler" && (
                  <Form.Item name="num_supported_business">
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

                {state.business_type === "Ecosystem Enabler" &&
                  num_supported_business === "Above 1000" && (
                    <Form.Item name="num_supported_business_custom">
                      <InputStyled type="number" />
                    </Form.Item>
                  )}

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

                <Divider />

                <Form.Item name="phone">
                  <InputStyled placeholder="Phone Number" />
                </Form.Item>

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
