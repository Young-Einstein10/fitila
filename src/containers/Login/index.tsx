import React, { useEffect, useState } from "react";
import { Checkbox, Button, Form } from "antd";
import { connect } from "react-redux";
import { NavLink, Link, Redirect } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { AuthWrapper } from "../profile/authentication/overview/style";
import { ReactComponent as Facebook } from "../../static/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../static/svg/instagram.svg";
import { InputStyled } from "../Styles";
import { signinUser } from "../../redux/actions/authActions";

const Login = ({ signinUser, history, auth, location }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const { state } = location;

  useEffect(() => {
    if (auth.isAuthhenticated) {
      <Redirect to="/d" />;
    }
  }, [auth]);

  const handleSubmit = values => {
    setIsLoading(true);
    console.log(values);
    signinUser(values)
      .then(res => {
        setIsLoading(false);
        history.push("/d");
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // if(redirectToReferrer === true) {
  //   return <Redirect to={ state?.from || "/"} />
  // }

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
                message: "Please input your Email!",
                required: true,
              },
            ]}
          >
            <InputStyled placeholder="Email Address" />
          </Form.Item>

          <Form.Item name="password">
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
