import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { NavLink, useRouteMatch } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { useApiContext } from "../../context";
import { AuthWrapper, InputStyled } from "../Styles";
import ErrorComponent from "../../components/errorComponent";

const ConfirmPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [form] = Form.useForm();
  const { auth: api } = useApiContext();

  const {
    params: { token },
  } = useRouteMatch<{ token: string }>();

  const handleSubmit = async () => {
    try {
      setErrors([]);
      const values = (await form.validateFields()) as { password: string };
      setIsLoading(true);

      const { status } = await api.confirmPassword({ ...values, token });

      if (status >= 200 && status < 300) {
        setIsLoading(false);

        Modal.success({
          title: "Your password has been changed successfully.",
        });

        form.resetFields();
      }
    } catch (error) {
      setIsLoading(false);

      setErrors(error.response.data.password);
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
            rules={[
              { message: "Please input your password", required: true },
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

export default ConfirmPassword;
