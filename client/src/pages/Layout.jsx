import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col p-4 min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
