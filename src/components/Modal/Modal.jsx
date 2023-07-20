import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Timer from "../Timer/Timer";
import { useAuth } from "../../features/SignIn/authContext/authContext";

const OTPModal = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const [resendOTPBtn, setResendOTPBtn] = useState(true);
  const navigate = useNavigate();

  //User Context
  const { user, setLoggedIn } = useAuth();

  //HANDLE USER OTP INPUT
  const handleOTPChange = (evnt) => {
    const inputOTP = evnt.target.value.trim();
    setOTP(inputOTP);
  };

  //RESENT OTP API CALL
  const handleOTPResend = () => {
    setLoading(true);
    axios
      .post(
        `http://localhost:8086/public/api/v1/resent-otp?email=${user.userBO.email}`
      )
      .then(function (res) {
        console.log("res", res);
        setLoading(false);
        const { message, code } = res.data;
        if (code === "100") {
          setResendOTPBtn(true);
          toast.success(message);
          setLoggedIn(true);
        } else if (code !== "100") {
          toast.error(message);
        } else return;
      })

      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("otp catch", error);
      });
  };

  //FOR OTP API CALL
  const getOTP = (url, payload) => {
    axios
      .post(url, payload)
      .then(function (res) {
        console.log("res", res);
        setLoading(false);
        const { message, code } = res.data;
        if (code === "100") {
          toast.success(message);
          setLoggedIn(true);
          // if payment === 'done'? navigate('/home') : navigate('/payment')
          navigate("/home");
        } else if (code !== "100") {
          toast.error(message);
        } else setLoggedIn(false);
      })

      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("otp catch", error);
      });
  };

  const handleSubmit = () => {
    const payload = {
      email: user.userBO.email,
      otp: OTP,
    };

    getOTP("http://localhost:8086/public/api/v1/validate-otp", payload);
  };

  return (
    <>
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
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header
          className="ml-3 mt-2"
          closeButton
          style={{ borderBottom: "0px" }}
        >
          <Modal.Title>OTP Verification</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "20px 30px" }}>
          <div className="alert alert-warning fs-13" role="alert">
            We've sent you a verification code to your email ! <br />
            The code will expire in{" "}
            <strong>
              <Timer
                setResendOTPBtn={setResendOTPBtn}
                resendOTPBtn={resendOTPBtn}
              />
            </strong>
          </div>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="ie. 123456"
                className="fs-13 text-dark"
                onChange={handleOTPChange}
              />
            </Form.Group>
          </Form>
          <button
            type="submit"
            disabled={OTP.length === 0 || !resendOTPBtn}
            onClick={handleSubmit}
            className="btn btn-primary btn-lg btn-block fs-15 mt-4 mb-3"
          >
            Verify
          </button>
          <strong
            className="text-dark fs-13 mt-5 mb-2"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Having trouble verifying via email?
          </strong>
          <button
            type="submit"
            disabled={resendOTPBtn}
            onClick={handleOTPResend}
            className="btn btn-link btn-lg btn-block fs-15 mb-3"
          >
            Resend OTP
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OTPModal;
