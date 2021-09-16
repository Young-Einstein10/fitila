import React, { FC, useState, useEffect } from "react";
import { Modal, Button, Form, Select, Tooltip, Upload } from "antd";
import { IViewProps } from "../ViewOrganizationModal";
import { InputNumberStyled, InputStyled } from "../../../../../../../Styles";
import {
  ISubclassProps,
  ISubEcosystem,
} from "../../../../../../../../context/Ecosystem/types";
import {
  useApiContext,
  useEcosystemContext,
  useSectorContext,
} from "../../../../../../../../context";
import states from "../../../../../../../../states.json";
import { businessLevels } from "../../../../../../../../utils/helpers";
import { UploadButtonStyled } from "../../../../../../../Business/_partials/ListOrganization/_partials/Uploads/styled";
import { ReactComponent as UploadIcon } from "../../../../../../../../static/svg/upload.svg";
import { StyledImage } from "../../../../../../../../components/styledImage";
import styled from "styled-components";

type IEditListedOrgProps = Omit<IViewProps, "toggleEditOrganizationModal"> & {
  refetchUserProfile: () => Promise<void>;
};

const Option = Select.Option;
const InputGroup = InputStyled.Group;
const FormItem = Form.Item;

const StyledFormItem = styled(FormItem)`
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;

    .styled-img {
      margin-right: 10px;
    }

    .upload-wrapper {
      flex: 1;
    }
  }
`;

