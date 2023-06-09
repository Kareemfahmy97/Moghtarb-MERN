import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen py-4 px-8">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
