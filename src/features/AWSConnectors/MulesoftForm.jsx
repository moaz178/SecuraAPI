import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useScanContext } from "../../contexts/scanContext/scanContext";

const MulesoftForm = ({ handleNext }) => {
  const [isMFAEnabled, setMFAEnabled] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    environmnet: "",
    clientId: "",
    clientSecret: "",
  });
  const [formValid, setFormValid] = useState(false);

  // Define isFormValid function
  const isFormValid = () => {
    if (isMFAEnabled) {
      return (
        formData.clientId.trim() !== "" &&
        formData.clientSecret.trim() !== "" &&
        formData.environmnet.trim() !== ""
      );
    } else {
      return (
        formData.userId.trim() !== "" &&
        formData.password.trim() !== "" &&
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
  const { setMuleData } = useScanContext();

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmitForm = () => {
    const mulesoftParams = {
      isMFA: isMFAEnabled,
      client_id: formData.clientId,
      client_secret: formData.clientSecret,
      userId: formData.userId,
      password: formData.password,
      environmnet: formData.environmnet,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
    };

    setMuleData(mulesoftParams);
    handleNext();
  };
  return (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ marginLeft: "50px", marginTop: "30px" }}
      >
        <Card style={{ width: "700px" }} className="shadow">
          <Card.Body>
            <strong className="fs-20 text-secondary">
              <span className="">Mule</span> Connectors
            </strong>
            <br />
            <div className="mt-2 mb-3">
              <img
                src={process.env.PUBLIC_URL + "/dist/muleAPI.png"}
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
                  value={formData.clientId}
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
                  value={formData.clientSecret}
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
                  value={formData.userId}
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
                  value={formData.password}
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
            <label className="fs-13" htmlFor="environment">
              <strong>Environment</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              value={formData.environmnet}
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

        <div style={{ width: "400px", marginTop: "100px", marginLeft: "20px" }}>
          <strong className="fs-20 ">
            <span>About Mule</span> <i class="fa-solid fa-arrow-right-long"></i>
          </strong>
          <p className="fs-14 text-secondary mt-3">
            Easily retrieve API specifications from API Gateway using our
            intuitive platform. We've seamlessly integrated Mule CLI connectors,
            providing a straightforward and hassle-free method for downloading
            API details. Enhance your experience with our scanning tool,
            streamlining the entire process for efficient utilization.
          </p>
        </div>
      </div>
    </>
  );
};

export default MulesoftForm;
