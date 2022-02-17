import React, { useState } from "react";
import { Form, Select, Button } from "antd";
import { NavLink } from "react-router-dom";
import { AuthWrapper, SocialSigninWrapper } from "../Styles";
import { GoogleLogin } from "react-google-login";
import Heading from "../../components/heading/heading";
import { InputStyled } from "../Styles";
import { useApiContext, useAuthContext } from "../../context";
import { IUserData } from "../../context/Api/auth";
import { GoogleIcon } from "../../components/svgs";

const { Option } = Select;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Signup = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { signup } = useAuthContext();
  const { setApiHeaders, auth: api } = useApiContext();

  const { setAuth } = useAuthContext();

  const handleSubmit = async values => {
    try {
      const values = (await form.validateFields()) as IUserData;
      setIsLoading(true);

      const res = await signup(values);

      const { access, refresh, is_admin, ...rest } = res.data.data;

      if (res.status >= 200) {
        history.push("/otpverification", { userDetails: { ...rest } });
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  const googleResponse = async response => {
    try {
      console.log(response);
      setIsLoading(true);

      const {
        tokenObj: { id_token },
      } = response;

      const { status, data } = await api.googleSignin(id_token);

      if (status >= 200 && status < 300) {
        const { access } = data;

        localStorage.setItem("userData", JSON.stringify(data));

        setApiHeaders(access);

        setAuth({
          isAuthenticated: true,
          user: data,
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onFailure = error => {};

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
            rules={[
              { message: "Please enter your password", required: true },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
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

          <SocialSigninWrapper>
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={googleResponse}
              onFailure={onFailure}
              render={renderProps => (
                <Button
                  icon={<GoogleIcon />}
                  className="google-signin-btn"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  {...renderProps}
                >
                  Sign Up with Google
                </Button>
              )}
            />
          </SocialSigninWrapper>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
