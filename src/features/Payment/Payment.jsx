import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "./Payment.css";
const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [cardType, setCardType] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNo: "",
    expiryDate: "",
    cvvCode: "",
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

        const { code, response } = res.data;
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

  console.log("cardtype", cardType);

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
      <div className="payment-container bg-light d-md-flex align-items-center">
        <div className="card box1 shadow-sm p-md-5 p-md-5 p-4">
          <div className="fw-bolder mb-4">
            <span className="fas fa-dollar-sign"></span>
            <span className="ps-1">599,00</span>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between text">
              <span className="">Commission</span>
              <span className="fas fa-dollar-sign">
                <span className="ps-1">1.99</span>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between text mb-4">
              <span>Total</span>
              <span className="fas fa-dollar-sign">
                <span className="ps-1">600.99</span>
              </span>
            </div>
            <div className="border-bottom mb-4"></div>
            <div className="d-flex flex-column mb-4">
              <span className="far fa-file-alt text">
                <span className="ps-2">Invoice ID:</span>
              </span>
              <span className="ps-3">SN8478042099</span>
            </div>
            <div className="d-flex flex-column mb-5">
              <span className="far fa-calendar-alt text">
                <span className="ps-2">Next payment:</span>
              </span>
              <span className="ps-3">22 july,2018</span>
            </div>
            <div className="d-flex align-items-center justify-content-between text mt-5">
              <div className="d-flex flex-column text">
                <span>Customer Support:</span> <span>online chat 24/7</span>
              </div>
              <div className="btn btn-primary rounded-circle">
                <span className="fas fa-comment-alt"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="card box2 shadow-sm">
          <div className="d-flex align-items-center justify-content-between p-md-5 p-4">
            <span className="h5 fw-bold m-0">Payment Information</span>
            <div className="btn btn-primary bar">
              <span className="fas fa-bars"></span>
            </div>
          </div>
          <ul className="nav nav-tabs mb-3 px-md-4 px-2">
            <li className="nav-item">
              <a className="nav-link px-2 active" aria-current="page" href="#">
                Credit Card
              </a>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link px-4" href="#">
                Mobile Payment
              </a>
            </li>
            <li className="nav-item ms-auto">
              <a className="nav-link px-2" href="#">
                + More
              </a>
            </li> */}
          </ul>
          <div className="px-md-5 px-4 mb-4 d-flex align-items-center">
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
          </div>
          <form action="" className="payment-form">
            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-column px-md-5 px-4 mb-4">
                  <span>Credit Card</span>
                  <div className="inputWithIcon">
                    <input
                      className="form-control"
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
                            : "https://i.ibb.co/10r0RNW/png-transparent-swipe-card-icon-credit-card-bank-card-debit-card-money-card-card-material-blue-text.png"
                        }
                        alt=""
                      />
                    </span>
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
                      className="form-control"
                      name="expiryDate"
                      placeholder="05/20"
                      onChange={(e) => {
                        handleCardInfoChange(e);
                      }}
                      value={cardInfo.expiryDate}
                    />
                    <span className="fas fa-calendar-alt"></span>
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
                      className="form-control"
                      placeholder="xxx"
                      onChange={(e) => {
                        handleCardInfoChange(e);
                      }}
                      value={cardInfo.cvvCode}
                    />
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex flex-column px-md-5 px-4 mb-4">
                  <span>Email</span>
                  <div className="inputWithIcon">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      onChange={(e) => {
                        handleCardInfoChange(e);
                      }}
                      value={cardInfo.email}
                    />
                    <span className="far fa-user"></span>
                  </div>
                </div>
              </div>
              <div className="col-12 px-md-5 px-4 mt-3">
                <div className="btn btn-primary w-100">Pay $599.00</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
