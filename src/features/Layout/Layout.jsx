import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Layout.css";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="side-menu">
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
