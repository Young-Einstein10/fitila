import React, { FC, useContext, useState } from "react";
import { Select, Upload, Row, Col, message } from "antd";
import {
  ButtonStyled,
  InputNumberStyled,
  InputStyled,
} from "../../../../../Styles";
import { FormStyled as Form } from "../../styled";
import { BusinessContext } from "../../../../context";
import { ReactComponent as UploadIcon } from "../../../../../../static/svg/upload.svg";
import { UploadButtonStyled } from "./styled";

const InputGroup = InputStyled.Group;
const Option = Select.Option;

interface IUploadProps {
  prev: () => void;
  next: () => void;
}

const Uploads: FC<IUploadProps> = ({ prev, next }) => {
  // const [num_of_employees_custom, setNum_of_employees_custom] = useState();
  const [file, setFile] = useState({
    ceo_image: [],
    compnay_logo: [],
  });

  const [form] = Form.useForm();

  const { state, setState } = useContext(BusinessContext);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (values.num_of_employees === "Above 1000") {
        values.num_of_employees = values.num_of_employees_custom;
      }

      const userData = {
        ...state,
        ...values,
        funding: values.funding_currency_value
          ? `${values.funding_currency_value}`
          : 0,
        company_logo: file.compnay_logo.length ? file.compnay_logo[0] : "",
        ceo_image: file.ceo_image[0],
      };

      console.log(userData);

      setState(prevState => ({ ...prevState, ...userData }));

      next();
    } catch (error) {
      console.log(error);
    }
  };

  // const onNumberOfEmployeesChange = value => {
  //   setNum_of_employees_custom(value);
  // };

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
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return false;
      }

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
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
        return false;
      }

      setFile(state => ({
        ...state,
        compnay_logo: [...state.compnay_logo, file],
      }));
      return false;
    },
    fileList: file.compnay_logo,
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="uploads"
      layout="vertical"
      scrollToFirstError
      initialValues={{
        ...state,
        funding_currency: state.funding_currency || "₦",
        funding_currency_value: state.funding,
        // num_of_employees: num_of_employees_custom
        //   ? "Above 1000"
        //   : state.num_of_employees,
        num_of_employees_custom: state.num_of_employees,
      }}
    >
      <Form.Item name="company_logo">
        <Upload {...companyLogoProps} listType="picture">
          <UploadButtonStyled size="large">
            Upload Company Logo <UploadIcon />
          </UploadButtonStyled>
        </Upload>
      </Form.Item>

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
          <UploadButtonStyled size="large">
            Upload CEO/Founder Image <UploadIcon />
          </UploadButtonStyled>
        </Upload>
      </Form.Item>

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

      {/* <Form.Item
        name="num_of_employees"
        rules={[
          {
            message: "Please select an option!",
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Number of Employees"
          onChange={e => onNumberOfEmployeesChange(e)}
          allowClear
        >
          <Option value="1-100">0-9</Option>
          <Option value="101-200">10-49</Option>
          <Option value="201-300">50-100</Option>
          <Option value="301-400">100+</Option>
        </Select>
      </Form.Item> */}
      {/* 
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
          <InputStyled placeholder="Number of Employees" type="number" />
        </Form.Item>
      )} */}

      {state.business_type === "Entrepreneur" && (
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

      <Form.Item
        name="description"
        rules={[
          {
            message: "please enter company description!",
            required: true,
          },
        ]}
      >
        <InputStyled.TextArea placeholder="Organization Description" />
      </Form.Item>

      <Row gutter={8}>
        <Col span={12}>
          <Form.Item>
            <ButtonStyled type="primary" size="large" onClick={() => prev()}>
              Previous
            </ButtonStyled>
          </Form.Item>
        </Col>

        <Col span={12}>
          <ButtonStyled htmlType="submit" type="primary" size="large">
            Next
          </ButtonStyled>
        </Col>
      </Row>
      {/* 
                <SpanFooter>
                  Please note, each upload cannot be larger than 20 MB, Document
                  type allowed: PDF, Docx and Xcel
                </SpanFooter> */}
    </Form>
  );
};

export default Uploads;
