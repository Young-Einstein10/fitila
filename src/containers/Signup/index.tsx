import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { ReactComponent as Facebook } from '../../static/svg/facebook.svg';
import { ReactComponent as Twitter } from '../../static/svg/twitter.svg';
import { ReactComponent as LinkedIn } from '../../static/svg/linkedIn.svg';
import { ReactComponent as Instagram } from '../../static/svg/instagram.svg';

import { AuthWrapper } from '../profile/authentication/overview/style';
import { Checkbox } from '../../components/checkbox/checkbox';
import Heading from '../../components/heading/heading';
import { InputStyled } from './styled';

const { Option } = Select;

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const isLoading = useSelector(state => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = () => {
    // dispatch(login());
    history.push('/admin');
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading className="text-center" as="h3">
            Sign Up
          </Heading>

          <Form.Item name="firstname" rules={[{ message: 'Please input your firstname !', required: true }]}>
            <InputStyled placeholder="First Name" />
          </Form.Item>

          <Form.Item name="lastname" rules={[{ message: 'Please input your lastname !', required: true }]}>
            <InputStyled placeholder="Last Name" />
          </Form.Item>

          <Form.Item name="email" rules={[{ message: 'Please input your Email!', required: true }]}>
            <InputStyled placeholder="Email Address" />
          </Form.Item>

          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select placeholder="Choose Your Role" allowClear>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          </Form.Item>

          <Form.Item name="password">
            <InputStyled.Password placeholder="Password" />
          </Form.Item>

          <div className="auth-form-action">
            <Checkbox onChange={() => {}}>Remember Me</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div>

          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              Sign In
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

export default Signup;
