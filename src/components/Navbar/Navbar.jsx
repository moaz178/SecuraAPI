import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/SignIn/authContext/authContext";

import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  // const { user } = useAuth();
  // const { firstName, lastName } = user.userBO;
  const handleLogOut = () => {
    window.localStorage.removeItem("userInfo");
    // setCurrentUser({});
    navigate("/");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i className="fa fa-user mr-3"></i>

            <label
              style={{
                cursor: "pointer",
                fontSize: "14px",
                marginLeft: "220px",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              {/* {firstName}'s Organization */}
              Aiman's Workspace
            </label>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-md-auto gap-2">
              {/* <li class="nav-item rounded mr-3">
                <a class="nav-link active" aria-current="page" href="#">
                  <i class="fa-regular fa-bell"></i>
                </a>
              </li>
              <li class="nav-item rounded mr-3">
                <a class="nav-link active" href="#">
                  <i class="fa-regular fa-user"></i>
                </a>
              </li> */}
              {/* <li class="nav-item rounded mr-3">
                <a class="nav-link active" aria-current="page" href="#">
                  <i class="fa-regular fa-bell"></i>
                </a>
              </li> */}
              <li class="nav-item rounded mr-3">
                <button
                  type="button"
                  className="btn btn-info btn-outline text-info"
                >
                  <i class="fa-regular fa-bell"></i> &nbsp;{" "}
                  <strong>Free Trial</strong> - 14 days left
                </button>
              </li>
              <li class="nav-item rounded mr-3">
                <button
                  type="button"
                  className="btn btn-info fs-14"
                  onClick={() => navigate("plans")}
                >
                  Activate Trial
                </button>
              </li>
              <li class="nav-item rounded">
                <a class="nav-link active" href="#" onClick={handleLogOut}>
                  <i class="fa-solid fa-right-from-bracket"></i> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
