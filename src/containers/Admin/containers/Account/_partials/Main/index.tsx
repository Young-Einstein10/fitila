import React from "react";
import { Row, Col, Select, Button, Form, Upload } from "antd";
import { ReactComponent as UnknownAvatar } from "../../../../../../static/svg/unknownAvatar.svg";

import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import { InputStyled } from "../../../../../Styles";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";

const { Option } = Select;

const content = (
  <>
    <NavLink to="#">
      <FeatherIcon size={16} icon="printer" />
      <span>Printer</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="book-open" />
      <span>PDF</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file-text" />
      <span>Google Sheets</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="x" />
      <span>Excel (XLSX)</span>
    </NavLink>
    <NavLink to="#">
      <FeatherIcon size={16} icon="file" />
      <span>CSV</span>
    </NavLink>
  </>
);

export const ModifyAccount = () => (
  <Cards title="Modify Account Role" more={content}>
    <Row>
      <Col span={12}>
        <div>
          <p>
            Tempus egestas diam elit, vitae vel vulputate quis magna ut. Feugiat
            enim neque velit dictumst odio nibh. Nam ultrices dui congue id
            augue arcu. E
          </p>
        </div>

        <Form name="modyfyAccount" layout="vertical">
          <Form.Item name="state" label="Modify Your Role">
            <Select placeholder="State" defaultValue="Researcher" allowClear>
              <Option value="male">Researcher</Option>
              <Option value="female">Manager</Option>
              <Option value="other">CEO</Option>
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
  <Cards title="Deactivate" more={content}>
    <Row>
      <Col span={16}>
        <div>
          <p>
            Are you sure you want to deactivate your account? We put a lot into
            the work we do, and, we’ll be sad to see you leave, if there is
            anything you want us to help you with, please contact us here
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

export const Security = () => (
  <Cards title="Security" more={content}>
    <Row>
      <Col span={24}>
        <Form name="security" layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="password" label="Old Password">
                <InputStyled.Password placeholder="Password" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="password" label="New Password">
                <InputStyled.Password placeholder="Password" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="password" label="Confirm Password">
                <InputStyled.Password placeholder="Password" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
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

export const Profile = () => (
  <Cards title="Your Profile" more={content}>
    <Row>
      <Col span={24}>
        <div
          style={{ display: "flex", alignItems: "center", padding: "20px 0" }}
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
            <Upload>Upload Image</Upload>
          </div>
        </div>

        <div style={{ padding: "2rem 0px 10px" }}>
          <Form name="profile" layout="vertical">
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  name="firstname"
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

              <Col span={8}>
                <Form.Item
                  name="lastname"
                  label="Lastname"
                  rules={[
                    { message: "Please input your lastname !", required: true },
                  ]}
                >
                  <InputStyled placeholder="Last Name" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { message: "Please input your Email!", required: true },
                  ]}
                >
                  <InputStyled placeholder="Email Address" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item name="phone" label="Phone Number">
                  <InputStyled placeholder="Phone Number" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { message: "Please input your Email!", required: true },
                  ]}
                >
                  <InputStyled placeholder="Email Address" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                className="btn-signin"
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
