import React, { useContext, useEffect, useState } from "react";
import { Form, Select, Divider, Tooltip } from "antd";
import {
  ButtonStyled,
  InputNumberStyled,
  InputStyled,
} from "../../../../../Styles";
import { useHistory } from "react-router-dom";
import { BusinessContext } from "../../../../context";
import {
  useEcosystemContext,
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../context";
import {
  ISubEcosystem,
  // ISubclassProps,
} from "../../../../../../context/Ecosystem/types";

const { Option } = Select;
const InputGroup = InputStyled.Group;

const numOfBusinessessSupported = [
  "1-100",
  "101-200",
  "201-300",
  "301-400",
  "401-500",
  "501-1000",
  "Above 1000",
];

const businessLevels = [
  {
    name: "Micro",
    description:
      "businesses with 0 - 9 employees and  total assets (excluding land and building) of less than 10 million naira",
  },
  {
    name: "Small",
    description: `businesses with 10 - 49 employees and total assets (excluding
land and building) of 10million to 99million naira`,
  },
  {
    name: "Medium",
    description: `businesses with 50 - 199 employees and total assets (excluding
land and building) of 100million to 1billion naira`,
  },
];

const business_subclass = [
  "Tax",
  "Book-Keeping",
  "Human Resources",
  "Legal",
  "Mentoring",
];

const ListOrganizationForm = ({ next }) => {
  const [subSegment, setSubSegment] = useState<ISubEcosystem[]>([]);
  const [num_supported_business, setNum_supported_business] = useState();
  const [selectedSubEcosystem, setSelectedSubEcosystem] = useState(null);
  // const [subEcosystemSubClass, setSubEcosystemSubClass] = useState<ISubclassProps[]>([]);
  const [is_startUp, setIs_Startup] = useState(false);

  const { data: ecosystem } = useEcosystemContext();
  const { states } = useOrganizationContext();
  const { data: sectors } = useSectorContext();

  const [form] = Form.useForm();

  const history = useHistory();

  const { state, setState } = useContext(BusinessContext);

  useEffect(() => {
    if (!state.business_type) {
      history.push("/business");
    }

    // getEcosystem();
  }, [state, history]);

  const handleSubEcosystemChange = value => {
    const selectedSubEcosystem = subSegment.filter(
      subSegment => subSegment.name === value
    );

    console.log({ selectedSubEcosystem });

    setSelectedSubEcosystem(selectedSubEcosystem[0]);

    // if (selectedSubEcosystem.length > 0) {
    //   setSubEcosystemSubClass(selectedSubEcosystem[0].sub_class);
    // }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (values.num_supported_business === "Above 1000") {
        values.num_supported_business = values.num_supported_business_custom;
      }

      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === values.ecosystem
      );

      // console.log(values);

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

      // Move to Next Step
      next();

      // history.push("/business/uploads");
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
            message: "Please input your CEO/DG/founder's name",
            required: true,
          },
        ]}
      >
        <InputStyled placeholder="CEO/DG/Founder's Name" />
      </Form.Item>
      {/* CEO/FOUNDER's ANME */}

      {/* CEO/FOUNDER"S NAME */}
      <Form.Item
        name="ceo_gender"
        rules={[
          {
            message: "Please select CEO/DG/Founder's gender",
            required: true,
          },
        ]}
      >
        <Select placeholder="Gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
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
          {states.map((state, i) => (
            <Option key={i} value={state}>
              {state}
            </Option>
          ))}
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
      {state.business_type === "Ecosystem Enabler" && subSegment.length > 0 ? (
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
            {subSegment.map(segment => (
              <Option key={segment.id} value={segment.name}>
                {segment.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}
      {/* SUB-ECOSYTEM SEGMENT */}

      {/* SUB-CLASS */}
      {state.business_type === "Ecosystem Enabler" &&
      selectedSubEcosystem &&
      selectedSubEcosystem.name === "Business Advisory" ? (
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
            {business_subclass.map((subClass, key) => (
              <Option key={key} value={subClass}>
                {subClass}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}

      {state.business_type === "Ecosystem Enabler" &&
      selectedSubEcosystem &&
      selectedSubEcosystem.name === "Equity Funders" ? (
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
            <Option value="Angel Investors">Angel Investors</Option>
            <Option value="Venture Capitalist">Venture Capitalist</Option>
          </Select>
        </Form.Item>
      ) : null}
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
          {sectors.map((sector, i) => (
            <Option key={i} value={sector.id}>
              {sector.name}
            </Option>
          ))}
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
            {businessLevels.map((level, key) => (
              <Option key={key} value={level.name}>
                <Tooltip title={level.description}>
                  <span>{level.name}</span>
                </Tooltip>
              </Option>
            ))}
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
            {numOfBusinessessSupported.map((value, i) => (
              <Option value={value} key={i}>
                {value}
              </Option>
            ))}
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

      <p style={{ fontWeight: "bold" }}>Press Realeases, Web mentions</p>

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
  );
};

export default ListOrganizationForm;
