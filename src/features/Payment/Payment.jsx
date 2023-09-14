import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "./Payment.css";
const Payment = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNo: "",
    expiryDate: "",
    cvvCode: "",
    amount: "",
    email: "",
  });

  useEffect(() => {
    if (cardInfo.cardNo.length <= 16 || cardInfo.cardNo.length <= 15) {
      getCardType();
    }
  }, [cardInfo.cardNo]);

  //HANDLE CARD INFO
  const handleCardInfoChange = (evnt) => {
    const cardInputValue = evnt.target.value.trim();
    const cardInputFieldName = evnt.target.name;
    const cardInput = {
      ...cardInfo,
      [cardInputFieldName]: cardInputValue,
    };
    setCardInfo(cardInput);
  };

  //FOR CARD TYPE API CALL
  const getCardType = () => {
    axios
      .post(
        `http://localhost:8084/payment/api/v1/card-type?cardNumber=${cardInfo.cardNo}`
      )
      .then(function (res) {
        console.log("res", res);
        setLoading(false);

        const { response } = res.data;
        if (response !== "UNKNOWN") {
          setCardType(response);
        } else setCardType("");
      })

      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("payment catch", error);
      });
  };

  // const handleSubmit = () => {
  //   const payload = {
  //     email: user.userBO.email,
  //     otp: OTP,
  //   };

  //   getOTP("http://localhost:8086/public/api/v1/validate-otp", payload);
  // };

  return (
    <div>
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
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "0px",
          }}
        ></Modal.Header>
        <Modal.Body>
          <div>
            <div className="payment-container d-md-flex align-items-center">
              <div className="card box2 shadow-sm ml-2 mb-2">
                <div className="d-flex align-items-center justify-content-between p-md-5 p-2">
                  <span className="h5 fw-bold m-0">
                    <i
                      class="fa-solid fa-credit-card mr-3"
                      style={{ fontSize: "25px" }}
                    ></i>
                    <span>Activate free trial</span>
                  </span>
                  {/* <div className="btn btn-primary bar">
                    <span className="fas fa-bars"></span>
                  </div> */}
                </div>
                {/* <ul className="nav nav-tabs mb-3 px-md-4 px-2">
                  <li className="nav-item">
                    <a
                      className="nav-link px-2 active"
                      aria-current="page"
                      href="#"
                    >
                      Card Details
                    </a>
                  </li>
                  
                </ul> */}
                {/* <div className="px-md-5 px-4 mb-4 d-flex align-items-center">
            <div className="btn btn-success me-4">
              <span className="fas fa-plus"></span>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                checked
              />
              <label className="btn btn-outline-primary" for="btnradio1">
                <span className="pe-1">+</span>5949
              </label>
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
              />
              <label className="btn btn-outline-primary" for="btnradio2">
                <span className="lpe-1">+</span>3894
              </label>
            </div>
          </div> */}
                <form action="" className="payment-form">
                  <div className="row">
                    <div className="col-12">
                      <div className="d-flex flex-column px-md-5 px-4 mb-4">
                        <span>Card No.</span>
                        <div className="inputWithIcon">
                          <input
                            className="payment-form-control form-control"
                            type="text"
                            name="cardNo"
                            placeholder="1234123412341234"
                            onChange={(e) => {
                              handleCardInfoChange(e);
                            }}
                            value={cardInfo.cardNo}
                          />
                          <span className="">
                            <img
                              className="payment-card-icon"
                              src={
                                cardType === "MASTERCARD"
                                  ? "https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png"
                                  : cardType === "VISA"
                                  ? "https://www.freepnglogos.com/uploads/visa-inc-png-18.png"
                                  : cardType === "AMERICAN_EXPRESS"
                                  ? "https://i.ibb.co/JFM3RsD/American-Express-Color.png"
                                  : "https://i.ibb.co/sVh14VB/6963703.png"
                              }
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex flex-column px-md-5 px-4 mb-4">
                        <span>Amount</span>
                        <div className="inputWithIcon">
                          <input
                            className="payment-form-control form-control"
                            type="text"
                            name="amount"
                            placeholder="Enter Amount"
                            onChange={(e) => {
                              handleCardInfoChange(e);
                            }}
                            value={cardInfo.amount}
                          />
                          <span className="fa fa-dollar text-secondary"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex flex-column px-md-5 px-4 mb-4">
                        <span>
                          Expiry<span className="ps-1">Date</span>
                        </span>
                        <div className="inputWithIcon">
                          <input
                            type="text"
                            className="payment-form-control form-control"
                            name="expiryDate"
                            placeholder="05/20"
                            onChange={(e) => {
                              handleCardInfoChange(e);
                            }}
                            value={cardInfo.expiryDate}
                          />
                          <span className="fas fa-calendar-alt text-secondary"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex flex-column px-md-5 px-4 mb-4">
                        <span>Code CVV</span>
                        <div className="inputWithIcon">
                          <input
                            type="password"
                            name="cvvCode"
                            className="payment-form-control form-control"
                            placeholder="xxx"
                            onChange={(e) => {
                              handleCardInfoChange(e);
                            }}
                            value={cardInfo.cvvCode}
                          />
                          <span className="fas fa-lock text-secondary"></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-flex flex-column px-md-5 px-4 mb-4">
                        <span>Email</span>
                        <div className="inputWithIcon">
                          <input
                            className="payment-form-control form-control"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={(e) => {
                              handleCardInfoChange(e);
                            }}
                            value={cardInfo.email}
                          />
                          <span className="far fa-user text-secondary"></span>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 px-md-5 px-4 mt-3">
                      <div className="btn btn-info w-100">
                        Activate 14-day free trial
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Payment;
