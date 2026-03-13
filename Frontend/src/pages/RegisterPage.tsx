import React, { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";


const App: React.FC = () => {
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userName: ""
  });

  const { register, isRegistering } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = () => {
  

    const success = validateForm();

    if (success === true) register(formData);
  };


  return (
    <Row style={{ minHeight: "100vh" }}>
    
    {/* FORM */}
    <Col
      span={10}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Form
        style={{ maxWidth: 360, width: "100%" }}
        layout="vertical"
        onFinish={handleSubmit}
      >

        {/* FULL NAME */}
        <Form.Item
          label="Full Name"
          name="fullname"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
          />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
          prefix = {<MailOutlined/>}
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </Form.Item>

        {/* USERNAME */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
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
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={isRegistering}
          >
            Register
          </Button>
          or {" "}
          <Link to = "/login">Login now</Link>
        </Form.Item>

      </Form>
    </Col>

    {/* IMAGE */}
    <Col span={14}>
      <img
        src="/register.jpg"
        alt="register"
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

export default App;