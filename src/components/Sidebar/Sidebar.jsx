import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/SignIn/authContext/authContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  // const { user } = useAuth();
  // const { firstName, lastName } = user.userBO;
  const navigate = useNavigate();

  return (
    <>
      <div id="wrapper">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
            <div
              className="text-light mt-4 mb-4"
              style={{ cursor: "pointer", marginLeft: "40px" }}
              onClick={() => navigate("./dashboard")}
            >
              {/* {user.profilePhoto != "" && ( */}
              {/* <img
                src={"/dist/img/aiman.jpg"}
                className="profile-pic"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                alt=""
              /> */}
              {/* )} */}
              {/* <i className="fa fa-user mr-3"></i>

              <label style={{ cursor: "pointer", fontSize: "14px" }}>
                {firstName}'s Organization
              </label> */}
            </div>
            <li className="active">
              <a href="#" onClick={() => navigate("./dashboard")}>
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa fa-rocket fa-stack-1x "></i>
                </span>{" "}
                Get Started
              </a>
            </li>
            <li className="active">
              <a href="#" onClick={() => navigate("./dashboard")}>
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa fa-pie-chart fa-stack-1x "></i>
                </span>{" "}
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" onClick={() => navigate("./scans")}>
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa fa-spinner fa-stack-1x "></i>
                </span>
                Scans
              </a>
            </li>
            {/* <li>
              <a href="#" onClick={() => navigate("./authentication")}>
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i class="fa-solid fa-fingerprint fa-stack-1x"></i>
                </span>{" "}
                Authentication
              </a>
            </li> */}
            <li>
              <a href="#" onClick={() => navigate("./reports")}>
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa  fa-bar-chart fa-stack-1x "></i>
                </span>
                Reports
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa fa-exclamation-triangle fa-stack-1x "></i>
                </span>
                Issues
              </a>
            </li>

            <li>
              <a href="#">
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa  fa-desktop fa-stack-1x "></i>
                </span>
                Networks
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa-stack fa-lg pull-left mr-3">
                  <i className="fa fa-cog fa-stack-1x "></i>
                </span>
                Settings
              </a>
            </li>
          </ul>
        </div>

        <div id="page-content-wrapper">
          <div className="container-fluid xyz">
            <div className="row">
              <div className="col-lg-12">
                <div className="content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
