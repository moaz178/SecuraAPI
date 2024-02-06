import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "react-bootstrap";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

// Inside your component
const MulesoftForm = ({ handleNext }) => {
  const [loading, setLoading] = useState(false);
  const [isMFAEnabled, setMFAEnabled] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    apiId: "",
    environmnet: "",
    clientId: "",
    clientSecret: "",
  });
  const [formValid, setFormValid] = useState(false);

  // Define isFormValid function
  const isFormValid = () => {
    if (isMFAEnabled) {
      return (
        formData.apiId.trim() !== "" &&
        formData.environmnet.trim() !== "" &&
        formData.clientId.trim() !== "" &&
        formData.clientSecret.trim() !== ""
      );
    } else {
      return (
        formData.userId.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.apiId.trim() !== "" &&
        formData.environmnet.trim() !== ""
      );
    }
  };

  // Update form validity whenever formData or isMFAEnabled changes
  useEffect(() => {
    const isValid = isFormValid();
    setFormValid(isValid);
  }, [formData, isMFAEnabled]);

  //Context
  const { setAWSdata } = useScanContext();

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmitForm = () => {
    console.log("formData", formData);
    setLoading(true);

    const mulesoftParams = {
      ...(isMFAEnabled
        ? {
            isMFA: true,
            client_id: formData.clientId,
            client_secret: formData.clientSecret,
          }
        : { userId: formData.userId, password: formData.password }),

      apiId: formData.apiId,
      environmnet: formData.environmnet,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
    };
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/Mule_Connect`, mulesoftParams)
      .then(function (res) {
        setAWSdata(res.data);
        setLoading(false);
        handleNext();
        // if (res.data.error !== null) {
        //   toast.error(res.data.error);
        //   setLoading(false);
        // }
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("mulesoft form error", error);
      });
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
      <div
        className="d-flex justify-content-between"
        style={{ marginLeft: "50px", marginTop: "30px" }}
      >
        <Card style={{ width: "600px" }} className="shadow">
          <Card.Body>
            <strong className="fs-20 text-secondary">
              <span className="">Mule</span> Connectors
            </strong>
            <br />
            <div className="mt-2 mb-3">
              <img
                src="/dist/muleAPI.png"
                alt="apimanager-logo"
                width="30px"
                className="mr-2"
              />
              <strong className="fs-14 text-secondary">API Manager</strong>
            </div>

            <p className="text-secondary fs-13 mt-1 mb-3">
              Please Enter following fields !
            </p>

            <div class="form-check ml-1">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="MFACheckbox"
                checked={isMFAEnabled}
                onChange={() => setMFAEnabled(!isMFAEnabled)}
              />
              <label
                className="form-check-label fs-13 text-primary"
                for="flexCheckDefault"
              >
                Is MFA Enabled ?
              </label>
            </div>

            {isMFAEnabled ? (
              <>
                {" "}
                <label className="fs-13 mt-3" htmlFor="clientId">
                  <strong>Client ID:</strong>
                  <strong className="text-danger ml-1">*</strong>
                </label>
                <input
                  type="text"
                  id="clientId"
                  name="clientId"
                  className="form-control fs-13"
                  onChange={(e) => handleChange(e, "clientId")}
                />
                <br />
                <label className="fs-13" htmlFor="clientSecret">
                  <strong>Client Secret</strong>
                  <strong className="text-danger ml-1">*</strong>
                </label>
                <input
                  type="text"
                  id="clientSecret"
                  name="clientSecret"
                  className="form-control fs-13"
                  onChange={(e) => handleChange(e, "clientSecret")}
                />
              </>
            ) : (
              <>
                <label className="fs-13 mt-3" htmlFor="userId">
                  <strong>User ID:</strong>
                  <strong className="text-danger ml-1">*</strong>
                </label>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  className="form-control fs-13"
                  onChange={(e) => handleChange(e, "userId")}
                  // placeholder="AWS Key"
                />

                <br />
                <label className="fs-13" htmlFor="password">
                  <strong>Password</strong>
                  <strong className="text-danger ml-1">*</strong>
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="form-control fs-13"
                  onChange={(e) => handleChange(e, "password")}
                  // placeholder="Secret Key"
                />
              </>
            )}

            <br />
            <label className="fs-13" htmlFor="apiId">
              <strong>API ID</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              type="text"
              id="apiId"
              name="apiId"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "apiId")}
              // placeholder="API ID"
            />

            <br />
            <label className="fs-13" htmlFor="environment">
              <strong>Environment</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              type="text"
              id="environment"
              name="environmnet"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "environmnet")}
              placeholder="Sandbox"
            />
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "30px" }}
            >
              {/* <button className="btn btn-primary mr-3" onClick={handlePrevious}>
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  <i class="fa-solid fa-arrow-left"></i> Back
                </strong>
              </button> */}
              <button
                className="btn btn-primary"
                onClick={handleSubmitForm}
                disabled={!formValid}
              >
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  Next <i class="fa-solid fa-arrow-right"></i>
                </strong>
              </button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MulesoftForm;
