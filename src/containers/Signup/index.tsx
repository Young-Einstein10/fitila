import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Form, Button, Select, notification } from "antd";
import { ReactComponent as Facebook } from "../../static/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../static/svg/instagram.svg";

import { AuthWrapper } from "../Styles";
import Heading from "../../components/heading/heading";
import { InputStyled } from "../Styles";
import { useAuthContext } from "../../context";
import { IUserData } from "../../context/Api/auth";

const { Option } = Select;

const Signup = ({ signupUser, history, auth }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { signup } = useAuthContext();

  const handleSubmit = async values => {
    try {
      const values = (await form.validateFields()) as IUserData;
      setIsLoading(true);

      const res = await signup(values);

      if (res.status >= 200) {
        notification.success({
          message:
            "Your Account Has Been Created Successfully. Please login to access the Dashboard.",
        });
        setIsLoading(false);
        history.push("/login");
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="signup"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading className="text-center">Sign Up</Heading>

          <Form.Item
            name="first_name"
            rules={[
              { message: "Please input your firstname!", required: true },
            ]}
          >
            <InputStyled placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[{ message: "Please input your lastname!", required: true }]}
          >
            <InputStyled placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail!",
              },
              { message: "Please input your Email!", required: true },
            ]}
          >
            <InputStyled placeholder="Email Address" />
          </Form.Item>

          {/* <Form.Item
            name="phone"
            rules={[
              {
                message: "Please input phone number !",
                required: true,
              },
            ]}
          >
            <InputStyled placeholder="Phone Number" />
          </Form.Item> */}

          <Form.Item
            name="role"
            rules={[{ message: "Please Select a role", required: true }]}
          >
            <Select placeholder="Choose Your Role" allowClear>
              <Option value="Enterpreneur">Enterpreneur</Option>
              <Option value="Ecosystem Enabler">Ecosystem Player</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ message: "Please enter your password", required: true }]}
          >
            <InputStyled.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
            >
              Sign Up
            </Button>
          </Form.Item>

          <p className="auth-notice">
            Signed Up Already? <NavLink to="/signin">Signin in here</NavLink>
          </p>

          <ul className="social-login">
            <li>
              <Link className="facebook-sign" to="#">
                <Twitter />
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <Facebook />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <Instagram />
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <LinkedIn />
              </Link>
            </li>
          </ul>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
