// src/pages/Scans/Scans.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";
import ReactLoading from "react-loading";
import { useNavigate, useLocation } from "react-router-dom";
import ScanCode from "../ScanCode/NewScanCode";
import Loader from "../../components/Loader/Loader";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import SecuraStepper from "../../components/SecuraStepper/SecuraStepper";
import SpecUploadModal from "../../components/Modal/SpecUploadModal";
import AddAuthModal from "../../components/Modal/AddAuthModal";
import ScanSummary from "../ScanSummary/ScanSummary";
import { secura_URL } from "../../utils/endpoint";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { basicSetup } from "codemirror";
import { andromeda } from "@uiw/codemirror-theme-andromeda";
import { IoIosCloseCircle } from "react-icons/io";
import "./Scans.css";

const Scans = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [sslEnabled, setSslEnabled] = useState(false);
  const [securaEnvironmentStatus, setSecuraEnvironmentStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bestpracLoading, setbestpracLoading] = useState(false);
  const [openRows, setOpenRows] = useState([]);
  const [openSpecModal, setSpecModal] = useState(false);
  const [missingHostURL, setMissingHostURL] = useState("");
  const [specurl, setspecurl] = useState("");
  const [temporary_spec, settemporary_spec] = useState("");
  const [contentType, setContentType] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [bestPracticesCache, setBestPracticesCache] = useState(null);
  const [bestPracticesCache, setBestPracticesCache] = useState(null);
  const [fetchedSpecData, setFetchedSpecData] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    scanningStart,
    setScanningStart,
    specStatus,
    setSpecStatus,
    scanStatus,
    setScanStatus,
    authStatus,
    scanResults,
    setScanResutls,
    setScanDetails,
    submittedScriptRes,
    file,
    setFile,
    inputUrlVal,
    setInputUrlVal,
    scanDetails,
    awsData,
  } = useScanContext();

  useEffect(() => {
    if (specurl) {
      sessionStorage.setItem('specurl', specurl);
    }
    if (bestPracticesCache) {
      sessionStorage.setItem('bestPracticesCache', JSON.stringify(bestPracticesCache));
    }
    if (fetchedSpecData) {
      sessionStorage.setItem('fetchedSpecData', JSON.stringify(fetchedSpecData));
    }
  }, [specurl, bestPracticesCache, fetchedSpecData]);

  useEffect(() => {
    const savedSpecUrl = sessionStorage.getItem('specurl');
    const savedBestPractices = sessionStorage.getItem('bestPracticesCache');
    const savedFetchedSpecData = sessionStorage.getItem('fetchedSpecData');
    
    if (savedSpecUrl) {
      setspecurl(savedSpecUrl);
    }
    if (savedBestPractices) {
      setBestPracticesCache(JSON.parse(savedBestPractices));
    }
    if (savedFetchedSpecData) {
      setFetchedSpecData(JSON.parse(savedFetchedSpecData));
      const parsedData = JSON.parse(savedFetchedSpecData);
      settemporary_spec(parsedData.processedData);
      setContentType(parsedData.contentType);
    }
  }, []);

  useEffect(() => {
    if (awsData && Object.keys(awsData).length !== 0 && awsData.spec_url) {
      uploadAWSSpecURL(awsData);
    }
  }, [awsData]);

  const toggleCollapseTable = (rowId) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(rowId)
        ? prevOpenRows.filter((id) => id !== rowId)
        : [...prevOpenRows, rowId]
    );
  };

  //UPLOAD FILE (onChange)
  const handleUpload = (e) => {
    
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };

  //HIT SCAN BUTTON
  const handleSubmit = (e) => {
    e.preventDefault();
    setScanningStart(true);
    scanAPI();
  };

  //UPLOAD URL API CALL
  const uploadURL = (e) => {
    
    e.preventDefault();
    clearCache();
    setMissingHostURL("");

    const urlPayload = {
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_url: inputUrlVal,
      secura_sslEnabled: sslEnabled,
    };
    setSpecStatus("In Progress");
    setShow(false);

    axios
      .post(`${secura_URL}/UploadURL`, urlPayload)
      .then(function (res) {
        console.log("simpledata", res.data);
        setspecurl(res.data.specURL);
        const { error } = res.data;
        if (error === "Host Name Missing") {
          setSpecModal(true);
        } else if (error !== null) {
          toast.error(error);
          setSpecStatus("Failed");
        } else {
          setScanDetails(res.data);
          setSpecStatus("Completed");
        }
      })
      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("uploaded file error", error);
      });
  };

  //UPLOAD AWS/Mule Connector Spec URL API CALL
  const uploadAWSSpecURL = () => {
    clearCache();
    const urlPayload = {
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_url: awsData.spec_url,
      secura_sslEnabled: true,
    };
    console.log("payload of aws spec url ", urlPayload);

    setSpecStatus("In Progress");
    setShow(false);
    axios
      .post(`${secura_URL}/UploadURL`, urlPayload)
      .then(function (res) {
        setspecurl(res.data.specURL);
        const { error } = res.data;
        console.log("resData", res.data);
        if (error === "Host Name Missing") {
          setSpecModal(true);
        } else if (error !== null) {
          toast.error("Something went wrong. Please wait!");
          setSpecStatus("Not Initiated");
        } else {
          setScanDetails(res.data);
          setSpecStatus("Completed");
        }
      })
      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("uploaded file error", error);
      });
  };

  //UPLOAD FILE API CALL
  const uploadFile = () => {
    clearCache();
    const form = new FormData();
    form.append("secura_apiFile", file);
    form.append("secura_key", "6m1fcduh0lm3h757ofun4194jn");
    form.append("secura_sslEnabled", sslEnabled);

    setSpecStatus("In Progress");
    setShow(false);

    axios
      .post(`${secura_URL}/Upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (res) {
        console.log(res.data);
        const { error, referenceId, targetHost, specURL } = res.data;
        console.log("file upload spec url ", specURL);
        setspecurl(specURL);

        if (error !== null) {
          toast.error(error);
          setSpecStatus("Failed");
        } else {
          setspecurl(specURL);
          setScanDetails(res.data);
          setSpecStatus("Completed");
        }
      })
      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("uploaded file error", error);
      });
  };

  //BEST PRACTICES HANDLER
  const handleShowBestPractices = async (e) => {
    e.preventDefault();
    setbestpracLoading(true);

    try {
      // If we have both cached best practices and spec data, use them
      if (bestPracticesCache && fetchedSpecData) {
        navigate("/home/bestpractices", {
          state: {
            bestPracticesData: bestPracticesCache,
            temporary_spec: fetchedSpecData.processedData,
            contentType: fetchedSpecData.contentType,
          },
        });
        setbestpracLoading(false);
        return;
      }

      const response = await fetch(specurl);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.text();
      const trimmedData = data.trim();
      const isJSON = trimmedData.startsWith("{") || trimmedData.startsWith("[");
      const isRAML = trimmedData.startsWith("#%RAML");

      const detectedContentType = isJSON
        ? "application/json"
        : isRAML
        ? "application/raml+yaml"
        : "text/plain";

      const processedData = isJSON
        ? JSON.stringify(JSON.parse(trimmedData), null, 2)
        : trimmedData;

      // Cache the fetched spec data
      const specData = {
        processedData,
        contentType: detectedContentType,
        timestamp: Date.now()
      };
      setFetchedSpecData(specData);
      settemporary_spec(processedData);
      setContentType(detectedContentType);

      if (specurl) {
        const payload = {
          secura_key: "6m1fcduh0lm3h757ofun4194jn",
          secura_url: inputUrlVal || awsData.spec_url || specurl,
          secura_sslEnabled: sslEnabled,
        };

        const { data: bestPractices } = await axios.post(
          `${secura_URL}/APIBestPractices`,
          payload
        );

        // Cache the best practices data
        setBestPracticesCache(bestPractices);

        navigate("/home/bestpractices", {
          state: {
            bestPracticesData: bestPractices,
            temporary_spec: processedData,
            contentType: detectedContentType,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setbestpracLoading(false);
    }
  };
  //UPLOAD MISSING HOST NAME API CALL
  const verifyMissingSpecURL = () => {
    clearCache();
    const payload = {
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_url: inputUrlVal,
      secura_sslEnabled: sslEnabled,
      secura_host: missingHostURL,
    };
    setSpecModal(false);
    setSpecStatus("In Progress");
    setShow(false);

    axios
      .post(`${secura_URL}/UploadURLWithHost`, payload)
      .then(function (res) {
        const { error } = res.data;
        console.log("resData", res.data);
        if (error !== null) {
          toast.error("Something went wrong. Try again !");
          setSpecStatus("Not Initiated");
        } else {
          setScanDetails(res.data);
          setSpecStatus("Completed");
        }
      })
      .catch(function (error) {
        toast.error(error.message);
        setLoading(false);
        console.log("uploaded file error", error);
      });
  };


  const clearCache = () => {
    sessionStorage.removeItem('specurl');
    sessionStorage.removeItem('bestPracticesCache');
    sessionStorage.removeItem('fetchedSpecData');
    setBestPracticesCache(null);
    setFetchedSpecData(null);
    settemporary_spec("");
    setContentType("");
  };

  // Clear cache when starting a new scan
  const handleNewScan = () => {
    const basePath = '/home/scans';
    clearCache();
    navigate(0)

    navigate(basePath, { 
      replace: true, // This replaces the current entry in the history stack
      state: {} // Clear any state
    });
  };

  useEffect(() => {
    return () => {
      // Optional: Clear session storage when component unmounts
      // clearCache();
    };
  }, []);


  const isCacheStale = () => {
    if (!fetchedSpecData?.timestamp) return true;
    const cacheAge = Date.now() - fetchedSpecData.timestamp;
    const maxAge = 1000 * 60 * 60; // 1 hour
    return cacheAge > maxAge;
  };

  
  //SCAN API CALL
  const scanAPI = () => {
    const scanParams = {
      secura_referenceId: scanDetails.referenceId,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_targetHost: scanDetails.targetHost,
      secura_environment: securaEnvironmentStatus ? "PRD" : "DEV",
      ...(submittedScriptRes.scanId && {
        secura_scanId: submittedScriptRes.scanId,
      }),
      ...(submittedScriptRes.userId && {
        secura_userId: submittedScriptRes.userId,
      }),
      ...(submittedScriptRes.auth && { secura_auth: submittedScriptRes.auth }),
    };

    setScanStatus("In Progress");
    axios
      .post(`${secura_URL}/ScanAPI`, scanParams)
      .then(function (res) {
        setLoading(false);
        setScanResutls(res.data);
        setScanStatus("Completed");

        if (res.data.vulnerability === null) {
          toast.error("Something went wrong ! Try again");
          setScanningStart(false);
          setScanStatus("Failed");
        }
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        setScanStatus("Failed");
        console.log("scanning error", error);
      });
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
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

      <div className="d-flex justify-content-end mb-1">
        <button
          style={{
            marginRight: "-25px",
          }}
          className="btn btn-sm btn-warning px-3"
          type="button"
          onClick={() => setOpen(!open)}
          disabled={
            specStatus === "Not Initiated" ||
            specStatus === "In Progress" ||
            scanStatus === "In Progress" ||
            scanStatus === "Completed"
          }
        >
          <strong>
            <i className="fa fa-plus fa-1x"></i>
            &nbsp; Add Authentication
          </strong>
        </button>
      </div>

      <div className="scan-parent-container">
        <div className="scan-container">
          <form>
            <div className="form-group">
              <div className="form-row">
                {Object.keys(awsData).length === 0 || awsData.error !== null ? (
                  <>
                    <div className="col">
                      <div>
                        <label>
                          Enter API spec:{" "}
                          <i className="fa fa-question-circle questionMark"></i>
                          <button
                            style={{ textDecoration: "none" }}
                            className="btn btn-link"
                            onClick={(e) => {
                              e.preventDefault();
                              setShow(!show);
                            }}
                            disabled={
                              inputUrlVal ||
                              scanStatus === "In Progress" ||
                              scanStatus === "Completed"
                            }
                          >
                            Or Upload a Spec
                          </button>
                        </label>
                      </div>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <div className="d-flex flex-column mt-2">
                        <Container>
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Production"
                              onChange={() =>
                                setSecuraEnvironmentStatus(
                                  !securaEnvironmentStatus
                                )
                              }
                              style={{ color: "grey", fontSize: "13px" }}
                            />
                          </Form>
                        </Container>
                        <Container>
                          <Form>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="SSL Enabled"
                              onChange={() => setSslEnabled(!sslEnabled)}
                              style={{ color: "grey", fontSize: "13px" }}
                            />
                          </Form>
                        </Container>
                      </div>
                    </div>
                  </>
                ) : null}

                <input
                  type="text"
                  name="name"
                  className="form-control fs-14 mt-2 mx-2"
                  value={inputUrlVal}
                  onChange={(e) => setInputUrlVal(e.target.value)}
                  placeholder={
                    file.name
                      ? file.name
                      : "Enter OpenAPI Specification URL / File"
                  }
                  disabled={
                    Object.keys(awsData).length !== 0 && awsData.spec_url
                  }
                />
                {inputUrlVal && (
                  <button
                    style={{
                      border: "none",
                      position: "relative",
                      padding: "5px 20px 5px 14px",
                      left: "93%",
                      bottom: "35px",
                    }}
                    className="btn btn-info ms-n5"
                    type="submit"
                    onClick={uploadURL}
                    disabled={
                      scanStatus === "In Progress" || scanStatus === "Completed"
                    }
                  >
                    <i className="fa fa-paper-plane fa-1x"></i>
                  </button>
                )}
              </div>
            </div>
            <br />
            {scanResults ? (
              <button
                type="submit"
                className="btn btn-md btn-info btn-block mb-2"
                onClick={handleNewScan}
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                Start a new Scan
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-md btn-info btn-block mb-2"
                onClick={handleSubmit}
                disabled={
                  specStatus !== "Completed" || scanStatus === "In Progress"
                }
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  letterSpacing: "1px",
                }}
              >
                Run a Scan
              </button>
            )}

            <br />
            <SecuraStepper
              specStatus={specStatus}
              scanStatus={scanStatus}
              authStatus={authStatus}
              scanningStart={scanningStart}
            />

            {specStatus === "Completed" && (
              <p
                className="fs-15 text-primary"
                style={{
                  marginTop: "-35px",
                  marginLeft: "-2px",
                  fontWeight: "600",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <i
                    className="fas fa-server"
                    style={{ color: "#6c757d", marginRight: "5px" }}
                  ></i>
                  <span className="text-secondary">Scanning Host:</span>&nbsp;
                  <span className="text-info">{scanDetails.targetHost}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <i
                    className="fas fa-book-open"
                    style={{ color: "#6c757d", marginRight: "5px" }}
                  ></i>
                  <span className="text-secondary">Best Practices:</span>&nbsp;
                  <a
                    href="#"
                    onClick={handleShowBestPractices}
                    style={{ cursor: "pointer" }}
                    className="text-info"
                  >
                    Show Best Practices
                  </a>
                  <div
                    style={{
                      marginLeft: "10px",
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {bestpracLoading ? (
                      <ReactLoading
                        type={"spin"}
                        color={"rgb(17 150 171)"}
                        height={30}
                        width={30}
                      />
                    ) : null}
                  </div>
                </div>
              </p>
            )}

            {scanningStart ? (
              <>
                {scanStatus === "In Progress" ? (
                  <div className="scan-details mb-4">
                    <ReactLoading
                      type={"spin"}
                      color={"rgb(17 150 171)"}
                      height={60}
                      width={60}
                    />
                  </div>
                ) : null}

                {scanStatus === "In Progress" && (
                  <p className="text-secondary text-center pb-1">
                    Got a scan in progress? If so grab a coffee and check back
                    soon to see the results. &nbsp;
                    <i className="fa-solid fa-mug-hot mt-1 text-center mb-3"></i>{" "}
                    !
                    <br />
                    <span className="fs-13 text-secondary blinker-active">
                      <i className="fa-solid fa-triangle-exclamation mt-1 text-center"></i>
                      &nbsp; Please do not leave this page while scan is in
                      progress.
                    </span>
                  </p>
                )}
                {scanStatus === "Completed" && (
                  <p className="text-secondary text-center pb-1 mt-4">
                    Hoorrraaaah !! The Scan is Completed !{" "}
                    <span style={{ fontSize: "25px" }}>🎉</span>
                  </p>
                )}

                <br />
                {scanStatus === "Completed" && (
                  <>
                    <button
                      type="button"
                      onClick={handleButtonClick}
                      className="custom-button"
                    >
                      Scan Code
                    </button>
                    {showModal && <ScanCode onClose={handleCloseModal} />}
                  </>
                )}

                <iframe
                  src={`http://192.168.18.20:8081/Portal/Progress?reference_id=${scanDetails.referenceId}`}
                  title="scan progress"
                  width="100%"
                  style={{ backgroundColor: "black", borderRadius: "10px" }}
                  height="80px"
                  className="mb-5"
                ></iframe>

                {scanResults !== null ? (
                  <ScanSummary
                    scanResults={scanResults}
                    toggleCollapseTable={toggleCollapseTable}
                    openRows={openRows}
                  />
                ) : (
                  <SkeletonLoader />
                )}
              </>
            ) : null}
          </form>
        </div>

        <AddAuthModal open={open} setOpen={setOpen} />

        <SpecUploadModal
          show={show}
          setShow={setShow}
          file={file}
          handleUpload={handleUpload}
          uploadFile={uploadFile}
        />

        {/* Modal for missing connector spec */}
        <Modal
          show={openSpecModal}
          onHide={() => {
            setSpecModal(false);
          }}
          style={{ paddingBottom: "0px" }}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Header
            style={{
              borderBottom: "0px",
              padding: "5px 5px 0px 5px",
            }}
          >
            <label className="fs-13 mt-3 ml-3" htmlFor="missingSpecUrl">
              <strong className="text-danger">Server URL missing in spec</strong>
            </label>
          </Modal.Header>

          <Modal.Body>
            <div className="d-flex mb-3">
              <input
                type="text"
                id="missingSpecUrl"
                name="missingSpecUrl"
                className="form-control fs-13"
                onChange={(e) => setMissingHostURL(e.target.value)}
                placeholder="Enter server URL"
              />
              <button
                className="btn btn-primary btn-sm ml-2"
                onClick={verifyMissingSpecURL}
                disabled={missingHostURL === ""}
              >
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  Verify
                </strong>
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Scans;
