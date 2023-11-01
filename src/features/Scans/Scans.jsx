import React, { useState, useEffect } from "react";
import { Container, Table, Collapse, Modal, Form } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import "./Scans.css";
const Scans = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [scanningStart, setScanningStart] = useState(false);
  const [refrenceID, setRefrenceID] = useState("");
  const [scanResults, setScanResutls] = useState(null);
  const [progressMsg, setProgressMsg] = useState("");
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCollapseTableOpen, setIsCollapseTableOpen] = useState(false);
  const [openRows, setOpenRows] = useState([]);

  const toggleCollapseTable = (rowId) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(rowId)
        ? prevOpenRows.filter((id) => id !== rowId)
        : [...prevOpenRows, rowId]
    );
  };

  // useEffect(() => {
  //   caches.keys().then((names) => {
  //     names.forEach((name) => {
  //       caches.delete(name);
  //     });
  //   });
  // }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };

  //UPLOAD FILE API CALL
  const uploadFile = () => {
    const form = new FormData();
    form.append("secura_apiFile", file);
    form.append("secura_key", "6m1fcduh0lm3h757ofun4194jn");
    form.append("secura_sslEnabled", false);
    setLoading(true);
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/Upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (res) {
        setLoading(false);
        const { error, referenceId, targetHost } = res.data;
        if (error !== null) toast.error(error);
        else {
          setScanningStart(true);
          setRefrenceID(referenceId);
          scanAPI(referenceId, targetHost);
          getLiveScanProgress(referenceId);
        }
      })
      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("uploaded file error", error);
      });
  };

  //SCAN API CALL
  const scanAPI = (referenceId, targetHost) => {
    const scanParams = {
      secura_referenceId: referenceId,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_targetHost: targetHost,
    };

    axios
      .post(`http://192.168.18.20:8082/SecuraCore/ScanAPI`, scanParams)
      .then(function (res) {
        setLoading(false);
        setScanResutls(res.data);
        if (res.data.vulnerability === null) {
          toast.error("Something went wrong ! Try again");
          setScanningStart(false);
        }
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("scanning error", error);
      });
  };

  // REAL TIME SCAN PROGRESS VIA WEB SOCKETS
  const getLiveScanProgress = (referenceId) => {
    const ws = new WebSocket("ws://192.168.18.20:8082/SecuraCore/LiveStatus");
    ws.onerror = (error) => {
      toast.error(error);
      console.log(error);
    };
    ws.onopen = function () {
      console.log("connection established successfully");
      ws.send(referenceId);
    };
    ws.onmessage = (e) => {
      const recievedMessage = e.data;
      console.log("recieved messages", recievedMessage);
      setProgressMsg(recievedMessage);

      const percentageMatch = recievedMessage.match(/Progress\s*:\s*(\d+)\s*%/);

      if (percentageMatch && percentageMatch[1]) {
        const extractedPercentage = parseInt(percentageMatch[1], 10);
        console.log("extractedPercentage: ", extractedPercentage);
        setProgress(extractedPercentage);
      }
      return false;
    };
    ws.onclose = function () {
      // setTimeout(getLiveScanProgress, 1000);
      ws.onmessage = (e) => {
        const recievedMessage = e.data;
        console.log("recieved messages", recievedMessage);
        setProgressMsg(recievedMessage);

        const percentageMatch = recievedMessage.match(
          /Progress\s*:\s*(\d+)\s*%/
        );

        if (percentageMatch && percentageMatch[1]) {
          const extractedPercentage = parseInt(percentageMatch[1], 10);
          console.log("extractedPercentage: ", extractedPercentage);
          setProgress(extractedPercentage);
        }
        return false;
      };
    };
  };

  console.log("results", scanResults);

  const getBadgeColor = (risk) => {
    switch (risk) {
      case "1":
        return "badge-danger";
      case "2":
        return "badge-warning";
      case "3":
        return "badge-info";
      case "4":
        return "badge-success";
      default:
        return "badge-secondary";
    }
  };

  // const renderValue = (value) => {
  //   if (typeof value === "object") {
  //     return JSON.stringify(value);
  //   }
  //   return value;
  // };

  const renderNestedTable = (subDetails, rowId) => (
    <Collapse in={openRows.includes(rowId)}>
      <div>
        <Table className="m-0">
          <tbody>
            {Object.entries(subDetails).map(([key, value]) => (
              <React.Fragment key={key}>
                <tr>
                  <td>
                    <div
                      className="clickable fs-14 text-secondary"
                      onClick={() => toggleCollapseTable(`${rowId}-${key}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>
                        <i class="fa-solid fa-angle-down ml-4 mr-5"></i>
                      </strong>
                      &nbsp;
                      <strong> {key}</strong>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ padding: "0px" }}>
                    <Collapse in={openRows.includes(`${rowId}-${key}`)}>
                      <div>
                        <Table bordered>
                          <tbody className="fs-13">
                            {Object.entries(value).map(([key, value]) => (
                              <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </Collapse>
  );

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

      <div className="scan-parent-container">
        <div class="scan-container">
          <form>
            <div class="form-group">
              <div class="form-row">
                <div class="col">
                  <div>
                    <label>
                      Enter API spec:{" "}
                      <i class="fa fa-question-circle questionMark"></i>
                      <button
                        className="btn btn-link"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(!show);
                        }}
                      >
                        Or Upload a Spec
                      </button>
                    </label>
                  </div>
                </div>
                <div class="col d-flex justify-content-end">
                  <div>
                    <Container className="mt-2">
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label=""
                          // checked={isChecked}
                          // onChange={handleSwitchChange}
                        />
                      </Form>
                    </Container>
                    {/* <button
                      className="btn btn-link"
                      onClick={(e) => {
                        setFile("");
                        setScanResutls(null);
                        setScanningStart(false);
                      }}
                    >
                      Reset
                    </button> */}
                  </div>
                </div>

                <input
                  type="text"
                  name="name"
                  className="form-control fs-14 mt-2 mx-2"
                  placeholder={
                    file.name
                      ? file.name
                      : "Enter OpenAPI Specification URL / File"
                  }
                />

                {/* <div class="col">
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
              </div> */}
              </div>
            </div>
            <br />
            <button
              type="submit"
              class="btn btn-lg btn-info btn-block mb-2"
              onClick={handleSubmit}
              disabled={!file.name}
            >
              Run a Scan
            </button>

            <br />
            <div className="d-flex flex-row mt-4" id="progressIcons">
              <div className="text-center">
                <i
                  className={`      
                  fa-solid fa-shield-halved text-secondary fs-50 mb-2      
                  ${
                    file === "" ? "blinker-active " : "blinker-deactive"
                  }         
                  ${file === "" ? "text-secondary" : "text-info"}`}
                ></i>
                <p
                  className={`fs-11 ${
                    file === "" ? "blinker-active" : "blinker-deactive"
                  }`}
                >
                  {file === "" ? (
                    <div className="text-secondary">In Progress</div>
                  ) : (
                    <div className="text-info">Completed</div>
                  )}
                </p>
                <div class="progressText pt-2 w-max-content" id="analyse">
                  API Specification
                </div>
              </div>
              <div className="hr-line hr-line-active"></div>
              <div className="text-center">
                <i
                  className={`      
                  fa-solid fa-gear text-secondary fs-50 mb-2              
                  ${file === "" ? "text-secondary" : "text-info"}`}
                ></i>
                <p className="fs-11">
                  {file === "" ? (
                    <div className="text-secondary">In Progress</div>
                  ) : (
                    <div className="text-info">Completed</div>
                  )}
                </p>
                <div class="progressText1 pt-2 w-max-content" id="generate">
                  Applying Policy
                </div>
              </div>
              <div className="hr-line hr-line-active"></div>
              <div className="text-center">
                <i
                  className={`      
                  fa-solid fa-bullseye text-secondary fs-50 mb-2      
                  ${
                    scanningStart === true && scanResults === null
                      ? "blinker-active "
                      : "blinker-deactive"
                  }         
                  ${scanResults === null ? "text-secondary" : "text-info"}`}
                ></i>
                <p
                  className={`fs-11 ${
                    scanningStart === true && scanResults === null
                      ? "blinker-active"
                      : "blinker-deactive"
                  }`}
                >
                  {scanResults === null ? (
                    <div className="text-secondary">In Progress</div>
                  ) : (
                    <div className="text-info">Completed</div>
                  )}
                </p>
                <div class="progressText2 pt-2 w-max-content " id="running">
                  Active Scan
                </div>
              </div>
              <div
                class={
                  scanResults !== null ? "hr-line  hr-line-active" : "hr-line"
                }
              ></div>
              <div class="text-center">
                <i
                  class={`fa-solid fa-chart-column text-secondary fs-50  mb-2 ${
                    scanResults === null ? "text-secondary" : "text-info"
                  }`}
                ></i>
                <p className="fs-11">
                  {scanResults === null ? (
                    <div className="text-secondary">In Progress</div>
                  ) : (
                    <div className="text-info">Completed</div>
                  )}
                </p>
                <div class="progressText3 pt-2 w-max-content" id="preparing">
                  Reports Results
                </div>
              </div>
            </div>

            {scanningStart ? (
              <>
                {scanResults === null ? (
                  <div className="scan-details">
                    <ReactLoading
                      type={"spin"}
                      color={"rgb(17 150 171)"}
                      height={60}
                      width={60}
                    />
                  </div>
                ) : null}

                <br />
                <p className="text-secondary text-center pb-1">
                  Got a scan in progress? If so grab a coffee and check back
                  soon to see the results. &nbsp;
                  <i className="fa-solid fa-mug-hot mt-1 text-center"></i> !
                </p>

                {progressMsg && (
                  <>
                    <br />
                    <br />
                    <div class="progress progress-striped active">
                      <div
                        role="progressbar progress-striped"
                        className={`progress-bar `}
                        style={{ width: `${progress}%` }}
                      >
                        <span> {progress}% Completed</span>
                      </div>
                    </div>

                    <br />
                    <div
                      className="alert alert-success fs-13 text-center"
                      role="alert"
                    >
                      {progressMsg}
                    </div>
                  </>
                )}
                <br />
                <br />
                {scanResults !== null ? (
                  <>
                    <strong className="fs-20">Summary:</strong>
                    <br />
                    <br />
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong className="fs-15 text-primary">
                          Scan Information
                        </strong>
                        <div className="d-flex">
                          <div>
                            <p className="fs-14 text-secondary mt-2">
                              Scan Started :
                            </p>
                            <p className="fs-14 text-secondary">Scan Ended :</p>
                            <p className="fs-14 text-secondary">
                              Scan Duration :
                            </p>
                            <p className="fs-14 text-secondary">
                              Scan Status :
                            </p>
                          </div>
                          <div className="ml-4">
                            <p className="fs-14 text-secondary mt-2">
                              <strong className="fs-14 text-secondary">
                                {scanResults.status
                                  ? scanResults.status.startTime
                                  : "N/A"}
                              </strong>
                            </p>
                            <p className="fs-14 text-secondary">
                              <strong className="fs-14 text-secondary">
                                {scanResults.status
                                  ? scanResults.status.endTime
                                  : "N/A"}
                              </strong>
                            </p>
                            <p className="fs-14 text-secondary">
                              <strong className="fs-14 text-secondary">
                                {scanResults.status
                                  ? scanResults.status.Duration
                                  : "N/A"}
                              </strong>
                            </p>
                            <p className="fs-14 text-secondary">
                              <span class="badge badge-success">Finished</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <strong className="fs-15 text-primary">Findings</strong>

                        <div className="d-flex justify-content-between">
                          <div>
                            <p className="fs-14 text-secondary mt-2">High :</p>
                            <p className="fs-14 text-secondary mt-3">
                              Medium :
                            </p>
                            <p className="fs-14 text-secondary mt-3">Low:</p>
                            <p className="fs-14 text-secondary mt-3">
                              Informational :
                            </p>
                          </div>
                          <div className="ml-4">
                            <div
                              className="py-1 bg-danger text-light mt-1 "
                              style={{
                                width: `${
                                  scanResults.summary.High
                                    ? scanResults.summary.High + 40
                                    : 40
                                }px`,
                              }}
                            >
                              <strong className="fs-15 pl-3">
                                {scanResults.summary.High
                                  ? scanResults.summary.High
                                  : 0}
                              </strong>
                            </div>
                            <div
                              className="py-1 bg-warning text-light mt-1 "
                              style={{
                                width: `${
                                  scanResults.summary.Medium
                                    ? scanResults.summary.Medium + 40
                                    : 40
                                }px`,
                              }}
                            >
                              <strong className="fs-15 pl-3">
                                {scanResults.summary.Medium
                                  ? scanResults.summary.Medium
                                  : 0}
                              </strong>
                            </div>
                            <div
                              className="py-1 bg-primary text-light mt-1 "
                              style={{
                                width: `${
                                  scanResults.summary.Low
                                    ? scanResults.summary.Low + 40
                                    : 40
                                }px`,
                              }}
                            >
                              <strong className="fs-15 pl-3">
                                {scanResults.summary.Low
                                  ? scanResults.summary.Low
                                  : 0}
                              </strong>
                            </div>
                            <div
                              className="py-1 text-light mt-1"
                              style={{
                                width: `${
                                  scanResults.summary.Informational
                                    ? scanResults.summary.Informational + 40
                                    : 40
                                }px`,
                                background: "rgb(128 199 145)",
                              }}
                            >
                              <strong className="fs-15 pl-3">
                                {scanResults.summary.Informational
                                  ? scanResults.summary.Informational
                                  : 0}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="grey-hr" />
                    <br />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "160px" }}>
                        <div className="py-3 bg-danger text-light text-center width-75">
                          <strong className="fs-50">
                            {" "}
                            {scanResults.summary.High
                              ? scanResults.summary.High
                              : 0}
                          </strong>
                        </div>
                        <div className="py-1 bg-danger text-light mt-1 text-center width-75">
                          <strong className="fs-15 ">High</strong>
                        </div>
                      </div>
                      <div style={{ width: "160px" }}>
                        <div className="py-3 bg-warning text-light text-center width-75">
                          <strong className="fs-50">
                            {scanResults.summary.Medium
                              ? scanResults.summary.Medium
                              : 0}
                          </strong>
                        </div>
                        <div className="px-1 py-1 bg-warning text-light mt-1 text-center width-75">
                          <strong className="fs-15 ">Medium</strong>
                        </div>
                      </div>
                      <div style={{ width: "160px" }}>
                        <div className="py-3 bg-primary text-light text-center width-75">
                          <strong className="fs-50">
                            {scanResults.summary.Low
                              ? scanResults.summary.Low
                              : 0}
                          </strong>
                        </div>
                        <div className="px-1 py-1 bg-primary text-light mt-1 text-center width-75">
                          <strong className="fs-15 ">Low</strong>
                        </div>
                      </div>

                      <div style={{ width: "200px" }}>
                        <div className="py-3 bg-success text-light text-center width-75">
                          <strong className="fs-50">
                            {scanResults.summary.Informational
                              ? scanResults.summary.Informational
                              : 0}
                          </strong>
                        </div>
                        <div className="px-1 py-1 bg-success text-light mt-1 text-center width-75">
                          <strong className="fs-15 ">Informational</strong>
                        </div>
                      </div>

                      <div style={{ width: "410px" }}>
                        <div className="text-secondary">
                          <p>
                            Any <strong className="text-danger">High</strong>{" "}
                            and <strong className="text-warning">Medium</strong>{" "}
                            risk vulnerabilities should be investigated and
                            confirmed so that remedation can take place.
                            <strong className="text-primary"> Low</strong> risk
                            items should not be ignored as they can be chained
                            with other vulnerabilities to enable further
                            attacks.
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <strong className="fs-20 text-primary">
                      {" "}
                      Vulnerabilities Summary:
                    </strong>

                    <Container className="mt-5">
                      <Table>
                        <thead style={{ background: "#f5f5f5" }}>
                          <tr>
                            <th scope="col">Severity</th>
                            <th scope="col">Description</th>
                            <th scope="col">Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(scanResults.vulnerability).map(
                            ([severity, details]) => (
                              <React.Fragment key={severity}>
                                {Object.entries(details).map(
                                  ([description, subDetails]) => (
                                    <React.Fragment key={description}>
                                      <tr
                                        className="clickable"
                                        onClick={() =>
                                          toggleCollapseTable(
                                            `${severity}-${description}`
                                          )
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>
                                          <span
                                            className={`badge ${getBadgeColor(
                                              severity
                                            )} px-3 py-1`}
                                          >
                                            {severity === "1"
                                              ? "High"
                                              : severity === "2"
                                              ? "Medium"
                                              : severity === "3"
                                              ? "Low"
                                              : "Informational"}
                                          </span>
                                        </td>
                                        <td>{description}</td>
                                        <td>
                                          {Object.keys(subDetails).length}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan="3"
                                          style={{ padding: "0px" }}
                                        >
                                          {renderNestedTable(
                                            subDetails,
                                            `${severity}-${description}`
                                          )}
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  )
                                )}
                              </React.Fragment>
                            )
                          )}
                        </tbody>
                      </Table>
                    </Container>

                    {/* <div className="mt-3 fs-13">
                      {Object.keys(scanResults.vulnerability).map((key) => (
                        <div key={key}>
                          {Object.keys(scanResults.vulnerability[key]).map(
                            (subKey) => (
                              <div key={subKey}>
                                <div className="card-body p-2">
                                  <div className="flex flex-column faq-section">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div id="accordion">
                                          <div className="card">
                                            <div
                                              className="card-header"
                                              id={`heading-${key}-${subKey}`}
                                            >
                                              <h6 className="mb-0">
                                                <a
                                                  className="text-secondary"
                                                  role="button"
                                                  onClick={() =>
                                                    handleCollapseToggle(
                                                      key,
                                                      subKey
                                                    )
                                                  }
                                                  data-toggle={`collapse-${key}-${subKey}`}
                                                  href={`#collapse-${key}-${subKey}`}
                                                  aria-expanded={
                                                    openCollapses[
                                                      `${key}-${subKey}`
                                                    ]
                                                  }
                                                  aria-controls={`collapse-${key}-${subKey}`}
                                                >
                                                  <strong>{subKey}</strong>
                                                </a>
                                              </h6>
                                            </div>
                                            <div
                                              id={`collapse-${key}-${subKey}`}
                                              className={`collapse ${
                                                openCollapses[
                                                  `${key}-${subKey}`
                                                ]
                                                  ? "show"
                                                  : ""
                                              }`}
                                              data-parent="#accordion"
                                              aria-labelledby={`heading-${key}-${subKey}`}
                                            >
                                              <div className="card-body">
                                                <table className="table">
                                                  <tbody>
                                                    {Object.entries(
                                                      scanResults.vulnerability[
                                                        key
                                                      ][subKey]
                                                    ).map(
                                                      (
                                                        [property, value],
                                                        index
                                                      ) => (
                                                        <tr
                                                          key={property}
                                                          className={
                                                            index % 2 === 0
                                                              ? "table-offwhite"
                                                              : "table-white"
                                                          }
                                                        >
                                                          <th scope="row">
                                                            {property}
                                                          </th>
                                                          <td>{value}</td>
                                                        </tr>
                                                      )
                                                    )}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div> */}
                  </>
                ) : (
                  <SkeletonLoader />
                )}
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
                onChange={handleUpload}
              ></input>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Scans;
