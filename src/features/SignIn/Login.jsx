import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import OTPModal from "../../components/Modal/Modal";
import { useAuth } from "./authContext/authContext";
import "./Login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setshowOTPModal] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordError, setPasswordErr] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  // User Auth Context
  const { setUser } = useAuth();

  //Set Password Type
  const togglePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  //Set user input
  const handlePasswordChange = (evnt) => {
    const loginInputValue = evnt.target.value.trim();
    const loginInputFieldName = evnt.target.name;
    const NewLoginInput = {
      ...loginInput,
      [loginInputFieldName]: loginInputValue,
    };
    setLoginInput(NewLoginInput);
  };

  //Validations Check
  const handleValidation = (evnt) => {
    const loginInputValue = evnt.target.value.trim();
    const loginInputFieldName = evnt.target.name;
    //for password validation
    if (loginInputFieldName === "password") {
      let errMsg = "";
      if (loginInputValue.length === 0) {
        errMsg = "Password is required";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }

    // for email validation
    if (loginInputFieldName === "email") {
      if (loginInput.email.length === 0) {
        setEmailError("email is required");
      } else {
        setEmailError("");
      }
    }
  };

  //Handle Submit Updates
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = loginInput;
    if (emailError !== "" || passwordError !== "") {
      toast.error("Please submit valid information");
    } else {
      const payload = {
        email: email,
        password: password,
      };
      setLoading(true);

      axios
        .post("http://localhost:8086/public/api/v1/authenticate", payload)
        .then(function (res) {
          setLoading(false);
          console.log("loginRes", res);
          const { message, code, response } = res.data;
          const token = response.token;
          if (token) {
            setUser(response);
            window.localStorage.setItem("userInfo", JSON.stringify(response));
          }
          if (code === "100") {
            toast.success(message);
            setshowOTPModal(true);
          } else if (code !== "100") {
            toast.error(message);
          } else return;
        })

        .catch(function (error) {
          toast.error(error.message);
          setLoading(false);
          console.log("login catch", error);
        });
    }
  };

  return (
    <>
      <Header />

      <Loader show={loading} />
      <OTPModal show={showOTPModal} setShow={setshowOTPModal} />
      <Toaster
        toastOptions={{
          style: {
            fontWeight: "600",
            fontSize: "12px",
            padding: "20px 10px",
          },
        }}
      />
      <div
        className="login-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div id="login-box">
          <div class="left">
            <h3>Sign in to your Secura API account </h3>

            <input
              type="email"
              className="signup-feilds mb-1"
              value={loginInput.email}
              onChange={handlePasswordChange}
              onKeyUp={handleValidation}
              name="email"
              placeholder="Email"
            />
            <p className="text-danger fs-13 mb-4">{emailError}</p>

            <div style={{ display: "flex" }}>
              <input
                type={passwordType}
                value={loginInput.password}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="password"
                placeholder="Password"
                className="signup-feilds mb-1"
              />
              {loginInput.password.length > 0 ? (
                passwordType === "password" ? (
                  <i
                    className="fas fa-eye-slash text-secondary mt-3 mr-3"
                    onClick={togglePasswordType}
                  ></i>
                ) : (
                  <i
                    className="fas fa-eye text-secondary mt-3 mr-3"
                    onClick={togglePasswordType}
                  ></i>
                )
              ) : null}
            </div>
            <p className="text-danger fs-13 mb-4">{passwordError}</p>

            <Link to={`/create-acount`} className="small text-info">
              Forgot Password?
            </Link>
            <br />

            <button
              type="submit"
              disabled={emailError || passwordError}
              onClick={handleSubmit}
              className="btn btn-primary btn-lg btn-block fs-15 mt-4"
            >
              Sign In
            </button>

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
