import React from "react";
import LoginNavbar from "../../components/LoginNavbar";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div
      className="w-full h-screen text-text-primary bg-cover"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7) , rgba(0,0,0,0.5)),url(https://genotipia.com/wp-content/uploads/2020/04/Netflix-Background-prueba-1.jpg)`,
        // backgroundSize: "100% 100%",
      }}
    >
      <LoginNavbar />
      <Outlet />
    </div>
  );
};

export default LoginLayout;
