import React, { useContext, useEffect, useState } from "react";
import { Select, Divider, Tooltip, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
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
import { businessLevels, capitalize } from "../../../../../../utils/helpers";
import usePlacesAutocomplete from "use-places-autocomplete";
import useGooglePlacesHook from "../../../../../../utils/useGooglePlacesHook";
import { AutoCompleteStyled } from "../../../../../../components/autoComplete/style";
import EcosystemField from "./EcosystemField";
import styled from "styled-components";

const { Option } = Select;
const InputGroup = InputStyled.Group;

const ListOrganizationForm = ({ next }) => {
  const [selectedEcosystem, setSelectedEcosystem] = useState([
    { ecosystem: "" },
  ]);
  const [subSegment, setSubSegment] = useState<ISubEcosystem[]>([]);
  const [currEcosystem, setCurrEcosystem] = useState("");
  const [num_supported_business] = useState();
  // const [selectedSubEcosystem, setSelectedSubEcosystem] = useState(null);
  const [subEcosystemSubClass, setSubEcosystemSubClass] = useState<
    ISubclassProps[]
  >([]);
  const [currSubClass, setCurrSubClass] = useState<ISubclassProps>(null);
  const [is_startUp, setIs_Startup] = useState(false);

  const [fitilaEcosystem, setFitilaEcosystem] = useState([]);
  const [fitilaSubEcosystem, setFitilaSubEcosystem] = useState([]);
  const [fitilaSubClass, setFitilaSubClass] = useState([]);

  const { state, setState } = useContext(BusinessContext);

  const handleFitilaEcosystemChange = (id, name) => {
    console.log(id);
    setFitilaEcosystem([...fitilaEcosystem, id]);

    setState(prevState => ({
      ...prevState,
      selectedEcosystemNames: [...prevState?.selectedEcosystemNames, name],
    }));
  };

  const handleFitilaSubEcosystemChange = (id, name) => {
    console.log(id);

    setFitilaSubEcosystem([...fitilaSubEcosystem, id]);
    setState(prevState => ({
      ...prevState,
      selectedSubEcosystemNames: [
        ...prevState?.selectedSubEcosystemNames,
        name,
      ],
    }));
  };

  const handleFitilaSubClassChange = (id, name) => {
    console.log(id);

    setFitilaSubClass([...fitilaSubClass, id]);

    setState(prevState => ({
      ...prevState,
      selectedSubClassNames: [...prevState?.selectedSubClassNames, name],
    }));
  };

  const { data: ecosystem } = useEcosystemContext();
  const { data: sectors } = useSectorContext();

  console.log({
    fitilaEcosystem,
    fitilaSubEcosystem,
    fitilaSubClass,
  });

  const [ecosystemFormFields, setEcosystemFormFields] = useState([
    0,
    // <EcosystemField
    //   handleFitilaEcosystemChange={handleFitilaEcosystemChange}
    //   handleFitilaSubEcosystemChange={handleFitilaSubEcosystemChange}
    //   handleFitilaSubClassChange={handleFitilaSubClassChange}
    // />,
  ]);

  const [form] = Form.useForm();

  const history = useHistory();

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
      componentRestrictions: { country: "ng" },
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

    if (
      state.business_level &&
      state.business_level.toLowerCase() === "startup"
    ) {
      setIs_Startup(true);
    }
  }, [
    state.business_type,
    state.ecosystem_name,
    state.business_level,
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

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      console.log({ values });

      if (values.num_supported_business === "Above 1000") {
        values.num_supported_business = values.num_supported_business_custom;
      }

      let userData: any = {};

      if (state.business_type === "Ecosystem Enabler") {
        userData = {
          ...state,
          ...values,
          funding_disbursed_for_support: values.funding_disbursed_support
            ? values.funding_disbursed_support
            : 0,

          // ====== ECOSYSTEM END ======
          ecosystem: fitilaEcosystem,
          sub_ecosystem: fitilaSubEcosystem,
          sub_ecosystem_sub_class: fitilaSubClass,
          // ====== ECOSYSTEM END ======
          is_ecosystem:
            state.business_type === "Ecosystem Enabler" ? true : false,
          is_entrepreneur:
            state.business_type === "Entrepreneur" ? true : false,
        };
      } else {
        userData = {
          ...state,
          ...values,
          is_ecosystem:
            state.business_type === "Ecosystem Enabler" ? true : false,
          is_entrepreneur:
            state.business_type === "Entrepreneur" ? true : false,
        };
      }

      console.log({ userData });

      // Set Form State in Context
      setState(prevState => ({ ...prevState, ...userData }));
      // Move to Next Step
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const ceo_name_label =
    state.business_type === "Entrepreneur"
      ? "CEO/Founder's Name"
      : "CEO/DG/Head/Founder's Name";

  const addMoreFormField = () => {
    // setEcosystemFormFields([
    //   ...ecosystemFormFields,
    // <EcosystemField
    //   handleFitilaEcosystemChange={handleFitilaEcosystemChange}
    //   handleFitilaSubEcosystemChange={handleFitilaSubEcosystemChange}
    //   handleFitilaSubClassChange={handleFitilaSubClassChange}
    // />,
    // ]);

    setEcosystemFormFields([
      ...ecosystemFormFields,
      ecosystemFormFields.length,
    ]);
  };

  const removeFormField = index => {
    const fields = [...ecosystemFormFields];
    fields.splice(index, 1);
    setEcosystemFormFields(fields);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      className="list-organization"
      scrollToFirstError
      initialValues={{
        ...state,
        sector: [],
        currency: state.currency || "₦",
        // currency_value: state.currency_value,
        funding_disbursed_currency: "₦",
        num_supported_business_custom: state.num_supported_business,
        ecosystem: state.ecosystem_name,
        sub_ecosystem: state.sub_ecosystem_name,
        sub_ecosystem_sub_class: state.sub_ecosystem_sub_class_name,
      }}
    >
      {/* BUSINESS NAME */}
      <Form.Item
        label="Name"
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
        label={ceo_name_label}
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
        label="CEO/DG/Founder's Gender"
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

      {/* ADDRESS */}
      <Form.Item
        label="Address"
        name="address"
        rules={[
          {
            message: "please input orrganization address!",
            required: true,
          },
        ]}
      >
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
        label="State"
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
      <EcosystemWrapper className="ecosystem-wrapper">
        {state.business_type === "Ecosystem Enabler" &&
          ecosystemFormFields.map((fieldIndex, idx) => (
            <EcosystemField
              fieldIndex={fieldIndex}
              removeField={removeFormField}
              handleFitilaEcosystemChange={handleFitilaEcosystemChange}
              handleFitilaSubEcosystemChange={handleFitilaSubEcosystemChange}
              handleFitilaSubClassChange={handleFitilaSubClassChange}
            />
          ))}
      </EcosystemWrapper>

      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          to="#"
          onClick={e => {
            e.preventDefault();

            addMoreFormField();
          }}
        >
          Add another ecosystem
        </Link>
      </div>

      {/* ECOSYTEM SEGMENT */}

      {/* FUNDING*/}
      {state.business_type === "Ecosystem Enabler" &&
        currEcosystem === "Funding" &&
        subSegment.length > 0 && (
          <Form.Item label="Funding" name="funding" style={{ marginBottom: 0 }}>
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
      {/* FUNDING*/}

      {/* BUSINESS SECTOR */}
      <Form.Item
        label="Sector"
        name="sector"
        rules={[
          {
            message: "Please select your sector!",
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a Sector" allowClear showSearch>
          {sectors.map((sector, i) => (
            <Option key={i} value={sector.name.toLowerCase()}>
              {sector.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* BUSINESS SECTOR */}

      {/* BUSINESS LEVEL */}
      {state.business_type === "Entrepreneur" && (
        <Form.Item
          label="Business Level"
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
            onChange={value => {
              if (value.toString().toLowerCase() === "startup") {
                setIs_Startup(true);
              } else {
                setIs_Startup(false);
              }
            }}
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

      {/* COMPANY VALUATION */}
      {state.business_type === "Entrepreneur" && is_startUp && (
        <Form.Item label="Company Valuation">
          <InputGroup className="d-flex" compact>
            <Form.Item name="currency">
              <Select>
                <Option value="₦">₦</Option>
                <Option value="$">$</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="company_valuation"
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

      {/* NUMBER OF JOBS */}
      {state.is_entrepreneur && (
        <Form.Item
          label="Number of Jobs Created"
          name="no_of_jobs"
          rules={[
            { type: "number", message: "Only numbers are allowed" },
            {
              message: "Please enter the number of jobs created!",
              required: true,
            },
          ]}
        >
          <InputNumberStyled placeholder="Number of Jobs" size="large" />
        </Form.Item>
      )}
      {/* NUMBER OF JOBS */}

      {/* NUMBER OF SUPPORTED BUSINESSES */}
      {state.business_type === "Ecosystem Enabler" && (
        <Form.Item
          label="Number of Supported Businesses"
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
            label="NUMBER OF SUPPORTED BUSINESSES: ABOVE 1000"
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
      <Form.Item label="Website" name="website">
        <InputStyled placeholder="Website Address" />
      </Form.Item>
      {/* WEBSITE */}

      {/* ORGANIZATION EMAIL */}
      <Form.Item
        label="Email"
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
        label="Phone"
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
        <Form.Item label={inputField.name} key={key} name={inputField.key}>
          <InputStyled placeholder={inputField.name} />
        </Form.Item>
      ))}

      <p style={{ fontWeight: "bold" }}>Press Realeases, Web mentions</p>
      {["Url 1", "Url 2", "Url 3"].map((url, key) => (
        <Form.Item
          key={key}
          label={url}
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

const EcosystemWrapper = styled.div`
  .ant-form-item {
    :last-child {
      margin-bottom: 12px;
    }
  }

  /* margin-bottom: 20px; */
`;
