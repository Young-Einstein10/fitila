import React, { FC, useState } from "react";
import { Modal, Form, Select, Tooltip, Upload, Button } from "antd";
import { InputNumberStyled, InputStyled } from "../../../../../Styles";
import {
  useEcosystemContext,
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../context";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import { UploadButtonStyled } from "../../../../../Business/_partials/Uploads/styled";
import { ReactComponent as UploadIcon } from "../../../../../../static/svg/upload.svg";
import Uploads from "../../../../../Business/_partials/Uploads";

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = InputStyled.Group;

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

const numOfBusinessessSupported = [
  "1-100",
  "101-200",
  "201-300",
  "301-400",
  "401-500",
  "501-1000",
  "Above 1000",
];

interface IEditOrganizationProps {
  visible: boolean;
  closeModal: () => void;
  currentOrganization: IOrganizationProps;
}

const EditOrganizationModal: FC<IEditOrganizationProps> = ({
  currentOrganization,
  visible,
  closeModal,
}) => {
  const [subSegment, setSubSegment] = useState([]);
  const [num_supported_business, setNum_supported_business] = useState();
  const [num_of_employees_custom, setNum_of_employees_custom] = useState();

  const [file, setFile] = useState({
    ceo_image: [],
    compnay_logo: [],
  });

  const { states } = useOrganizationContext();
  const { data: ecosystems } = useEcosystemContext();
  const { data: sectors } = useSectorContext();

  const [form] = Form.useForm();

  const updateSubSegment = value => {
    const selectedEcosystem = ecosystems.find(eco => eco.name === value);

    setSubSegment(selectedEcosystem.sub_ecosystem);
  };

  const onNumberOfBusinessChange = value => {
    if (value === "Above 1000") {
      setNum_supported_business(value);
    }
  };

  const onNumberOfEmployeesChange = value => {
    setNum_of_employees_custom(value);
  };

  const ceoImageProps = {
    onRemove: file => {
      setFile(state => {
        const index = state.ceo_image.indexOf(file);
        const newFileList = state.ceo_image.slice();
        newFileList.splice(index, 1);
        return {
          ...state,
          ceo_image: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setFile(state => ({
        ...state,
        ceo_image: [...state.ceo_image, file],
      }));
      return false;
    },
    fileList: file.ceo_image,
  };

  const companyLogoProps = {
    onRemove: file => {
      setFile(state => {
        const index = state.compnay_logo.indexOf(file);
        const newFileList = state.compnay_logo.slice();
        newFileList.splice(index, 1);
        return {
          ...state,
          compnay_logo: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setFile(state => ({
        ...state,
        compnay_logo: [...state.compnay_logo, file],
      }));
      return false;
    },
    fileList: file.compnay_logo,
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      title="Edit Organization"
      footer={[
        <Button key="cancel" onClick={() => closeModal()}>
          Cancel
        </Button>,
        <Button type="primary" key="edit" onClick={() => handleEdit()}>
          Edit
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          ...currentOrganization,
          // name,
          ceo_name: currentOrganization.ceo_name.name,
          // state,
          // address,
          // sub_ecosystem,
        }}
      >
        {/* BUSINESS NAME */}
        <FormItem
          name="name"
          rules={[
            {
              message: "Please input your business name",
              required: true,
            },
          ]}
        >
          <InputStyled size="large" placeholder="Business Name" />
        </FormItem>
        {/* BUSINESS NAME */}

        {/* CEO/FOUNDER"S NAME */}
        <FormItem
          name="ceo_name"
          rules={[
            {
              message: "Please input your ceo/founder's name",
              required: true,
            },
          ]}
        >
          <InputStyled size="large" placeholder="CEO/Founder's Name" />
        </FormItem>
        {/* CEO/FOUNDER's ANME */}

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
          <Select size="large" placeholder="State" allowClear>
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
          <InputStyled size="large" placeholder="Address" />
        </Form.Item>
        {/* ADDRESS */}

        {/* Ecosystem Segment */}
        {currentOrganization.is_ecosystem && (
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
              size="large"
              onChange={e => updateSubSegment(e)}
              placeholder="Ecosystem Segment"
              allowClear
            >
              {ecosystems.map((eco, key) => (
                <Option key={eco.id} value={eco.id}>
                  {eco.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {/* Ecosystem Segment */}

        {/* SUB-ECOSYTEM SEGMENT */}
        {currentOrganization.is_ecosystem && (
          <Form.Item
            name="sub_ecosystem"
            rules={[
              {
                message: "Please select an ecosystem sub-segment!",
                required: true,
              },
            ]}
          >
            <Select size="large" placeholder="Sub-Segment" allowClear>
              {subSegment.map(segment => (
                <Option key={segment.id} value={segment.name}>
                  {segment.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {/* SUB-ECOSYTEM SEGMENT */}

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
          <Select size="large" placeholder="Sector" allowClear>
            {sectors.map((sector, i) => (
              <Option key={i} value={sector.id}>
                {sector.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* BUSINESS SECTOR */}

        {/* BUSINESS LEVEL */}
        {currentOrganization.is_entrepreneur && (
          <Form.Item
            name="business_level"
            rules={[
              {
                message: "Please select your business level!",
                required: true,
              },
            ]}
          >
            <Select size="large" placeholder="Business Level" allowClear>
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
        {currentOrganization.is_startup && (
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
              // onChange={e => {
              //   if (e === "Yes") {
              //     setIs_Startup(true);
              //   } else {
              //     setIs_Startup(false);
              //   }
              // }}
              size="large"
              placeholder={
                <Tooltip title="High-growth young business typically 0 - 5 years old">
                  <span>Are You A StartUp</span>
                </Tooltip>
              }
              allowClear
            >
              <Option value={`${true}`}>Yes</Option>
              <Option value={`${false}`}>No</Option>
            </Select>
          </Form.Item>
        )}
        {/* ARE YOU A STARTUP */}

        {/* COMPANY VALUATION */}
        {currentOrganization.is_ecosystem && currentOrganization.is_startup && (
          <Form.Item name="company_valuation">
            <InputGroup size="large" compact style={{ display: "flex" }}>
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
        {currentOrganization.is_ecosystem && (
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
              size="large"
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
        {currentOrganization.is_ecosystem &&
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
              <InputStyled size="large" type="number" />
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
          <InputStyled size="large" placeholder="Website Address" />
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
          <InputStyled size="large" placeholder="Email Address" />
        </Form.Item>
        {/* ORGANIZATION EMAIL */}

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
          <InputStyled size="large" placeholder="Phone Number" />
        </Form.Item>
        {/* ORGANIZATION PHONE */}

        {/* SOCIAL MEDIA */}
        {[
          { name: "Facebook Url", key: "facebook" },
          { name: "Instagram Url", key: "instagram" },
          { name: "Twitter Url", key: "twitter" },
          { name: "LinkedIn Url", key: "linkedin" },
        ].map((inputField, key) => (
          <Form.Item key={key} name={inputField.key}>
            <InputStyled size="large" placeholder={inputField.name} />
          </Form.Item>
        ))}
        {/* SOCIAL MEDIA */}

        <p style={{ fontWeight: "bold" }}>Press Realeases, Web mentions</p>

        {/* WEB MENTIONS */}
        {["Url 1", "Url 2", "Url 3"].map((url, key) => (
          <Form.Item key={key} name={url}>
            <InputStyled size="large" placeholder={url} />
          </Form.Item>
        ))}
        {/* WEB MENTIONS */}

        {/* COMPANY LOGO */}
        <Form.Item
          name="company_logo"
          rules={[
            {
              message: "Please upload your company logo!",
              required: true,
            },
          ]}
        >
          <Upload {...companyLogoProps} listType="picture">
            <UploadButtonStyled size="large" style={{ width: "100%" }}>
              Upload Company Logo <UploadIcon />
            </UploadButtonStyled>
          </Upload>
        </Form.Item>
        {/* COMPANY LOGO */}

        {/* CEO IMAGE */}
        <Form.Item
          name="ceo_image"
          rules={[
            {
              message: "Please upload your ceo/founder image!",
              required: true,
            },
          ]}
        >
          <Upload {...ceoImageProps} listType="picture">
            <UploadButtonStyled size="large" style={{ width: "100%" }}>
              Upload CEO/Founder Image <UploadIcon />
            </UploadButtonStyled>
          </Upload>
        </Form.Item>
        {/* CEO IMAGE */}

        {/* BUSINESS RC NUMBER */}
        <Form.Item
          name="cac_doc"
          rules={[
            {
              message: "Please input your Business RC Number!",
              required: true,
            },
          ]}
        >
          <InputStyled
            size="large"
            type="number"
            placeholder="Business RC Number"
          />
        </Form.Item>
        {/* BUSINESS RC NUMBER */}

        {/* NUMBER OF EMPLOYEES */}
        <Form.Item
          name="num_of_employees"
          rules={[
            {
              message: "Please select an option!",
              required: true,
            },
          ]}
        >
          <Select
            size="large"
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
        {/* NUMBER OF EMPLOYEES */}

        {/* NUMBER OF EMPLOYEES: ABOVE 1000 */}
        {num_of_employees_custom === "Above 1000" && (
          <Form.Item
            name="num_of_employees_custom"
            rules={[
              {
                message: "Please input the number of employees!",
                required: true,
              },
            ]}
          >
            <InputStyled
              size="large"
              placeholder="Number of Employees"
              type="number"
            />
          </Form.Item>
        )}
        {/* NUMBER OF EMPLOYEES: ABOVE 1000 */}

        {/* FUNDING */}
        <Form.Item name="funding" style={{ marginBottom: 0 }}>
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
                { type: "number", message: "Only Numbers are allowed" },
                {
                  message: "Please input this field!",
                  required: true,
                },
              ]}
            >
              <InputNumberStyled
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\bNGN\s?|(,*)/g, "")}
                placeholder="Funding"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </InputGroup>
        </Form.Item>
        {/* FUNDING */}

        {/* DESCRIPTION */}
        <Form.Item name="description">
          <InputStyled.TextArea
            size="large"
            placeholder="Organization Description"
          />
        </Form.Item>
        {/* FUNDING */}
      </Form>
    </Modal>
  );
};

export default EditOrganizationModal;
