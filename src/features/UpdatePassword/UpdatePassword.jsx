import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const UpdatePassword = () => {
  return (
    <>
      <Header />
      <div
        className="login-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div id="login-box">
          <div class="left">
            <h3>Update Your Password</h3>

            <input type="text" name="email" placeholder="Enter your Email" />
            <input
              type="password"
              name="password"
              placeholder="Enter your Temporary Password"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter a New Password"
            />
            <input
              type="password"
              name="password"
              placeholder="Retype New Password"
            />
            <button className="login-button" onClick={() => null}>
              Update Password
            </button>
          </div>
          <br />
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
