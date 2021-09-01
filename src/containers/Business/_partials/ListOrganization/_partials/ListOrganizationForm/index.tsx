import React, { useContext, useEffect, useState } from "react";
import { Select, Divider, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import {
  ButtonStyled,
  InputNumberStyled,
  InputStyled,
} from "../../../../../Styles";
import { FormStyled as Form, StyledDivider } from "../../styled";
import { BusinessContext } from "../../../../context";
import {
  useEcosystemContext,
  useSectorContext,
} from "../../../../../../context";
import {
  ISubclassProps,
  ISubEcosystem,
} from "../../../../../../context/Ecosystem/types";
import states from "../../../../../../states.json";
import { businessLevels } from "../../../../../../utils/helpers";
import usePlacesAutocomplete from "use-places-autocomplete";
import useGooglePlacesHook from "../../../../../../utils/useGooglePlacesHook";
import { AutoCompleteStyled } from "../../../../../../components/autoComplete/style";

const { Option } = Select;
const InputGroup = InputStyled.Group;

const ListOrganizationForm = ({ next }) => {
  const [subSegment, setSubSegment] = useState<ISubEcosystem[]>([]);
  const [currEcosystem, setCurrEcosystem] = useState("");
  const [num_supported_business] = useState();
  // const [selectedSubEcosystem, setSelectedSubEcosystem] = useState(null);
  const [subEcosystemSubClass, setSubEcosystemSubClass] = useState<
    ISubclassProps[]
  >([]);
  const [currSubClass, setCurrSubClass] = useState<ISubclassProps>(null);
  const [is_startUp, setIs_Startup] = useState(false);

  const { data: ecosystem } = useEcosystemContext();
  const { data: sectors } = useSectorContext();

  const [form] = Form.useForm();

  const history = useHistory();

  const { state, setState } = useContext(BusinessContext);

  const [loaded, error] = useGooglePlacesHook();

  const {
    init,
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: "ng" },
      //   types: ["(regions)"],
    },
    debounce: 300,
    initOnMount: false, // Disable initializing when the component mounts, default is true
  });

  useEffect(() => {
    if (loaded && !error) {
      init();
    }
  }, [loaded, error, init]);

  useEffect(() => {
    if (state.ecosystem_name) {
      setCurrEcosystem(state.ecosystem_name);
      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === state.ecosystem_name
      );

      setSubSegment(selectedEcosystem[0].sub_ecosystem);
    }

    // if (!state.business_type) {
    //   history.push("/business");
    // }

    if (state.is_startup) {
      setIs_Startup(state.is_startup);
    }
  }, [
    state.business_type,
    state.ecosystem_name,
    state.is_startup,
    ecosystem,
    history,
  ]);

  useEffect(() => {
    if (state.sub_ecosystem_name) {
      const selectedSubEcosystem = subSegment.filter(
        subSegment => subSegment.name === state.sub_ecosystem_name
      );

      console.log({ selectedSubEcosystem });

      if (selectedSubEcosystem.length > 0) {
        setSubEcosystemSubClass(selectedSubEcosystem[0].sub_class);
      }
    }
  }, [state.sub_ecosystem_name, subSegment]);

  const handleSubEcosystemChange = value => {
    const selectedSubEcosystem = subSegment.filter(
      subSegment => subSegment.name === value
    );

    // console.log({ selectedSubEcosystem });

    // setSelectedSubEcosystem(selectedSubEcosystem[0]);

    if (selectedSubEcosystem.length > 0) {
      setSubEcosystemSubClass(selectedSubEcosystem[0].sub_class);
    }
  };

  const handleSubClassChange = value => {
    const currSubClass = subEcosystemSubClass.find(
      subclass => subclass.name.toLowerCase() === value
    );

    setCurrSubClass(currSubClass);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      console.log({ values });

      if (values.num_supported_business === "Above 1000") {
        values.num_supported_business = values.num_supported_business_custom;
      }

      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === values.ecosystem
      );

      let selectedSubEcosystem = [];

      let userData: any = {};

      if (state.business_type === "Ecosystem Enabler") {
        selectedSubEcosystem = selectedEcosystem[0].sub_ecosystem.filter(
          sub_eco => sub_eco.name === values.sub_ecosystem
        );

        userData = {
          ...state,
          ...values,
          is_startup: is_startUp,
          funding_disbursed_for_support: values.funding_disbursed_support
            ? values.funding_disbursed_support
            : 0,
          ecosystem: selectedEcosystem[0].id,
          ecosystem_name: selectedEcosystem[0].name,
          sub_ecosystem: selectedSubEcosystem[0].id,
          sub_ecosystem_name: selectedSubEcosystem[0].name,
          sub_segment: selectedSubEcosystem[0].id,
          sub_ecosystem_sub_class: currSubClass ? currSubClass.id : null,
          sub_ecosystem_sub_class_name: currSubClass
            ? currSubClass.name
            : values.sub_ecosystem_sub_class,
          is_ecosystem:
            state.business_type === "Ecosystem Enabler" ? true : false,
          is_entrepreneur:
            state.business_type === "Enterpreneur" ? true : false,
        };
      } else {
        userData = {
          ...state,
          ...values,
          is_startup: is_startUp,
          is_ecosystem:
            state.business_type === "Ecosystem Enabler" ? true : false,
          is_entrepreneur:
            state.business_type === "Enterpreneur" ? true : false,
        };
      }

      if (values.currency_vaue) {
        userData.company_valuation = values.currency_value;
      }

      console.log(userData);

      setState(userData);
      // Move to Next Step
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const updateSubSegment = value => {
    setCurrEcosystem(value);
    const selectedEcosystem = ecosystem.filter(eco => eco.name === value);

    setSubSegment(selectedEcosystem[0].sub_ecosystem);
  };

  const ceo_name_label =
    state.business_type === "Enterpreneur"
      ? "CEO/Founder's Name"
      : "CEO/DG/Head/Founder's Name";

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="list-organization"
      scrollToFirstError
      initialValues={{
        ...state,
        is_startUp: is_startUp ? "Yes" : "No",
        currency: state.currency || "₦",
        currency_value: state.currency_value,
        funding_disbursed_currency: "₦",
        num_supported_business_custom: state.num_supported_business,
        ecosystem: state.ecosystem_name,
        sub_ecosystem: state.sub_ecosystem_name,
        sub_ecosystem_sub_class: state.sub_ecosystem_sub_class_name,
      }}
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
            message: `Please input your ${ceo_name_label}`,
            required: true,
          },
        ]}
      >
        <InputStyled placeholder={ceo_name_label} />
      </Form.Item>
      {/* CEO/FOUNDER's NAME */}

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
      {/* CEO/FOUNDER's NAME */}

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

      {/* ADDRESS */}
      <Form.Item
        name="address"
        rules={[
          {
            message: "please input your address!",
            required: true,
          },
        ]}
      >
        {/* <InputStyled placeholder="Address" /> */}

        <AutoCompleteStyled
          size="large"
          placeholder="Enter an Address"
          value={value}
          onSelect={address => {
            setValue(address, false);
            clearSuggestions();
          }}
          onChange={e => setValue(e)}
          disabled={!ready}
          allowClear
        >
          {status === "OK" &&
            data.map((suggestion, i) => (
              <AutoCompleteStyled.Option
                key={i}
                value={suggestion.description}
                data={suggestion}
              >
                {suggestion.description}
              </AutoCompleteStyled.Option>
            ))}
        </AutoCompleteStyled>
      </Form.Item>

      {/* ADDRESS */}

      {/* STATE */}
      <Form.Item
        name="state"
        rules={[
          {
            message: "state is required!",
            required: true,
          },
        ]}
      >
        <Select
          placeholder="State"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
        >
          {states.map(({ name, code }) => (
            <Option key={code} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* STATE */}

      <StyledDivider />

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
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
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
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
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
      subEcosystemSubClass.length > 0 ? (
        <Form.Item
          name="sub_ecosystem_sub_class"
          rules={[
            {
              message: "Please select a sub-segment class!",
              required: true,
            },
          ]}
        >
          <Select
            onChange={e => handleSubClassChange(e)}
            placeholder="Sub-Class"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
            {subEcosystemSubClass.map((subClass, key) => (
              <Option key={key} value={subClass.name.toLowerCase()}>
                {subClass.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      ) : null}
      {/* SUB-CLASS */}

      {state.business_type === "Ecosystem Enabler" &&
        currEcosystem === "Funding" &&
        subSegment.length > 0 && (
          <Form.Item name="funding" style={{ marginBottom: 0 }}>
            <InputGroup compact style={{ display: "flex" }}>
              <Form.Item name="funding_disbursed_currency">
                <Select>
                  <Option value="₦">₦</Option>
                  {/* <Option value="$">$</Option> */}
                </Select>
              </Form.Item>

              <Form.Item
                name="funding_disbursed_for_support"
                style={{ width: "100%" }}
                rules={[
                  { type: "number", message: "Only numbers are allowed" },
                  {
                    message: "Please enter funding disbursed to businesses!",
                    required: true,
                  },
                ]}
              >
                <InputNumberStyled
                  placeholder="Funding disbursed to businesses so far"
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
        <Select
          placeholder="Sector"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          allowClear
        >
          {sectors.map((sector, i) => (
            <Option key={i} value={sector.name.toLowerCase()}>
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
          <Select
            placeholder="Business Level"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            allowClear
          >
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
            <Form.Item name="currency">
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
            { type: "number", message: "Only numbers are allowed" },
            {
              message:
                "Please input the number of businesses you've supported!",
              required: true,
            },
          ]}
        >
          <InputNumberStyled
            placeholder="Number of businesses supported over the last 5 years"
            size="large"
          />
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
            <InputNumberStyled type="number" />
          </Form.Item>
        )}
      {/* NUMBER OF SUPPORTED BUSINESSES: ABOVE 1000 */}

      {/* WEBSITE */}
      <Form.Item name="website">
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
        <Form.Item
          key={key}
          name={url
            .toLowerCase()
            .split(" ")
            .join("_")}
        >
          <InputStyled placeholder={url} />
        </Form.Item>
      ))}

      <Form.Item>
        <ButtonStyled
          className=""
          htmlType="submit"
          type="primary"
          size="large"
        >
          Continue
        </ButtonStyled>
      </Form.Item>
    </Form>
  );
};

export default ListOrganizationForm;
