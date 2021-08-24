import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link, NavLink } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { ReactComponent as Facebook } from "../../static/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../static/svg/instagram.svg";
import { useApiContext, useAuthContext } from "../../context";
import { useMountedState } from "../../utils/hooks";
import { InputStyled, AuthWrapper } from "../Styles";

const Login = ({ history, location }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const { state } = location;

  const { setApiHeaders } = useApiContext();
  const isMounted = useMountedState();

  const { setAuth, login, auth } = useAuthContext();

  useEffect(() => {
    if (isMounted()) {
      if (auth.isAuthenticated) {
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

        localStorage.setItem("userData", JSON.stringify(data));

        setApiHeaders(data.access);

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

  const googleResponse = response => {
    console.log({ response });
  };

  const facebookResponse = response => {
    console.log({ response });
  };

  const onFailure = error => {
    alert(error);
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

            <GoogleLogin
              clientId="118035885210-mgnqcnmncu3f1ubrk53joeiifaehvu8a.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={googleResponse}
              onFailure={onFailure}
            />

            <FacebookLogin
              appId={198683348960352}
              autoLoad={false}
              fields="name,email,picture"
              callback={facebookResponse}
            />
          </Form.Item>

          <p className="auth-notice">
            Don&rsquo;t have an account?{" "}
            <NavLink to="/signup">Sign up here</NavLink>
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

export default Login;
