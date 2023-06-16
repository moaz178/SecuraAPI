import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Login.css";

const Login = () => {
  return (
    <>
      <Header />

      <div
        className="login-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div id="login-box">
          <div class="left">
            <h3>Sign in to your Secura API account </h3>

            <input type="text" name="email" placeholder="E-mail" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="password" placeholder="New Password" />
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
            />

            <Link to={`/create-acount`} className="small text-info">
              Forget Password?
            </Link>
            <br />

            <button className="login-button">Sign In</button>

            <br />
            <Link to={`/create-acount`} className="small text-warning">
              Don't have an account ? Create Account ! &nbsp;
              <i className="fa fa-rocket" aria-hidden="true"></i>
            </Link>
          </div>
          <br />

          {/* <div class="or">OR</div> */}

          <div style={{ textAlign: "center" }}>
            <p>Or Sign in with</p>
            <button class="social-signin facebook">
              <i class="fa-brands fa-facebook"></i>
            </button>
            <button class="social-signin twitter">
              <i class="fa-brands fa-twitter"></i>
            </button>
            <button class="social-signin google">
              <i class="fa-brands fa-google"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
