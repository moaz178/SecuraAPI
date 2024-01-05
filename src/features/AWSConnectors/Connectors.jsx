import React, { useState } from "react";
import { Card } from "react-bootstrap";
import AWSForm from "./AWSForm";
import AWSStatus from "./AWSStatus";

const Connectors = () => {
  const [currentScreen, setCurrentScreen] = useState("connectors");
  const [isChecked, setChecked] = useState(false);

  const handleNext = () => {
    switch (currentScreen) {
      case "connectors":
        setCurrentScreen("form");
        break;
      case "form":
        setCurrentScreen("message");
        break;
      default:
        setCurrentScreen("connectors");
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentScreen) {
      case "form":
        setCurrentScreen("connectors");
        break;
      case "message":
        setCurrentScreen("form");
        break;
      default:
        setCurrentScreen("connectors");
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "connectors":
        return (
          <div
            className="d-flex"
            style={{ marginLeft: "50px", marginTop: "30px" }}
          >
            <Card style={{ width: "1100px" }} className="shadow">
              <Card.Body>
                <strong className="fs-20 text-secondary">Connectors</strong>
                <br />
                <br />
                <img
                  src="/dist/aws-logo.jpeg"
                  alt="aws-logo"
                  width="100px"
                  className="ml-5 pl-4"
                />
                <div className="form-check mt-3" style={{ marginLeft: "75px" }}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                    checked={isChecked}
                    onChange={() => setChecked(!isChecked)}
                  />
                  {/* <label className="form-check-label fs-14" for="defaultCheck1">
                    <strong>{isChecked ? "connected" : "connect"}</strong>
                    {isChecked ? (
                      <i className="fa-solid fa-plug-circle-check ml-2 text-success fs-20"></i>
                    ) : (
                      <i className="fa-solid fa-plug-circle-xmark ml-2 text-secondary fs-20"></i>
                    )}
                  </label> */}
                </div>
                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "230px" }}
                >
                  <button
                    className="btn btn-primary"
                    disabled={!isChecked}
                    onClick={handleNext}
                  >
                    <strong
                      style={{
                        letterSpacing: "1px",
                      }}
                    >
                      Next
                    </strong>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      case "form":
        return <AWSForm handleNext={handleNext} />;
      case "message":
        return <AWSStatus handlePrevious={handlePrevious} />;
      default:
        return null;
    }
  };

  return <>{renderScreen()}</>;
};

export default Connectors;
