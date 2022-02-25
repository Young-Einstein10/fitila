import React, { FC, useEffect, useState } from "react";
import { Modal, Form, Select, Tooltip, Upload, Button } from "antd";
import { InputNumberStyled, InputStyled } from "../../../../../Styles";
import {
  useApiContext,
  useEcosystemContext,
  useOrganizationContext,
  useSectorContext,
} from "../../../../../../context";
import states from "../../../../../../states.json";
import { IOrganizationProps } from "../../../../../../context/Organization/types";
import { UploadButtonStyled } from "../../../../../Business/_partials/ListOrganization/_partials/Uploads/styled";
import { ReactComponent as UploadIcon } from "../../../../../../static/svg/upload.svg";
import styled from "styled-components";
import { businessLevels } from "../../../../../../utils/helpers";
import { StyledImage } from "../../../../../../components/styledImage";
import {
  ISubclassProps,
  ISubEcosystem,
} from "../../../../../../context/Ecosystem/types";

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = InputStyled.Group;

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
  const [isLoading, setIsLoading] = useState(false);
  const [currOrganization, setCurrOrganization] = useState({
    ...currentOrganization,
  });
  const [subSegment, setSubSegment] = useState<ISubEcosystem[]>([]);
  const [currEcosystem, setCurrEcosystem] = useState("");
  const [num_supported_business] = useState();
  // const [selectedSubEcosystem, setSelectedSubEcosystem] = useState(null);
  const [subEcosystemSubClass, setSubEcosystemSubClass] = useState<
    ISubclassProps[]
  >([]);
  const [currSubClass, setCurrSubClass] = useState<ISubclassProps>(null);
  const [is_startUp, setIs_Startup] = useState(false);
  const { updateOrganization } = useOrganizationContext();
  const { data: ecosystem } = useEcosystemContext();
  const { data: sectors } = useSectorContext();
  const [file, setFile] = useState({
    ceo_image: [],
    compnay_logo: [],
  });

  const [form] = Form.useForm();

  const { organization: api } = useApiContext();

  useEffect(() => {
    if (currOrganization.ecosystem_name) {
      setCurrEcosystem(currOrganization.ecosystem_name);
      const selectedEcosystem = ecosystem.filter(
        eco => eco.name === currOrganization.ecosystem_name
      );

      setSubSegment(selectedEcosystem[0].sub_ecosystem);
    }

    if (currOrganization.is_startup) {
      setIs_Startup(currOrganization.is_startup);
    }
  }, [currOrganization.ecosystem_name, currOrganization.is_startup, ecosystem]);

  useEffect(() => {
    if (currOrganization.sub_ecosystem_name) {
      const selectedSubEcosystem = subSegment.filter(
        subSegment => subSegment.name === currOrganization.sub_ecosystem_name
      );

      if (selectedSubEcosystem.length > 0) {
        setSubEcosystemSubClass(selectedSubEcosystem[0].sub_class);
      }
    }
  }, [currOrganization.sub_ecosystem_name, subSegment]);

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
        delete currOrganization.company_logo_url;
      }

      if (file.ceo_image.length) {
        delete currOrganization.ceo_image_url;
      }

      let userData: any = {};

      if (currOrganization.is_ecosystem) {
        selectedSubEcosystem = selectedEcosystem[0].sub_ecosystem.filter(
          sub_eco => sub_eco.name === values.sub_ecosystem
        );

        userData = {
          ...currOrganization,
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
          is_entrepreneur:
            values.business_role === "Enterpreneur" ? true : false,
          is_ecosystem:
            values.business_role === "Ecosystem Player" ? true : false,
        };
      } else {
        userData = {
          ...currOrganization,
          ...values,
          company_logo: file.compnay_logo.length ? file.compnay_logo[0] : "",
          ceo_image: file.ceo_image[0],
          sector: selectedSector.id,
          company_valuation: `${values.currency}${values.currency_value}`,
          is_entrepreneur:
            values.business_role === "Enterpreneur" ? true : false,
          is_ecosystem:
            values.business_role === "Ecosystem Player" ? true : false,
        };
      }

      const { ceo_image, company_logo, ...rest } = userData;

      const formData = new FormData();

      if (file.ceo_image.length === 0 || file.compnay_logo.length === 0) {
        for (const key in rest) {
          if (rest[key]) {
            formData.append(key, userData[key]);
          }
        }
      } else {
        for (const key in userData) {
          if (userData[key]) {
            formData.append(key, userData[key]);
          }
        }
      }

      const { status, data } = await api.editOrganization(
        currOrganization.id,
        formData
      );

      if (status >= 200 && status < 300) {
        setIsLoading(false);

        updateOrganization({ ...data.data });

        Modal.success({
          title: "Organization edited successfully!",
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

  const handleBusinessRole = val => {
    console.log(val);

    const is_entrepreneur = val === "Enterpreneur" ? true : false;
    const is_ecosystem = val === "Ecosystem Player" ? true : false;

    setCurrOrganization({
      ...currOrganization,
      is_entrepreneur,
      is_ecosystem,
    });
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

  const ceo_name_label = currOrganization.is_entrepreneur
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

  const { is_entrepreneur, is_ecosystem } = currOrganization;

  return (
    <Modal
      visible={visible}
      onCancel={closeModal}
      title={<strong>Edit Organization</strong>}
      footer={[
        <Button key="cancel" onClick={() => closeModal()}>
          Cancel
        </Button>,
        <Button
          loading={isLoading}
          type="primary"
          key="edit"
          onClick={() => handleSubmit()}
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
          ...currOrganization,
          business_role:
            (is_ecosystem && "Ecosystem Player") ||
            (is_entrepreneur && "Enterpreneur") ||
            "--",
          cac_doc: Number(currOrganization.cac_doc),
          sector: currOrganization.sector_name,
          ceo_name: currOrganization.ceo_name.name,
          is_startUp: is_startUp ? "Yes" : "No",
          currency: "₦",
          num_supported_business: +currOrganization.num_supported_business,
          ecosystem: currOrganization.ecosystem_name,
          sub_ecosystem: currOrganization.sub_ecosystem_name,
          funding_currency: "₦",
          funding_currency_value: currOrganization.funding,
          sub_ecosystem_sub_class:
            currOrganization.sub_ecosystem_sub_class_name,
        }}
      >
        {/* BUSINESS NAME */}
        <Form.Item
          name="name"
          rules={[
            {
              message: "Please input your business name",
              required: false,
            },
          ]}
        >
          <InputStyled placeholder="Business Name" />
        </Form.Item>
        {/* BUSINESS NAME */}

        {/* BUSINESS ROLE */}
        <Form.Item
          name="business_role"
          rules={[
            {
              message: "Please select your business role",
              required: true,
            },
          ]}
        >
          <Select
            onChange={val => handleBusinessRole(val)}
            placeholder="Business Role"
          >
            <Option value="Enterpreneur">Enterpreneur</Option>
            <Option value="Ecosystem Player">Ecosystem Player</Option>
          </Select>
        </Form.Item>
        {/* BUSINESS ROLE */}

        {/* CEO/FOUNDER"S NAME */}
        <Form.Item
          name="ceo_name"
          rules={[
            {
              message: `Please input your ${ceo_name_label}`,
              required: false,
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
              required: false,
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
              required: false,
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
              required: false,
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
        {currOrganization.is_ecosystem && (
          <Form.Item
            name="ecosystem"
            rules={[
              {
                message: "Please select an ecosystem segment!",
                required: false,
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
        {currOrganization.is_ecosystem && subSegment.length > 0 ? (
          <Form.Item
            name="sub_ecosystem"
            rules={[
              {
                message: "Please select an ecosystem sub-segment!",
                required: false,
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
        {currOrganization.is_ecosystem && subEcosystemSubClass.length > 0 ? (
          <Form.Item
            name="sub_ecosystem_sub_class"
            rules={[
              {
                message: "Please select a sub-segment class!",
                required: false,
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

        {currOrganization.is_ecosystem &&
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
                      required: false,
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
              required: false,
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
        {currOrganization.is_entrepreneur && (
          <Form.Item
            name="business_level"
            rules={[
              {
                message: "Please select your business level!",
                required: false,
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
        {currOrganization.is_entrepreneur && is_startUp && (
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
                    required: false,
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
        {currOrganization.is_entrepreneur && (
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
        {currOrganization.is_ecosystem && (
          <Form.Item
            name="num_supported_business"
            rules={[
              { type: "number", message: "Only numbers are allowed" },
              {
                message:
                  "Please input the number of businesses you've supported!",
                required: false,
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
        {currOrganization.is_ecosystem &&
          num_supported_business === "Above 1000" && (
            <Form.Item
              name="num_supported_business_custom"
              rules={[
                {
                  message:
                    "Please input the number of businesses you've supported!",
                  required: false,
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
              required: false,
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
              required: false,
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
              required: false,
            },
          ]}
        >
          <InputNumberStyled placeholder="Business RC Number" />
        </Form.Item>

        {currOrganization.is_entrepreneur && (
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
                    required: false,
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
              src={currOrganization.company_logo_url}
              alt={currOrganization.name}
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
              src={currOrganization.ceo_image_url}
              alt={currOrganization.ceo_name.name}
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
          <InputStyled.TextArea
            placeholder="Organization Description"
            rows={6}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditOrganizationModal;