const EditListedOrganization: FC<IEditListedOrgProps> = ({
  visible,
  closeModal,
  currentOrganization,
  refetchUserProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
  const [file, setFile] = useState({
    ceo_image: [],
    compnay_logo: [],
  });

  const [form] = Form.useForm();

  const { organization: api } = useApiContext();

  useEffect(() => {
    if (currentOrganization.ecosystem_name) {
      setCurrEcosystem(currentOrganization.ecosystem_name);
      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === currentOrganization.ecosystem_name
      );

      setSubSegment(selectedEcosystem[0].sub_ecosystem);
    }

    if (currentOrganization.is_startup) {
      setIs_Startup(currentOrganization.is_startup);
    }
  }, [
    currentOrganization.ecosystem_name,
    currentOrganization.is_startup,
    ecosystem,
  ]);

  useEffect(() => {
    if (currentOrganization.sub_ecosystem_name) {
      const selectedSubEcosystem = subSegment.filter(
        subSegment => subSegment.name === currentOrganization.sub_ecosystem_name
      );

      //   console.log({ selectedSubEcosystem });

      if (selectedSubEcosystem.length > 0) {
        setSubEcosystemSubClass(selectedSubEcosystem[0].sub_class);
      }
    }
  }, [currentOrganization.sub_ecosystem_name, subSegment]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      if (values.num_supported_business === "Above 1000") {
        values.num_supported_business = values.num_supported_business_custom;
      }

      if (values.num_of_employees === "Above 1000") {
        values.num_of_employees = values.num_of_employees_custom;
      }

      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === values.ecosystem
      );

      const selectedSector = sectors.find(
        sector => sector.name.toLowerCase() === values.sector.toLowerCase()
      );

      let selectedSubEcosystem = [];

      if (file.compnay_logo.length) {
        delete currentOrganization.company_logo_url;
      }

      if (file.ceo_image.length) {
        delete currentOrganization.ceo_image_url;
      }

      let userData = {};

      if (currentOrganization.is_ecosystem) {
        selectedSubEcosystem = selectedEcosystem[0].sub_ecosystem.filter(
          sub_eco => sub_eco.name === values.sub_ecosystem
        );

        userData = {
          ...currentOrganization,
          ...values,
          sector: selectedSector.id,
          funding: values.funding_currency_value
            ? `${values.funding_currency_value}`
            : 0,
          company_logo: file.compnay_logo.length ? file.compnay_logo[0] : "",
          ceo_image: file.ceo_image[0],
          company_valuation: `${values.currency}${values.currency_value}`,
          ecosystem: selectedEcosystem[0].id,
          ecosystem_name: selectedEcosystem[0].name,
          sub_ecosystem: selectedSubEcosystem[0].id,
          sub_ecosystem_name: selectedSubEcosystem[0].name,
          sub_segment: selectedSubEcosystem[0].id,
          sub_ecosystem_sub_class: currSubClass ? currSubClass.id : null,
          sub_ecosystem_sub_class_name: currSubClass
            ? currSubClass.name
            : values.sub_ecosystem_sub_class,
          is_ecosystem: currentOrganization.is_ecosystem ? true : false,
          is_entrepreneur: currentOrganization.is_entrepreneur ? true : false,
        };
      } else {
        userData = {
          ...currentOrganization,
          ...values,
          company_logo: file.compnay_logo.length ? file.compnay_logo[0] : "",
          ceo_image: file.ceo_image[0],
          sector: selectedSector.id,
          company_valuation: `${values.currency}${values.currency_value}`,
          is_ecosystem: currentOrganization.is_ecosystem ? true : false,
          is_entrepreneur: currentOrganization.is_entrepreneur ? true : false,
        };
      }

      const formData = new FormData();

      for (const key in userData) {
        if (userData[key]) {
          formData.append(key, userData[key]);
        }
      }

      const res = await api.editOrganization(currentOrganization.id, formData);

      if (res.status >= 200 && res.status < 300) {
        setIsLoading(false);

        refetchUserProfile();

        Modal.success({
          title:
            "Organization Edited Successfully. You will get an email once its been approved.",
          onOk: () => closeModal(),
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

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

  const updateSubSegment = value => {
    setCurrEcosystem(value);
    const selectedEcosystem = ecosystem.filter(eco => eco.name === value);

    setSubSegment(selectedEcosystem[0].sub_ecosystem);
  };

  const ceo_name_label = currentOrganization.is_entrepreneur
    ? "CEO/Founder's Name"
    : "CEO/DG/Head/Founder's Name";

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

  return (
    <Modal
      title={<strong>Edit Organization Details</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button
          loading={isLoading}
          type="primary"
          key="edit"
          onClick={handleSubmit}
        >
          Edit
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        className="list-organization"
        initialValues={{
          ...currentOrganization,
          cac_doc: Number(currentOrganization.cac_doc),
          sector: currentOrganization.sector_name,
          ceo_name: currentOrganization.ceo_name.name,
          is_startUp: is_startUp ? "Yes" : "No",
          currency: "₦",
          //   currency_value: currentOrganization.currency_value,
          num_supported_business: +currentOrganization.num_supported_business,
          ecosystem: currentOrganization.ecosystem_name,
          sub_ecosystem: currentOrganization.sub_ecosystem_name,
          funding_currency: "₦",
          funding_currency_value: currentOrganization.funding,
          // num_of_employees: num_of_employees_custom
          //   ? "Above 1000"
          //   : currentOrganization.num_of_employees,
          // num_of_employees_custom: currentOrganization.num_of_employees,
          sub_ecosystem_sub_class:
            currentOrganization.sub_ecosystem_sub_class_name,
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
            {states.map(({ name, code }) => (
              <Option key={code} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* STATE */}

        {/* ECOSYTEM SEGMENT */}
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
              onChange={e => updateSubSegment(e)}
              placeholder="Ecosystem Segment"
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
        {currentOrganization.is_ecosystem && subSegment.length > 0 ? (
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
        {currentOrganization.is_ecosystem && subEcosystemSubClass.length > 0 ? (
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

        {currentOrganization.is_ecosystem &&
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
          <Select placeholder="Sector" allowClear>
            {sectors.map((sector, i) => (
              <Option key={i} value={sector.name.toLowerCase()}>
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

        {/* COMPANY VALUATION */}
        {currentOrganization.is_entrepreneur && is_startUp && (
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

        {/* NUMBER OF JOBS CREATED */}
        {currentOrganization.is_entrepreneur && (
          <Form.Item
            name="no_of_jobs"
            rules={[
              { type: "number", message: "Only numbers are allowed" },
              {
                message: "Please enter the number of employees!",
                required: true,
              },
            ]}
          >
            <InputNumberStyled placeholder="Number of Employees" size="large" />
          </Form.Item>
        )}
        {/* NUMBER OF JOBS CREATED */}

        {/* NUMBER OF SUPPORTED BUSINESSES */}
        {currentOrganization.is_ecosystem && (
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
              type="number"
            />
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

        <Form.Item
          name="cac_doc"
          style={{ width: "100%" }}
          rules={[
            { type: "number", message: "Only numbers are allowed" },
            {
              message: "Please input your Business RC Number!",
              required: true,
            },
          ]}
        >
          <InputNumberStyled placeholder="Business RC Number" />
        </Form.Item>

        {currentOrganization.is_entrepreneur && (
          <Form.Item name="funding" style={{ marginBottom: 0 }}>
            <InputGroup compact style={{ display: "flex" }}>
              <Form.Item name="funding_currency">
                <Select>
                  <Option value="₦">₦</Option>
                  {/* <Option value="$">$</Option> */}
                </Select>
              </Form.Item>

              <Form.Item
                name="funding_currency_value"
                style={{ width: "100%" }}
                rules={[
                  { type: "number", message: "Only numbers are allowed" },
                  {
                    message: "Please enter funding!",
                    required: true,
                  },
                ]}
              >
                <InputNumberStyled
                  size="large"
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\bNGN\s?|(,*)/g, "")}
                  placeholder="Total Funding raised so far"
                />
              </Form.Item>
            </InputGroup>
          </Form.Item>
        )}

        <StyledFormItem name="company_logo">
          {file.compnay_logo.length === 0 ? (
            <StyledImage
              className="styled-img"
              width={50}
              height={50}
              src={currentOrganization.company_logo_url}
              alt={currentOrganization.name}
              rounded
            />
          ) : null}
          <Upload
            className="upload-wrapper"
            {...companyLogoProps}
            listType="picture"
          >
            <UploadButtonStyled size="large">
              Upload Company Logo <UploadIcon />
            </UploadButtonStyled>
          </Upload>
        </StyledFormItem>

        <StyledFormItem name="company_logo">
          {file.ceo_image.length === 0 ? (
            <StyledImage
              className="styled-img"
              width={50}
              height={50}
              src={currentOrganization.ceo_image_url}
              alt={currentOrganization.ceo_name.name}
              rounded
            />
          ) : null}
          <Upload
            className="upload-wrapper"
            {...ceoImageProps}
            listType="picture"
          >
            <UploadButtonStyled size="large">
              Upload CEO/Founder Image <UploadIcon />
            </UploadButtonStyled>
          </Upload>
        </StyledFormItem>

        <Form.Item name="description">
          <InputStyled.TextArea placeholder="Organization Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditListedOrganization;
