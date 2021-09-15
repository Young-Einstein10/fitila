import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { NavLink } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { ReactComponent as FacebookIcon } from "../../static/svg/facebook.svg";
import { useApiContext, useAuthContext } from "../../context";
import { useMountedState } from "../../utils/hooks";
import { InputStyled, AuthWrapper } from "../Styles";
import { GoogleIcon } from "../../components/svgs";
import styled from "styled-components";

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = ({ history, location }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const { state } = location;

  const { setApiHeaders, auth: api } = useApiContext();
  const isMounted = useMountedState();

  const { setAuth, login, auth } = useAuthContext();

  useEffect(() => {
    if (isMounted()) {
      if (auth.isAuthenticated && auth.user) {
        if (state && state.next) {
          history.push(state.next);
        } else {
          history.push("/d");
        }
      }
    }
  }, [auth, state, history, isMounted]);

  const handleSubmit = async values => {
    setIsLoading(true);
    // console.log(values);
    try {
      const res = await login(values);

      if (res && res.status && res.status === 200) {
        const {
          data: { data },
        } = res;

        const { access } = data;

        localStorage.setItem("userData", JSON.stringify(data));

        setApiHeaders(access);

        setAuth({
          isAuthenticated: true,
          user: data,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

  const facebookResponse = response => {
    console.log({ response });
  };

  const onFailure = error => {
    console.log(error);
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="signin"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading className="text-center">Sign In</Heading>
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

          <Form.Item
            name="password"
            rules={[{ message: "Please input your password", required: true }]}
          >
            <InputStyled.Password placeholder="Password" />
          </Form.Item>

          <div className="auth-form-action">
            {/* <Checkbox>Remember Me</Checkbox> */}
            <NavLink className="forgot-pass-link" to="/forgot-password">
              Forgot password?
            </NavLink>
          </div>

          <Form.Item className="btn-signin-wrapper">
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
            >
              Sign In
            </Button>
          </Form.Item>

          <p className="auth-notice">
            Don&rsquo;t have an account?{" "}
            <NavLink to="/signup">Sign up here</NavLink>
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
                  Signin with Google
                </Button>
              )}
            />

            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              fields="name,email,picture"
              callback={facebookResponse}
              autoLoad
              render={renderProps => (
                <Button
                  icon={<FacebookIcon />}
                  className="facebook-signin-btn"
                  onClick={renderProps.onClick}
                  {...renderProps}
                >
                  Signin with Facebook
                </Button>
              )}
            />
          </SocialSigninWrapper>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Login;

const SocialSigninWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .google-signin-btn,
  .facebook-signin-btn {
    height: 40px;
    border: 1px solid #e3e6ef;
    border-radius: 4px;
    background: none;
    padding: 0 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      border: ${({ theme }) => `1px solid ${theme["primary-color"]}`};
    }

    svg {
      margin-right: 10px;
    }
  }

  button:last-child {
    margin-top: 1rem;
  }
`;
