import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../SignIn/authContext/authContext";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [oldPasswordError, setOldPasswordErr] = useState("");
  const [passwordError, setPasswordErr] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // User Registered Details
  const userInfo = JSON.parse(localStorage.getItem("userRegisteredInfo"));

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
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    const NewPasswordInput = {
      ...passwordInput,
      [passwordInputFieldName]: passwordInputValue,
    };
    setPasswordInput(NewPasswordInput);
  };

  //Validations Check
  const handleValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password validation
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "At least minumum 8 characters";
      } else {
        errMsg = "";
      }
      setPasswordErr(errMsg);
    }
    // for confirm password validation
    if (
      passwordInputFieldName === "confirmPassword" ||
      (passwordInputFieldName === "password" &&
        passwordInput.confirmPassword.length > 0)
    ) {
      if (passwordInput.confirmPassword !== passwordInput.password) {
        setConfirmPasswordError("Confirm password is not matched");
      } else {
        setConfirmPasswordError("");
      }
    }

    // for old password validation
    if (
      passwordInputFieldName === "oldPassword" ||
      passwordInputFieldName === "password"
    ) {
      if (passwordInput.oldPassword.length === 0) {
        setOldPasswordErr("Password is empty");
      } else {
        setOldPasswordErr("");
      }
    }
  };

  //Handle Submit Updates
  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, password, confirmPassword } = passwordInput;
    if (
      oldPasswordError !== "" ||
      passwordError !== "" ||
      confirmPasswordError !== ""
    ) {
      toast.error("Please submit valid information");
    } else {
      const payload = {
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword,
      };
      setLoading(true);

      axios
        .post(
          `http://localhost:8086/public/api/v1/update-password/${userInfo.email}`,
          payload
        )
        .then(function (res) {
          console.log("res", res);
          setLoading(false);
          const { message, code } = res.data;
          if (code === "100") {
            toast.success(message);
            navigate("/signin");
          } else if (code !== "100") {
            toast.error(message);
          } else return;
        })

        .catch(function (error) {
          toast.error(error.message);
          setLoading(false);
          console.log("updatePass catch", error);
        });
    }
  };

  return (
    <>
      <Header />
      <Loader show={loading} />
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
            <h3>Update Your Password</h3>

            {/* <input type="text" name="email" placeholder="Enter your Email" /> */}
            <div style={{ display: "flex" }}>
              <input
                type={passwordType}
                value={passwordInput.oldPassword}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="oldPassword"
                placeholder="Temporary Password"
                className="mb-1"
              />
              {passwordInput.oldPassword.length > 0 ? (
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
            <p className="text-danger fs-13 mb-4">{oldPasswordError}</p>

            <div style={{ display: "flex" }}>
              <input
                type={passwordType}
                value={passwordInput.password}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="password"
                placeholder="New Password"
                className="mb-1"
              />
              {passwordInput.password.length > 0 ? (
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
            <div style={{ display: "flex" }}>
              <input
                type={passwordType}
                value={passwordInput.confirmPassword}
                onChange={handlePasswordChange}
                onKeyUp={handleValidation}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="mb-1"
              />
              {passwordInput.confirmPassword.length > 0 ? (
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
            <p className="text-danger fs-13 mb-4">{confirmPasswordError}</p>

            <button
              type="submit"
              disabled={
                passwordError || oldPasswordError || confirmPasswordError
              }
              onClick={handleSubmit}
              className="btn btn-primary btn-lg btn-block fs-15"
            >
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
