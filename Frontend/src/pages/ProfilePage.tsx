import { useState } from "react";
import {
  Card,
  Avatar,
  Upload,
  Typography,
  Row,
  Col,
  Spin,
  Divider,
} from "antd";
import {
  CameraOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../store/useAuthStore";

const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

const handleImageUpload = async (file: File) => {
  setSelectedImg(URL.createObjectURL(file)); 

  const formData = new FormData();
  formData.append("avatar", file);

  await updateProfile(formData);

  return false;
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 20,
      }}
    >
      <Card
        style={{ width: 500 }}
        bodyStyle={{ padding: 30 }}
      >
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Title level={3}>Profile</Title>
          <Text type="secondary">Your profile information</Text>
        </div>

        {/* Avatar */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <Upload
            showUploadList={false}
            beforeUpload={handleImageUpload}
            disabled={isUpdatingProfile}
          >
            <div style={{ position: "relative", display: "inline-block" }}>
              <Avatar
                size={120}
                src={selectedImg || authUser?.avt || "/avatar.png"}
                icon={<UserOutlined />}
              />

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  background: "#1677ff",
                  borderRadius: "50%",
                  padding: 8,
                  cursor: "pointer",
                }}
              >
                <CameraOutlined style={{ color: "#fff" }} />
              </div>
            </div>
          </Upload>

          <div style={{ marginTop: 10 }}>
            {isUpdatingProfile ? (
              <Spin />
            ) : (
              <Text type="secondary">
                Click camera icon to update your photo
              </Text>
            )}
          </div>
        </div>

        <Divider />

        {/* User info */}
        <Row gutter={[0, 20]}>
          <Col span={24}>
            <Text type="secondary">
              <UserOutlined /> Full Name
            </Text>
            <div
              style={{
                marginTop: 5,
                padding: "8px 12px",
                background: "#fafafa",
                borderRadius: 6,
                border: "1px solid #eee",
              }}
            >
              {authUser?.fullName}
            </div>
          </Col>

          <Col span={24}>
            <Text type="secondary">
              <MailOutlined /> Email Address
            </Text>
            <div
              style={{
                marginTop: 5,
                padding: "8px 12px",
                background: "#fafafa",
                borderRadius: 6,
                border: "1px solid #eee",
              }}
            >
              {authUser?.email}
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Account info */}
        <Title level={5}>Account Information</Title>

        <Row justify="space-between" style={{ marginTop: 10 }}>
          <Text>Member Since</Text>
          
        </Row>

        <Row justify="space-between" style={{ marginTop: 10 }}>
          <Text>Account Status</Text>
          <Text style={{ color: "green" }}>Active</Text>
        </Row>
      </Card>
    </div>
  );
};

export default ProfilePage;