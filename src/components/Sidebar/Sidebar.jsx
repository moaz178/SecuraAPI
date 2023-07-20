import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/SignIn/authContext/authContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  const { user } = useAuth();
  const { firstName, lastName } = user.userBO;
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
              <i className="fa fa-user mr-3"></i>

              <label style={{ cursor: "pointer", fontSize: "17px" }}>
                {firstName + " " + lastName}
              </label>
            </div>
            <li className="active">
              <a href="#" onClick={() => navigate("./dashboard")}>
                <span className="fa-stack fa-lg pull-left mr-2">
                  <i className="fa fa-dashboard fa-stack-1x "></i>
                </span>{" "}
                Dashboard
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa-stack fa-lg pull-left mr-2">
                  <i className="fa fa-flag fa-stack-1x "></i>
                </span>
                Shortcut
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa-stack fa-lg pull-left mr-2">
                  <i className="fa fa-cloud-download fa-stack-1x "></i>
                </span>
                Overview
              </a>
            </li>
            <li>
              <a href="#">
                {" "}
                <span className="fa-stack fa-lg pull-left mr-2">
                  <i className="fa fa-cart-plus fa-stack-1x "></i>
                </span>
                Events
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa-stack fa-lg pull-left mr-2">
                  <i className="fa fa-wrench fa-stack-1x "></i>
                </span>
                Services
              </a>
            </li>
            <li>
              <a href="#">
                <span className="fa-stack fa-lg pull-left mr-2">
                  <i className="fa fa-server fa-stack-1x "></i>
                </span>
                Contact
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
