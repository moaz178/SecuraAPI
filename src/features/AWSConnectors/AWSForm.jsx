import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card } from "react-bootstrap";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { secura_URL } from "../../utils/endpoint";

const AWSForm = ({ handleNext }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    awsKey: "",
    awsSecret: "",
    stageName: "",
    apiId: "",
    region: "",
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

    const awsParams = {
      awsKey: formData.awsKey,
      awsSecret: formData.awsSecret,
      stageName: formData.stageName,
      apiId: formData.apiId,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      awsRegion: formData.region,
    };
    axios
      .post(`${secura_URL}/AWS_Connect`, awsParams)
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
        console.log("aws form error", error);
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
              <span className="">AWS</span> Connectors
            </strong>
            <br />
            <p className="text-secondary fs-13 mt-1">
              Please Enter following fields !
            </p>
            <label className="fs-13 mt-1" htmlFor="awsKey">
              <strong>AWS Key</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              type="text"
              id="awsKey"
              name="awsKey"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "awsKey")}
              // placeholder="AWS Key"
            />

            <br />
            <label className="fs-13" htmlFor="secretKey">
              <strong>Secret Key</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              type="text"
              id="secretKey"
              name="secretKey"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "awsSecret")}
              // placeholder="Secret Key"
            />

            <br />
            <label className="fs-13" htmlFor="stageName">
              <strong>Stage Name</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              type="text"
              id="stageName"
              name="stageName"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "stageName")}
              // placeholder="Stage Name"
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
            <label className="fs-13" htmlFor="region">
              <strong>Region</strong>
            </label>
            <input
              type="text"
              id="region"
              name="region"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "region")}
              // placeholder="API ID"
            />

            {/* <br />
            <label className="fs-13" htmlFor="region">
              <strong>Region</strong>
              <strong className="text-danger ml-1">*</strong>
            </label>
            <input
              type="text"
              id="region"
              name="region"
              className="form-control fs-13"
              onChange={(e) => handleChange(e, "region")}
              placeholder="Region"
            /> */}

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
        <div style={{ width: "500px", marginTop: "100px", marginLeft: "10px" }}>
          <strong className="fs-20 ">
            <span>AWS</span> Connectors
          </strong>
          <p className="fs-14 text-secondary mt-3">
            Easily retrieve API specifications from API Gateway using our
            intuitive platform. We've seamlessly integrated AWS CLI connectors,
            providing a straightforward and hassle-free method for downloading
            API details. Enhance your experience with our scanning tool,
            streamlining the entire process for efficient utilization.
          </p>
        </div>
      </div>
    </>
  );
};

export default AWSForm;
