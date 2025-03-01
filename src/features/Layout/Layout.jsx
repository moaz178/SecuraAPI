import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {/* Child routes go here */}
      {/* <Outlet /> */}
    </div>
  );
};

export default Layout;
