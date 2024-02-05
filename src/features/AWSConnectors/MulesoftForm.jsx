import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "react-bootstrap";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const MulesoftForm = ({ handleNext }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    apiId: "",
    environmnet: "",
  });

  //Context
  const { setAWSdata } = useScanContext();

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };
  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmitForm = () => {
    console.log("formData", formData);
    setLoading(true);

    const mulesoftParams = {
      userId: formData.userId,
      password: formData.password,
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
            <label className="fs-13 mt-1" htmlFor="userId">
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
                disabled={!isFormValid()}
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
