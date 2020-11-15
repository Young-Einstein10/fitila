import { Checkbox, Button, Form } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { AuthWrapper } from "../profile/authentication/overview/style";
import { ReactComponent as Facebook } from "../../static/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../static/svg/instagram.svg";
import { InputStyled } from "../Styles";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const isLoading = useSelector(state => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = () => {
    // dispatch(login());
    history.push("/admin");
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading className="text-center" as="h3">
            Sign In
          </Heading>

          <Form.Item
            name="username"
            rules={[
              {
                message: "Please input your username or Email!",
                required: true,
              },
            ]}
            initialValue="name@example.com"
          >
            <InputStyled placeholder="Username or Email Address" />
          </Form.Item>

          <Form.Item name="password" initialValue="123456">
            <InputStyled.Password placeholder="Password" />
          </Form.Item>

          <div className="auth-form-action">
            <Checkbox>Remember Me</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div>

          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              Sign In
            </Button>
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
