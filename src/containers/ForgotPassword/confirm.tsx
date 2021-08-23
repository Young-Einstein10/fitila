import React, { useState } from "react";
import { Button, Form } from "antd";
import { NavLink, useRouteMatch } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { useApiContext } from "../../context";
import { AuthWrapper, InputStyled } from "../Styles";
import styled from "styled-components";

const ConfirmPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [form] = Form.useForm();
  const { auth: api } = useApiContext();

  const {
    params: { token },
  } = useRouteMatch<{ token: string }>();

  const handleSubmit = async () => {
    try {
      const values = (await form.validateFields()) as { password: string };
      setIsLoading(true);

      const { status, data } = await api.confirmPassword({ ...values, token });

      console.log(data);

      if (status >= 200 && status < 300) {
        setIsLoading(false);
        setMsg("Your password has been changed successfully.");
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
            Enter New Password
          </Heading>

          <Form.Item
            name="password"
            rules={[{ message: "Please input your password", required: true }]}
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

export default ConfirmPassword;

const StyledAlert = styled.div`
  margin-top: 3rem;
  text-align: center;
  background-color: #68b77a;
  border: 2px solid #68b77a;
  border-radius: 8px;
  padding: 1rem;
`;
