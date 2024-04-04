import React from "react";

const SecuraStepper = ({
  specStatus,
  scanStatus,
  authStatus,
  scanningStart,
}) => {
  return (
    <div className="d-flex flex-row mt-4" id="progressIcons">
      <div className="text-center">
        <i
          className={`      
      fa-solid fa-shield-halved text-secondary fs-50 mb-2      
      ${
        specStatus === "In Progress" ? "blinker-active " : "blinker-deactive"
      }         
      ${specStatus === "Completed" ? "text-info" : "text-secondary"}`}
        ></i>
        <p
          className={`fs-11 ${
            specStatus === "In Progress" ? "blinker-active" : "blinker-deactive"
          }`}
        >
          {specStatus === "Not Initiated" ? (
            <div className="text-secondary">Not Initiated</div>
          ) : specStatus === "In Progress" ? (
            <div className="text-secondary">Verifying.. .</div>
          ) : specStatus === "Completed" ? (
            <div className="text-info">
              <i className="fa-solid fa-circle-check text-success"></i>{" "}
              &nbsp;Verified
            </div>
          ) : specStatus === "Failed" ? (
            <div className="text-danger">Failed</div>
          ) : (
            <></>
          )}
        </p>
        <div class="progressText pt-2 w-max-content" id="analyse">
          API Specification
        </div>
      </div>
      <div
        className={`${
          specStatus === "Completed" ? "hr-line hr-line-active" : "hr-line "
        }`}
      ></div>
      <div className="text-center">
        <i
          className={`      
          fa-regular fa-circle-check text-secondary fs-50 mb-2              
      ${authStatus === "Not Added" ? "text-secondary" : "text-info"}`}
        ></i>
        <p className={"fs-11"}>
          {authStatus === "Not Added" ? (
            <div className="text-secondary">Not Added</div>
          ) : (
            <div className="text-info">
              {" "}
              <i className="fa-solid fa-circle-check text-success"></i>{" "}
              &nbsp;Added
            </div>
          )}
        </p>
        <div class="progressText1 pt-2 w-max-content" id="generate">
          Authentication
        </div>
      </div>
      <div
        className={`${
          authStatus === "Not Added" ? "hr-line " : "hr-line hr-line-active"
        }`}
      ></div>
      <div className="text-center">
        <i
          className={`      
      fa-solid fa-bullseye text-secondary fs-50 mb-2      
      ${
        scanStatus === "In Progress" ? "blinker-active " : "blinker-deactive"
      }         
      ${scanStatus === "Completed" ? "text-info" : "text-secondary"}`}
        ></i>
        <p
          className={`fs-11 ${
            scanningStart === true && scanStatus === "In Progress"
              ? "blinker-active"
              : "blinker-deactive"
          }`}
        >
          {scanStatus === "Not Initiated" ? (
            <div className="text-secondary">Not Initiated</div>
          ) : scanStatus === "In Progress" ? (
            <div className="text-secondary">In Progress</div>
          ) : scanStatus === "Completed" ? (
            <div className="text-info">
              {" "}
              <i className="fa-solid fa-circle-check text-success"></i>{" "}
              &nbsp;Completed
            </div>
          ) : scanStatus === "Failed" ? (
            <div className="text-danger">Failed</div>
          ) : (
            <></>
          )}
        </p>
        <div class="progressText2 pt-2 w-max-content " id="running">
          Active Scan
        </div>
      </div>
      <div
        className={`${
          scanStatus === "Completed" ? "hr-line hr-line-active" : "hr-line "
        }`}
      ></div>
      <div class="text-center">
        <i
          class={`fa-solid fa-chart-column text-secondary fs-50  mb-2 ${
            scanStatus === "Completed" ? "text-info" : "text-secondary"
          }`}
        ></i>
        <p className="fs-11">
          {scanStatus === "Not Initiated" ? (
            <div className="text-secondary">Not Initiated</div>
          ) : scanStatus === "In Progress" ? (
            <div className="text-secondary">Waiting</div>
          ) : scanStatus === "Completed" ? (
            <div className="text-info">
              {" "}
              <i className="fa-solid fa-circle-check text-success"></i>{" "}
              &nbsp;Achieved
            </div>
          ) : scanStatus === "Failed" ? (
            <div className="text-danger">Failed</div>
          ) : (
            <></>
          )}
        </p>
        <div class="progressText3 pt-2 w-max-content" id="preparing">
          Reports Results
        </div>
      </div>
    </div>
  );
};

export default SecuraStepper;
