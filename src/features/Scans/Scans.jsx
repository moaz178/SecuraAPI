import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";
import ReactLoading from "react-loading";
import Loader from "../../components/Loader/Loader";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";
import SecuraStepper from "../../components/SecuraStepper/SecuraStepper";
import SpecUploadModal from "../../components/Modal/SpecUploadModal";
import ScanSummary from "../ScanSummary/ScanSummary";
import "./Scans.css";

const Scans = () => {
  const [show, setShow] = useState(false);
  const [sslEnabled, setSslEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openRows, setOpenRows] = useState([]);
  // const [inputUrlVal, setInputUrlVal] = useState("");
  // const [file, setFile] = useState("");
  // const [scanningStart, setScanningStart] = useState(false);
  // const [refrenceID, setRefrenceID] = useState("");
  // const [targettedHost, setTargettedHost] = useState("");
  // const [scanResults, setScanResutls] = useState(null);
  // const [specStatus, setSpecStatus] = useState("Not Initiated");
  // const [scanStatus, setScanStatus] = useState("Not Initiated");

  //Scan context
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
  } = useScanContext();

  const toggleCollapseTable = (rowId) => {
    setOpenRows((prevOpenRows) =>
      prevOpenRows.includes(rowId)
        ? prevOpenRows.filter((id) => id !== rowId)
        : [...prevOpenRows, rowId]
    );
  };

  //UPLOAD FILE
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

    const urlPayload = {
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_url: inputUrlVal,
      secura_sslEnabled: sslEnabled,
    };

    setSpecStatus("In Progress");
    setShow(false);
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/UploadURL`, urlPayload)
      .then(function (res) {
        // setLoading(false);

        const { error } = res.data;
        if (error !== null) {
          toast.error(error);
          // setFile("");
          setSpecStatus("Failed");
        } else {
          // setRefrenceID(referenceId);
          // setTargettedHost(targetHost);
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
    const form = new FormData();
    form.append("secura_apiFile", file);
    form.append("secura_key", "6m1fcduh0lm3h757ofun4194jn");
    form.append("secura_sslEnabled", sslEnabled);
    setSpecStatus("In Progress");
    setShow(false);
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/Upload`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(function (res) {
        // setLoading(false);

        const { error, referenceId, targetHost } = res.data;
        if (error !== null) {
          toast.error(error);
          // setFile("");
          setSpecStatus("Failed");
        } else {
          // setRefrenceID(referenceId);
          // setTargettedHost(targetHost);
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

  //SCAN API CALL
  const scanAPI = () => {
    const scanParams = {
      secura_referenceId: scanDetails.referenceId,
      secura_key: "6m1fcduh0lm3h757ofun4194jn",
      secura_targetHost: scanDetails.targetHost,
      ...(submittedScriptRes.scanId && {
        secura_scanId: submittedScriptRes.scanId,
      }),
      ...(submittedScriptRes.userId && {
        secura_userId: submittedScriptRes.userId,
      }),
      ...(submittedScriptRes.auth && { secura_auth: submittedScriptRes.auth }),
    };

    // console.log("scanparms", scanParams);
    setScanStatus("In Progress");
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/ScanAPI`, scanParams)
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
                        disabled={inputUrlVal || scanStatus === "In Progress"}
                      >
                        Or Upload a Spec
                      </button>
                    </label>
                  </div>
                </div>
                <div class="col d-flex justify-content-end">
                  <div className="d-flex mt-2">
                    <Container>
                      <Form>
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="SSL Enabled"
                          // checked={isChecked}
                          onChange={() => setSslEnabled(!sslEnabled)}
                          style={{ color: "grey", fontSize: "13px" }}
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
                  value={inputUrlVal}
                  onChange={(e) => setInputUrlVal(e.target.value)}
                  placeholder={
                    file.name
                      ? file.name
                      : "Enter OpenAPI Specification URL / File"
                  }
                />
                {inputUrlVal && (
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      position: "relative",
                      left: "94%",
                      bottom: "35px",
                      color: "rgb(191 191 191)",
                    }}
                    className="btn btn-outline-secondary ms-n5"
                    type="submit"
                    onClick={uploadURL}
                    disabled={scanStatus === "In Progress"}
                  >
                    <i className="fa fa-paper-plane fa-1x"></i>
                  </button>
                )}
              </div>
            </div>
            <br />
            <button
              type="submit"
              class="btn btn-lg btn-info btn-block mb-2"
              onClick={handleSubmit}
              disabled={
                specStatus !== "Completed" || scanStatus === "In Progress"
              }
            >
              Run a Scan
            </button>

            <br />
            <SecuraStepper
              specStatus={specStatus}
              scanStatus={scanStatus}
              authStatus={authStatus}
              scanningStart={scanningStart}
            />

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
                    <span className="fs-14 text-info blinker-active">
                      {" "}
                      <i className="fa-solid fa-triangle-exclamation mt-1 text-center"></i>
                      &nbsp; Please do not leave this page while scan is in
                      progress.
                    </span>
                  </p>
                )}
                {scanStatus === "Completed" && (
                  <p className="text-secondary text-center pb-1">
                    Hoorrraaaah !! The Scan is Completed !{" "}
                    <span style={{ fontSize: "25px" }}>🎉</span>
                  </p>
                )}

                <br />

                <iframe
                  src={`http://192.168.18.20:8081/Portal/Progress?reference_id=${scanDetails.referenceId}`}
                  title="scan progress"
                  width="100%"
                  height="64px"
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

        <SpecUploadModal
          show={show}
          setShow={setShow}
          file={file}
          handleUpload={handleUpload}
          uploadFile={uploadFile}
        />
      </div>
    </>
  );
};

export default Scans;
