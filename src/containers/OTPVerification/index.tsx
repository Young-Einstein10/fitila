import React, { useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Button, Form, message, Modal } from "antd";
import { AuthWrapper, InputStyled } from "../Styles";
import Heading from "../../components/heading/heading";
import { useApiContext } from "../../context";
import { IUserData } from "../../context/Api/auth";

const OTPVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [msg, setMsg] = useState("");

  const [form] = Form.useForm();
  const { auth: api } = useApiContext();

  const history = useHistory();
  const {
    state: { email },
  } = useLocation<IUserData>();

  const handleSubmit = async () => {
    try {
      const values = (await form.validateFields()) as { otp: string };

      setIsLoading(true);

      const { status, data } = await api.verifyOTP(values.otp);

      console.log(data);

      if (status >= 200 && status < 300) {
        setIsLoading(false);

        Modal.success({
          title: <strong>Account Verified!</strong>,
          content:
            "Your Account Has Been Created Successfully. Please login to access the Dashboard.",
          onOk: () => history.push("/signin"),
          okText: "Signin",
        });
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleOTPResend = async e => {
    e.preventDefault();

    try {
      const { status, data } = await api.resendOTP(email);

      console.log(data);

      if (status >= 200 && status < 300) {
        message.success("OTP Verification has been resent successfully.", 5);
      }
    } catch (error) {
      console.log(error);
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
            Enter OTP
          </Heading>

          <Form.Item
            label={<strong>Enter OTP Code Sent to your email</strong>}
            name="otp"
            rules={[
              {
                message: "code has to be at least 6 digits!",
                len: 6,
              },
              {
                message: "Please input otp code!",
                required: true,
              },
            ]}
            style={{ marginBottom: "5px" }}
          >
            <InputStyled placeholder="Enter OTP" />
          </Form.Item>

          <div className="auth-form-action" style={{ marginBottom: "1.5rem" }}>
            <NavLink
              className="forgot-pass-link"
              to="/forgot-password"
              onClick={handleOTPResend}
            >
              resend OTP verification code.
            </NavLink>
          </div>

          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
            >
              Save
            </Button>
          </Form.Item>

          <p className="auth-notice">
            Don&rsquo;t have an account?{" "}
            <NavLink to="/signup">Sign up here</NavLink>
          </p>
        </Form>

        {/* {msg && (
            <StyledAlert className="mt-3 mb-0 text-center" color="success">
              A Reset Link Has been sent to your email to change your password
            </StyledAlert>
          )} */}
      </div>
    </AuthWrapper>
  );
};

export default OTPVerification;
