import { Link } from "react-router-dom";
import { Button, Avatar } from "antd";
import {
  MessageOutlined,  
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="fixed top-0 w-full z-40 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <MessageOutlined className="text-blue-500 text-lg" />
          </div>

          <h1 className="text-lg font-bold">Chat App</h1>
        </Link>

        {/* Right Menu */}
        <div className="flex items-center gap-3">


          {authUser && (
            <>
              <Link to="/profile">
                <Button icon={<UserOutlined />}>
                  <span className="hidden sm:inline">Profile</span>
                </Button>
              </Link>

              <Button
                danger
                icon={<LogoutOutlined />}
                onClick={logout}
              >
                <span className="hidden sm:inline">Logout</span>
              </Button>

              {/* Avatar */}
              <Avatar src={authUser.avt} icon={<UserOutlined />} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;