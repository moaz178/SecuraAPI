import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Layout.css";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="layout-container">
        <div className="side-menu">
          <Sidebar />
        </div>
        <div className="content">
          {/* This is where nested routes will render */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
