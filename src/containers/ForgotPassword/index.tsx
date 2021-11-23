import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Modal } from "antd";
import Heading from "../../components/heading/heading";
import { useApiContext } from "../../context";
import { AuthWrapper, InputStyled } from "../Styles";
import ErrorComponent from "../../components/errorComponent";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [form] = Form.useForm();
  const { auth: api } = useApiContext();

  const handleSubmit = async () => {
    try {
      setErrors([]);

      const values = (await form.validateFields()) as { email: string };

      setIsLoading(true);

      const { status } = await api.forgotPassword(values);

      if (status >= 200 && status < 300) {
        setIsLoading(false);

        Modal.success({
          title: "A reset link has to been sent to your email.",
        });

        form.resetFields();
      }
    } catch (error) {
      setIsLoading(false);

      setErrors(error.response.data.email);
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

        {errors.length ? (
          <ErrorComponent className="custom-error-component">
            {errors.map((error, i) => (
              <li key={error.substr(0, 4) + i}>{error}</li>
            ))}
          </ErrorComponent>
        ) : null}
      </div>
    </AuthWrapper>
  );
};

export default ForgotPassword;
