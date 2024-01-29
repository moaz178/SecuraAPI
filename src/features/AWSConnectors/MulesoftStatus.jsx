import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useScanContext } from "../../contexts/scanContext/scanContext";

const MulesoftStatus = ({ handlePrevious }) => {
  //Context
  const { awsData } = useScanContext();
  const navigate = useNavigate();
  return (
    <div className="d-flex" style={{ marginLeft: "50px", marginTop: "30px" }}>
      <Card style={{ width: "1100px" }} className="shadow">
        <Card.Body>
          <strong className="fs-20 text-secondary">
            <span>Mule</span> Connectors
          </strong>
          <br />
          <p className="fs-30 text-center" style={{ marginTop: "100px" }}>
            {" "}
            {awsData.msg && (
              <>
                {awsData.msg}{" "}
                <i className="fa-solid fa-check ml-2 text-success fs-30"></i>
              </>
            )}
            {awsData.error && (
              <>
                {awsData.error}{" "}
                <i class="fa-solid fa-circle-exclamation text-danger"></i>{" "}
              </>
            )}
          </p>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "230px" }}
          >
            {awsData.msg && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/home/scans", { replace: true });
                }}
              >
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  Next
                </strong>
              </button>
            )}
            {awsData.error && (
              <button className="btn btn-primary" onClick={handlePrevious}>
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  <i class="fa-solid fa-arrow-left"></i> Back
                </strong>
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MulesoftStatus;
