import React, { useEffect, useState } from "react";
import { Checkbox, Button, Form } from "antd";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { AuthWrapper } from "../Styles";
import { ReactComponent as Facebook } from "../../static/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../static/svg/instagram.svg";
import { InputStyled } from "../Styles";
import { signinUser } from "../../redux/actions/authActions";

const Login = ({ signinUser, history, auth, location }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const { state } = location;

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (state && state.next) {
        history.push(state.next);
      } else {
        history.push("/d");
      }
    }
  }, [auth, state, history]);

  const handleSubmit = async values => {
    setIsLoading(true);
    // console.log(values);

    try {
      const values = await form.validateFields();

      const res = await signinUser(values);
      setIsLoading(false);

      if (state && state.next) {
        history.push(state.next);
      } else {
        history.push("/d");
      }
    } catch (error) {
      console.log(error);
    }
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
          <Heading style={{ fontSize: "4opx" }} className="text-center" as="h3">
            Sign In
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

          <Form.Item
            name="password"
            rules={[{ message: "Please input your password", required: true }]}
          >
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
              loading={isLoading}
              // onClick={() => history.push("/d")}
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

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { signinUser })(Login);
