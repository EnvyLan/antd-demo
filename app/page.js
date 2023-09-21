'use client'

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useRouter } from 'next/navigation';
import './page.css';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    setLoading(true);
    if(values.username == 'admin' && values.password == 'admin'){
        message.success('Login success!');
        router.push('/upload');
    }else{
        message.error('Login failed, please try again!');
        setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="login-form-title">User Login</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please enter user name!',
              },
            ]}
          >
            <Input placeholder="User name" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="#">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
