import { useState } from "react";
import { Row, Col, Form, Input, Button, Typography } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    login(formData);
  };

  return (
    <Row style={{ minHeight: "100vh" }}>
      
      {/* LEFT - FORM */}
      <Col
        span={10}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <Title level={3}>Welcome Back</Title>
            <Text type="secondary">Sign in to your account</Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            
            {/* EMAIL */}
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Item>

            {/* PASSWORD */}
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoggingIn}
                block
              >
                Sign In
              </Button>
            </Form.Item>

          </Form>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Text type="secondary">
              Don’t have an account? <Link to="/register">Create account</Link>
            </Text>
          </div>
        </div>
      </Col>

      {/* RIGHT - IMAGE */}
      <Col span={14}>
        <img
          src="/register.jpg"
          alt="login"
          style={{
            width: "70%",
            height: "1000px",
            objectFit: "cover",
          }}
        />
      </Col>

    </Row>
  );
};

export default LoginPage;