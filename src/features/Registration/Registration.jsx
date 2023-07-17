import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import { regions } from "../../static/country";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import "../SignIn/Login.css";

const Registration = () => {
  const [region, setRegion] = useState(regions.Select);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isChecked, setCheck] = useState(false);
  const [isWorkEmail, setWorkEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValue] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  const [validation, setValidation] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  const selectCountryHandler = (value) => setSelectedCountry(value);

  // Have to register the languages you want to use
  countries.registerLocale(enLocale);
  countries.registerLocale(itLocale);

  // Returns an object not a list
  const countryObj = countries.getNames("en", { select: "official" });
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  //Handle onchange updates
  function handleChange(event) {
    const { name, value } = event.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  //Handle Validations
  const checkValidation = () => {
    let errors = validation;

    //first Name validation
    if (!inputValues.fName.trim()) {
      errors.fName = "First name is required !";
    } else {
      errors.fName = "";
    }
    //last Name validation
    if (!inputValues.lName.trim()) {
      errors.lName = "Last name is required !";
    } else {
      errors.lName = "";
    }

    // email validation
    const emailCond =
      /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|gmail|yahoo|outlook)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/;
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
      setWorkEmail(true);
      errors.email = "Please enter a valid working email !";
    } else {
      errors.email = "";
    }

    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [inputValues]);

  //Handle Submit Updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fName, lName, email } = inputValues;
    if (
      validation.email !== "" ||
      validation.fName !== "" ||
      validation.lName !== ""
    ) {
      toast.error("Please submit valid information");
    } else {
      const payload = {
        appId: 1,
        firstName: fName,
        lastName: lName,
        userName: "",
        password: "",
        email: email,
        status: 1,
        countryCode: selectedCountry,
        regionCode: region,
      };
      setLoading(true);

      await axios
        .post("http://localhost:8086/public/api/v1/register", payload)
        .then(function (res) {
          console.log("res", res);
          setLoading(false);
          const { message, code, response } = res.data;
          code === "101" && toast.error(message);
          if (code === "100") {
            toast.success(
              "User registered successfully. Please check your email for further process !"
            );
            localStorage.setItem(
              "userRegisteredInfo",
              JSON.stringify(response)
            );
            // setUserEmail(response.email);
          }
        })

        .catch(function (error) {
          toast.error(error.message);
          setLoading(false);
          console.log("register catch", error);
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
        <div
          id="login-box"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="left">
            <h1>Sign up now to get started !</h1>
            <form>
              <div className="col p-0">
                <input
                  type="text"
                  name="email"
                  placeholder="Work Email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className="input-field mb-1"
                  value={inputValues.email}
                />
                {validation.email && (
                  <p className="text-danger fs-13">{validation.email}</p>
                )}
              </div>
              <br />

              {isWorkEmail && (
                <>
                  <div style={{ display: "flex" }}>
                    <div className="col p-0">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="input-field mr-3 mb-1"
                        name="fName"
                        id="fName"
                        onChange={(e) => handleChange(e)}
                        value={inputValues.fName}
                      />
                      {validation.fName && (
                        <p className="text-danger fs-13">{validation.fName}</p>
                      )}
                    </div>

                    <div className="col pr-0">
                      <input
                        type="text"
                        placeholder="Last Name"
                        id="lName"
                        name="lName"
                        className="input-field mb-1"
                        onChange={(e) => handleChange(e)}
                        value={inputValues.lName}
                      />
                      {validation.lName && (
                        <p className="text-danger fs-13">{validation.lName}</p>
                      )}
                    </div>
                  </div>
                  <br />

                  <label htmlFor="">Country</label>
                  <br />
                  <select
                    className="select-regions"
                    value={selectedCountry}
                    onChange={(e) => selectCountryHandler(e.target.value)}
                  >
                    {!!countryArr?.length &&
                      countryArr.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                  </select>
                  <br />
                </>
              )}
              <label htmlFor="">Region</label>
              <br />

              <select
                value={region}
                className="select-regions"
                onChange={(e) => setRegion(e.target.value)}
              >
                {Object.entries(regions).map((reg) => (
                  <option value={reg[1]}>{reg[0]}</option>
                ))}
              </select>

              <label className="text-warning">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setCheck(!isChecked)}
                />
                &nbsp; I acknowledge that I have read and agree End User Terms.
              </label>
            </form>

            <br />

            <button
              type="submit"
              disabled={!isChecked}
              onClick={handleSubmit}
              className="btn btn-primary btn-lg btn-block fs-15"
            >
              Sign Up
            </button>
            <br />
            <Link to={`/signin`} className="small text-info">
              Already have an account? Sign In &nbsp;
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>

        <div className="text-light registration-notes">
          <h5 className="text-warning">
            See how you can get more from your company's data in three ways
          </h5>
          <br />
          <ul className="fs-14 ">
            <li>
              <strong>Fast:</strong> &nbsp; Experience zero-code, zero
              distruption and seamless ELT and ETL.
            </li>
            <br />

            <li>
              <strong>Free:</strong> &nbsp; Start free and opt for a flexible,
              pay-as-you-go options as your grow.
            </li>
            <br />

            <li>
              <strong>Proven:</strong> &nbsp; Count on secure, enterprise-grade,
              self service data-integration.
            </li>
          </ul>
          <br />
          <p className="fs-15">
            Find out how far Cloud Data Integration-Free can take you Simply add
            this Al poweredsolution to your toolkit today—and start turning data
            into ready-to-use insights in minutes.
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
