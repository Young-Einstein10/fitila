import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Modal } from "antd";
import styled from "styled-components";
import Heading from "../../components/heading/heading";
import { useApiContext } from "../../context";
import { AuthWrapper, InputStyled } from "../Styles";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg] = useState("");

  const [form] = Form.useForm();
  const { auth: api } = useApiContext();

  const handleSubmit = async () => {
    try {
      const values = (await form.validateFields()) as { email: string };

      setIsLoading(true);

      const { status, data } = await api.forgotPassword(values);

      console.log(data);

      if (status >= 200 && status < 300) {
        setIsLoading(false);

        Modal.success({
          title: "A reset link has to been sent to your email.",
        });
      }
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

        {msg && (
          <StyledAlert className="mt-3 mb-0 text-center" color="success">
            A Reset Link Has been sent to your email to change your password
          </StyledAlert>
        )}
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;

const StyledAlert = styled.div`
  margin-top: 3rem;
  text-align: center;
  background-color: #68b77a;
  border: 2px solid #68b77a;
  border-radius: 8px;
  padding: 1rem;
`;
