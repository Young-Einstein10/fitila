import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Form, Button, Select } from "antd";
import { ReactComponent as Facebook } from "../../static/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../static/svg/twitter.svg";
import { ReactComponent as LinkedIn } from "../../static/svg/linkedIn.svg";
import { ReactComponent as Instagram } from "../../static/svg/instagram.svg";

import { AuthWrapper } from "../profile/authentication/overview/style";
import { Checkbox } from "../../components/checkbox/checkbox";
import Heading from "../../components/heading/heading";
import { InputStyled } from "../Styles";
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/authActions";

const { Option } = Select;

const Signup = ({ signupUser, history, auth }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (!auth.isAuthhenticated) {
  //     history.push("/d");
  //   }
  // }, [auth, history]);

  const handleSubmit = values => {
    setIsLoading(true);
    console.log(values);
    signupUser(values)
      .then(res => {
        setIsLoading(false);
        history.push("/d");
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="signup"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading style={{ fontSize: "40px" }} className="text-center" as="h3">
            Sign Up
          </Heading>

          <Form.Item
            name="first_name"
            rules={[
              { message: "Please input your firstname !", required: true },
            ]}
          >
            <InputStyled placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[
              { message: "Please input your lastname !", required: true },
            ]}
          >
            <InputStyled placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ message: "Please input your Email!", required: true }]}
          >
            <InputStyled placeholder="Email Address" />
          </Form.Item>

          <Form.Item name="role" rules={[{ required: true }]}>
            <Select placeholder="Choose Your Role" allowClear>
              <Option value="male">Enterpreneur</Option>
              <Option value="female">Ecosysytem Enabler</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="password">
            <InputStyled.Password placeholder="Password" />
          </Form.Item>

          {/* <div className="auth-form-action">
            <Checkbox onChange={() => {}}>Remember Me</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div> */}

          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
              loading={isLoading}
            >
              Sign Up
            </Button>
          </Form.Item>

          <p className="auth-notice">
            Signed Up Already? <NavLink to="/login">Login In here</NavLink>
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

export default connect(mapStateToProps, { signupUser })(Signup);
