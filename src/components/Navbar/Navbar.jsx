import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    // setCurrentUser({});
    navigate("/");
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#"></a>
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
              <li class="nav-item rounded mr-3">
                <a class="nav-link active" aria-current="page" href="#">
                  <i class="fa-regular fa-bell"></i>
                </a>
              </li>
              <li class="nav-item rounded mr-3">
                <a class="nav-link active" href="#">
                  <i class="fa-regular fa-user"></i>
                </a>
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
