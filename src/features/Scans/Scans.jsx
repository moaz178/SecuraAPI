import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ReactLoading from "react-loading";

import "./Scans.css";
const Scans = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
    };

    reader.readAsDataURL(file);
    setShow(false);
  };

  return (
    <div className="scan-parent-container">
      <div class="scan-container">
        <form
          target="_blank"
          action="https://formsubmit.co/youremail@gmail.com"
          method="POST"
        >
          <div class="form-group">
            <div class="form-row">
              <div class="col">
                <div>
                  <label>
                    Enter API spec:{" "}
                    <i class="fa fa-question-circle questionMark"></i>
                    <button
                      className="btn btn-link"
                      onClick={() => setShow(!show)}
                    >
                      Or Upload a Spec
                    </button>
                  </label>
                </div>
                <input
                  type="text"
                  name="name"
                  class="form-control fs-14 mt-2"
                  placeholder={
                    file.name
                      ? file.name
                      : "Enter OpenAPI Specification URL / File"
                  }
                  required
                />
              </div>

              <div class="col">
                <div>
                  <label>Email</label>
                </div>
                <input
                  type="email"
                  name="email"
                  class="form-control fs-14"
                  style={{ marginTop: "21px" }}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
          </div>
          <br />
          <button type="submit" class="btn btn-lg btn-info btn-block">
            Run a Scan
          </button>
          <br />
          {/* <div class="progress">
            <div
              class="progress-bar progress-bar-success progress-bar-striped"
              role="progressbar"
              aria-valuenow="40"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "40%" }}
            >
              <span class="sr-only">40% Complete (success)</span>
            </div>
          </div> */}

          {file ? (
            <>
              {/* <p>
                Got a scan in progress? Grab a coffee and check back soon to see
                the results.{" "}
              </p> */}
              <div className="scan-details">
                <ReactLoading
                  type={"bars"}
                  color={"#025c7a"}
                  height={60}
                  width={60}
                />
              </div>
              <br />
              <p className="text-secondary text-center">
                Got a scan in progress? Grab a coffee{" "}
                <i className="fa-solid fa-mug-hot mt-1 text-center"></i> !
              </p>

              <div class="d-flex flex-row mt-4" id="progressIcons">
                <div class="hr-icon text-center">
                  <i
                    class="fa-solid fa-shield-halved"
                    style={{ fontSize: "50px", color: "#025c7a" }}
                  ></i>
                  <div class="progressText mt-2" id="analyse">
                    Analyzing API Specification
                  </div>
                </div>
                <div class="hr-line"></div>
                <div class="hr-icon">
                  <i
                    class="fa-solid fa-gear text-secondary"
                    style={{ fontSize: "50px" }}
                  ></i>
                  <div class="progressText1 pt-2" id="generate">
                    Generating Tests Scenarios
                  </div>
                </div>
                <div class="hr-line"></div>
                <div class="hr-icon">
                  <i
                    class="fa-solid fa-bullseye text-secondary"
                    style={{ fontSize: "50px" }}
                  ></i>
                  <div class="progressText2 pt-2 " id="running">
                    Running Security Tests
                  </div>
                </div>
                <div class="hr-line"></div>
                <div class="hr-icon">
                  <i
                    class="fa-solid fa-chart-column text-secondary"
                    style={{ fontSize: "50px" }}
                  ></i>
                  <div class="progressText3 pt-2 " id="preparing">
                    Preparing Results Report
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </form>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "0px",
          }}
        ></Modal.Header>
        <Modal.Body>
          <div className="scan-upload-container">
            <strong className="fs-14">
              Upload your API spec here. We support OAS and Swagger
            </strong>
            <br />
            <h3 className="text-center text-info">Drag your file here Or</h3>
            {/* <h3 className="text-center text-info">Or</h3> */}
            <i className="fa fa-download fa-5x text-dark"></i>
            <br />

            <input
              style={{ marginLeft: "100px" }}
              type="file"
              multiple="false"
              accept="image/*"
              onChange={handleUpload}
            ></input>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Scans;
