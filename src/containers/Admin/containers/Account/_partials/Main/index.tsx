import React, { FC, useState } from "react";
import { Row, Col, Select, Button, Form, Upload, notification } from "antd";
import { ReactComponent as UnknownAvatar } from "../../../../../../static/svg/unknownAvatar.svg";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { InputStyled } from "../../../../../Styles";
import { NavLink } from "react-router-dom";
import { ViewProfileBtnStyled } from "../../../Dashboard/styled";
import { IUserProps } from "../../../../../../context/Auth/types";
import { useApiContext } from "../../../../../../context";
import { IPasswordProps } from "../../../../../../context/Api/auth";

const { Option } = Select;

export const ModifyAccount = () => (
  <Cards title="Modify Account Role">
    <Row>
      <Col span={12}>
        <div>
          <p>
            Tempus egestas diam elit, vitae vel vulputate quis magna ut. Feugiat
            enim neque velit dictumst odio nibh. Nam ultrices dui congue id
            augue arcu. E
          </p>
        </div>

        <Form
          initialValues={{ role: "Researcher" }}
          name="modyfyAccount"
          layout="vertical"
        >
          <Form.Item name="role" label="Modify Your Role">
            <Select placeholder="State" allowClear>
              <Option value="Researcher">Researcher</Option>
              <Option value="Manager">Manager</Option>
              <Option value="CEO">CEO</Option>
            </Select>
          </Form.Item>
        </Form>

        <Button
          className="btn-signin"
          htmlType="submit"
          type="primary"
          size="large"
        >
          Save Changes
        </Button>
        <p></p>
      </Col>
    </Row>
  </Cards>
);

export const Deactivate = () => (
  <Cards title="Deactivate">
    <Row>
      <Col span={16}>
        <div>
          <p>
            Are you sure you want to deactivate your account? We put a lot into
            the work we do, and, we’ll be sad to see you leave, if there is
            anything you want us to help you with, please{" "}
            <NavLink
              to="/d/contact"
              style={{
                textDecoration: "underline",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              contact us here
            </NavLink>
          </p>
        </div>

        <Form name="Deactivate" layout="vertical">
          <Form.Item name="password" label="We’re open to suggestions">
            <InputStyled.TextArea placeholder="Send Us a Message" />
          </Form.Item>
        </Form>

        <Button
          type="link"
          className="font-weight-700"
          style={{ fontSize: "16px", color: "#1D429C" }}
        >
          <span style={{ textDecoration: "underline" }}>
            Deactivate my Account
          </span>
        </Button>
        <p></p>
      </Col>
    </Row>
  </Cards>
);

const Security = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const { auth } = useApiContext();

  const handleSubmit = async values => {
    try {
      const values = (await form.validateFields()) as IPasswordProps;
      setIsLoading(true);

      const { status, data } = await auth.resetPassword(values);

      console.log({ status, data });

      if (status >= 200 && status < 300) {
        setIsLoading(false);

        notification.success({
          message: "Your password has been changed successfully!",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Cards title="Security">
      <Row>
        <Col span={24}>
          <Form
            form={form}
            onFinish={handleSubmit}
            name="security"
            layout="vertical"
            scrollToFirstError
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item
                  name="old_password"
                  label="Old Password"
                  rules={[
                    {
                      message: "Please Enter your old password",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled.Password placeholder="Password" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item
                  name="new_password"
                  label="New Password"
                  rules={[
                    {
                      message: "Please Enter your new password",
                      required: true,
                    },
                  ]}
                >
                  <InputStyled.Password placeholder="Password" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8}>
                <Form.Item
                  name="confirm_password"
                  label="Confirm Password"
                  dependencies={["new_password"]}
                  rules={[
                    {
                      message: "Please confirm your new password",
                      required: true,
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <InputStyled.Password placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                loading={isLoading}
                className="btn-signin"
                htmlType="submit"
                type="primary"
                size="large"
              >
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Cards>
  );
};

const Profile: FC<{ user: IUserProps }> = ({
  user: { phone, email, first_name, last_name },
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async values => {
    try {
      const values = await form.validateFields();
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Cards title="Your Profile">
      <Row>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            <div
              className="user-avatar"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // marginLeft: "15px",
              }}
            >
              <UnknownAvatar />
              <span style={{ marginTop: "10px" }}>Change Avatar</span>
            </div>

            <div style={{ marginLeft: "4rem" }} className="uplosd-btn-wrapper">
              <Upload>
                <ViewProfileBtnStyled size="large">
                  Upload Image
                </ViewProfileBtnStyled>
              </Upload>
            </div>
          </div>

          <div style={{ padding: "2rem 0px 10px" }}>
            <Form
              form={form}
              onFinish={handleSubmit}
              initialValues={{ first_name, last_name, email, phone }}
              name="profile"
              layout="vertical"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item
                    name="first_name"
                    label="Firstname"
                    rules={[
                      {
                        message: "Please input your firstname !",
                        required: true,
                      },
                    ]}
                  >
                    <InputStyled placeholder="First Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item
                    name="last_name"
                    label="Lastname"
                    rules={[
                      {
                        message: "Please input your lastname !",
                        required: true,
                      },
                    ]}
                  >
                    <InputStyled placeholder="Last Name" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        message: "Please input your Email!",
                        required: true,
                      },
                    ]}
                  >
                    <InputStyled placeholder="Email Address" />
                  </Form.Item>
                </Col>

                {/* <Col xs={24} sm={24} md={12} lg={8}>
                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                      {
                        message: "Please input your Phone Number!",
                        required: true,
                      },
                    ]}
                  >
                    <InputStyled placeholder="Phone Number" />
                  </Form.Item>
                </Col> */}
              </Row>

              <Form.Item>
                <Button
                  className="edit-account-btn"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </Cards>
  );
};

export { Profile, Security };
