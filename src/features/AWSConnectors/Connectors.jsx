import React, { useState } from "react";
import { Card } from "react-bootstrap";
import AWSForm from "./AWSForm";
import MulesoftForm from "./MulesoftForm";
import AWSStatus from "./AWSStatus";
import MulesoftStatus from "./MulesoftStatus";
import MuleAPIList from "./MuleAPIList";

const Connectors = () => {
  const [currentScreen, setCurrentScreen] = useState("connectors");
  const [isCheckedAWS, setCheckedAWS] = useState(false);
  const [isCheckedMuleSoft, setCheckedMuleSoft] = useState(false);

  const handleNext = () => {
    switch (currentScreen) {
      case "connectors":
        if (isCheckedAWS) setCurrentScreen("formAWS");
        else if (isCheckedMuleSoft) setCurrentScreen("formMuleSoft");
        break;
      case "formAWS":
        setCurrentScreen("messageAWS");
        break;
      case "formMuleSoft":
        setCurrentScreen("muleAPIList");
        break;
      case "muleAPIList":
        setCurrentScreen("messageMuleSoft");
        break;
      case "messageAWS":
      case "messageMuleSoft":

      default:
        setCurrentScreen("connectors");
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentScreen) {
      case "formAWS":
      case "formMuleSoft":
        setCurrentScreen("connectors");
        break;
      case "messageAWS":
        setCurrentScreen("formAWS");
        break;
      case "muleAPIList":
        setCurrentScreen("formMuleSoft");
        break;
      case "messageMuleSoft":
        setCurrentScreen("formMuleSoft");
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
                <div className="d-flex">
                  <div className="d-flex flex-column">
                    <img
                      src="/dist/aws-logo.jpeg"
                      alt="aws-logo"
                      width="100px"
                      className="ml-5 pl-4"
                    />
                    <div
                      className="form-check mt-3"
                      style={{ marginLeft: "75px" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="awsCheckbox"
                        checked={isCheckedAWS}
                        onChange={() => setCheckedAWS(!isCheckedAWS)}
                        disabled={isCheckedMuleSoft}
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column justify-content-start">
                    <img
                      src="/dist/mulesoft.png"
                      alt="mulesoft-logo"
                      width="100px"
                      className="ml-5 pl-4"
                    />
                    <div
                      className="form-check mt-3"
                      style={{ marginLeft: "75px" }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="muleSoftCheckbox"
                        checked={isCheckedMuleSoft}
                        onChange={() => setCheckedMuleSoft(!isCheckedMuleSoft)}
                        disabled={isCheckedAWS}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex justify-content-end"
                  style={{ marginTop: "230px" }}
                >
                  <button
                    className="btn btn-primary"
                    disabled={!isCheckedAWS && !isCheckedMuleSoft}
                    onClick={handleNext}
                  >
                    <strong style={{ letterSpacing: "1px" }}>
                      Next <i class="fa-solid fa-arrow-right"></i>
                    </strong>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      case "formAWS":
        return <AWSForm handleNext={handleNext} />;
      case "formMuleSoft":
        return <MulesoftForm handleNext={handleNext} />;
      case "messageAWS":
        return <AWSStatus handlePrevious={handlePrevious} />;
      case "messageMuleSoft":
        return <MulesoftStatus handlePrevious={handlePrevious} />;
      case "muleAPIList":
        // Conditionally render MuleAPIList based on isCheckedMuleSoft state
        return (
          <MuleAPIList
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderScreen()}</>;
};

export default Connectors;
