import { Button, Form } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { AuthWrapper, InputStyled } from "../Styles";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const handleSubmit = () => {
    try {
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="forgot-passsword"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading as="h2" className="text-center">
            Forgot Password
          </Heading>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid E-mail!",
              },
              {
                message: "Please input your Email!",
                required: true,
              },
            ]}
          >
            <InputStyled placeholder="Email Address" />
          </Form.Item>

          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
            >
              Send
            </Button>
          </Form.Item>

          <p className="auth-notice">
            Don&rsquo;t have an account?{" "}
            <NavLink to="/signup">Sign up here</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
