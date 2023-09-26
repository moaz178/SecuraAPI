import React, { useState } from "react";
import { Modal } from "react-bootstrap";
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
  const [scanResults, setScanResutls] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = () => {
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
          scanAPI(referenceId, targetHost);
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
        toast.error(error.message);
        setLoading(false);
        console.log("scanning error", error);
      });
  };
  console.log("vulnerabilities", scanResults);

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
                  />
                </div>

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

            {scanningStart ? (
              <>
                {/* <p>
                Got a scan in progress? Grab a coffee and check back soon to see
                the results.{" "}
              </p> */}
                {/* <div className="scan-details">
                  <ReactLoading
                    type={"bars"}
                    color={"rgb(17 150 171)"}
                    height={60}
                    width={60}
                  />
                </div> */}
                <div>
                  <div class="ocrloader">
                    <img
                      src="../../../../dist/2.png"
                      alt="scan img"
                      className="scan-icon"
                    />
                    <p>Scanning</p>
                    <em></em>
                    <span></span>
                  </div>
                </div>
                <br />
                <br />
                <p className="text-secondary text-center pb-1">
                  Please wait, this may take up less than a minute !
                  {/* <i className="fa-solid fa-mug-hot mt-1 text-center"></i> ! */}
                </p>
                <div class="d-flex flex-row mt-4" id="progressIcons">
                  <div class="text-center">
                    <i class="fa-solid fa-shield-halved fs-50 hr-line-text-active"></i>
                    <div class="progressText mt-2" id="analyse">
                      Analyzing API Specification
                    </div>
                  </div>
                  <div class="hr-line hr-line-active"></div>
                  <div>
                    <i class="fa-solid fa-gear text-secondary fs-50"></i>
                    <div class="progressText1 pt-2" id="generate">
                      Generating Tests Scenarios
                    </div>
                  </div>
                  <div class="hr-line"></div>
                  <div>
                    <i class="fa-solid fa-bullseye text-secondary fs-50"></i>
                    <div class="progressText2 pt-2 " id="running">
                      Running Security Tests
                    </div>
                  </div>
                  <div class="hr-line"></div>
                  <div>
                    <i class="fa-solid fa-chart-column text-secondary fs-50"></i>
                    <div class="progressText3 pt-2 " id="preparing">
                      Preparing Results Report
                    </div>
                  </div>
                </div>
                <br />
                {scanResults !== null ? (
                  <>
                    <div
                      className="alert alert-danger fs-13 scan-vulnerabilities"
                      role="alert"
                    >
                      <strong className="fs-14">
                        <i class="fa-solid fa-triangle-exclamation mr-2"></i>
                        SSL Certificate Issue
                      </strong>
                      <br />
                      <strong>Risk : High</strong>
                      <br />
                      <strong>Description</strong> : High Security Risk ,
                      SHA-256 or higher hash algorithm SSL Certificate Required
                      <br />
                      <strong>Solution</strong>: Install Certificate with the
                      SHA-256 or higher hash algorithm. Modern browsers do not
                      trust certificates that use SHA-1(Hackable).
                    </div>
                    <div
                      className="alert alert-info fs-13 scan-vulnerabilities"
                      role="alert"
                    >
                      <strong className="fs-14">
                        <i class="fa-solid fa-triangle-exclamation mr-2"></i>
                        Authentication Request Identified(POST) :
                      </strong>
                      <br />
                      <strong>Risk : Informational</strong>
                      <br />
                      <strong>Description</strong> : The given request has been
                      identified as an authentication request. The 'Other Info'
                      field contains a set of key=value lines which identify any
                      relevant fields. If the request is in a context which has
                      an Authentication Method set to "Auto-Detect" then this
                      rule will change the authentication to match the request
                      identified.
                      <br />
                      <strong>Solution</strong>: This is an informational alert
                      rather than a vulnerability and so there is nothing to
                      fix.
                    </div>
                    <div
                      className="alert alert-warning fs-13 scan-vulnerabilities"
                      role="alert"
                    >
                      <strong className="fs-14">
                        <i class="fa-solid fa-triangle-exclamation mr-2"></i>
                        Content Security Policy (CSP) Header Not Set(POST) :
                      </strong>
                      <br />
                      <strong>Risk : Medium</strong>
                      <br />
                      <strong>Description</strong> : Content Security Policy
                      (CSP) is an added layer of security that helps to detect
                      and mitigate certain types of attacks, including Cross
                      Site Scripting (XSS) and data injection attacks. These
                      attacks are used for everything from data theft to site
                      defacement or distribution of malware. CSP provides a set
                      of standard HTTP headers that allow website owners to
                      declare approved sources of content that browsers should
                      be allowed to load on that page — covered types are
                      JavaScript, CSS, HTML frames, fonts, images and embeddable
                      objects such as Java applets, ActiveX, audio and video
                      files.
                      <br />
                      <strong>Solution</strong>: Ensure that your web server,
                      application server, load balancer, etc. is configured to
                      set the Content-Security-Policy header.
                    </div>
                    <div
                      className="alert alert-success fs-13 scan-vulnerabilities"
                      role="alert"
                    >
                      <strong className="fs-14">
                        <i class="fa-solid fa-triangle-exclamation mr-2"></i>
                        X-Content-Type-Options Header Missing(GET) :{" "}
                      </strong>
                      <br />
                      <strong>Risk : Low</strong>
                      <br />
                      <strong>Description</strong> : The Anti-MIME-Sniffing
                      header X-Content-Type-Options was not set to 'nosniff'.
                      This allows older versions of Internet Explorer and Chrome
                      to perform MIME-sniffing on the response body, potentially
                      causing the response body to be interpreted and displayed
                      as a content type other than the declared content type.
                      Current (early 2014) and legacy versions of Firefox will
                      use the declared content type (if one is set), rather than
                      performing MIME-sniffing.
                      <br />
                      <strong>Solution</strong>: Ensure that the application/web
                      server sets the Content-Type header appropriately, and
                      that it sets the X-Content-Type-Options header to
                      'nosniff' for all web pages. If possible, ensure that the
                      end user uses a standards-compliant and modern web browser
                      that does not perform MIME-sniffing at all, or that can be
                      directed by the web application/web server to not perform
                      MIME-sniffing.
                    </div>
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
