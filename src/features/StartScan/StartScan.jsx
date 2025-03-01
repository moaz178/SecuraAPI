import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import { Card, Container, Button, Collapse } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faShieldAlt,
  faExclamationTriangle,
  faBug,
  faCogs,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import "./StartScan.css";
import PropagateLoader from "react-spinners/PropagateLoader";

const StartScan = () => {
  const { scanDetails } = useScanContext();

  // Initialize referenceId from context or sessionStorage.
  const [referenceId, setReferenceId] = useState(() => {
    return scanDetails.referenceId || sessionStorage.getItem("scanReferenceId") || "";
  });

  // Persist referenceId in sessionStorage whenever it changes.
  useEffect(() => {
    if (referenceId) {
      sessionStorage.setItem("scanReferenceId", referenceId);
    }
  }, [referenceId]);

  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [selectedVulnIndex, setSelectedVulnIndex] = useState(0);
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [openIndexes, setOpenIndexes] = useState({});
  const [loading, setLoading] = useState(true);
  const [codeSnippetLoading, setCodeSnippetLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { dbname, selectedLanguage, securaSourcePath } = location.state || {};

  // Fetch vulnerabilities from the scan API.
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching scan data...");
        const scanResponse = await fetch(
          "http://192.168.18.20:8082/SecuraCore/codeScan",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              secura_referenceId: referenceId,
              secura_qldatabasePath: dbname,
              secura_sourceExtractedPath: securaSourcePath,
              secura_key: "6m1fcduh0lm3h757ofun4194jn",
            }),
          }
        );

        const scanData = await scanResponse.json();
        console.log("Scan data received:", scanData);

        if (scanData.vulnerabilities && scanData.vulnerabilities.length > 0) {
          setVulnerabilities(scanData.vulnerabilities);
          // First vulnerability is selected by default.
          setSelectedVulnIndex(0);
        } else {
          throw new Error("No vulnerabilities found in scan data.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dbname, securaSourcePath, referenceId]);

  useEffect(() => {
    const fetchAllSnippets = async () => {
      try {
        setCodeSnippetLoading(true);
        const snippets = await Promise.all(
          vulnerabilities.map((vuln) =>
            fetch(`http://192.168.18.20:8082/SecuraCore/fetch?path=${vuln.codePath}`)
              .then((response) => response.text())
          )
        );
        setCodeSnippets(snippets);
        setCodeSnippetLoading(false);
      } catch (err) {
        console.error("Error fetching code snippets:", err);
        setError(err);
        setCodeSnippetLoading(false);
      }
    };

    if (vulnerabilities.length > 0) {
      fetchAllSnippets();
    }
  }, [vulnerabilities]);

  // The "Review" button now only sets the selected vulnerability.
  const handleReviewClick = (index, event) => {
    event.stopPropagation(); // Prevent parent click events
    setSelectedVulnIndex(index);
  };

  const toggleCollapse = (index) => {
    setOpenIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (loading) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      {/* Centered container with a max width */}
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2>Please wait. It may take a few seconds ...</h2>
        <div style={{ margin: "20px 0" }}>
          <PropagateLoader color="#459cce" />
        </div>
        {referenceId && (
          <div
            className="mt-5"
            style={{
              backgroundColor: "black",
              width: "100%",
              height: "80px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <iframe
              src={`http://192.168.18.20:8081/Portal/CodeProgress?reference_id=${referenceId}`}
              title="scan progress"
              width="100%"
              height="80px"
              style={{ border: "none" }}
              className="mb-5"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

  

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
        <h2>Error occurred: {error.message}</h2>
      </div>
    );
  }

  const iconMap = {
    Authentication: { icon: faShieldAlt, color: "text-gray" },
    "Cross-Site Scripting (XSS)": { icon: faExclamationTriangle, color: "text-gray" },
    "Code Injection (RCE)": { icon: faBug, color: "text-gray" },
    "Weak Cryptography": { icon: faCogs, color: "text-gray" },
    "Insecure Configuration": { icon: faLock, color: "text-gray" },
  };
  const selectedVuln = vulnerabilities[selectedVulnIndex];
  const displayedSnippet = codeSnippets[selectedVulnIndex] || "";

  return (
    <div className="d-flex">
      {/* Sidebar with Vulnerabilities */}
      <div
        style={{
          width: "300px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
        }}
      >
        <h5 className="mb-3">Security hotspots to Review</h5>
        {vulnerabilities.map((vuln, index) => {
          const iconDetails = iconMap[vuln.category] || { icon: faBug, color: "text-gray" };
          return (
            <div key={vuln.id} className="mb-3">
              <div
                className={`d-flex align-items-center border-start ps-2 mb-1 ${
                  selectedVulnIndex === index ? "bg-light" : ""
                }`}
                onClick={() => toggleCollapse(index)}
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon icon={iconDetails.icon} className={`me-2 ${iconDetails.color}`} />
                <div className="flex-grow-1">
                  <h6 className="mb-0">{vuln.name}</h6>
                </div>
                <FontAwesomeIcon
                  icon={openIndexes[index] ? faCaretUp : faCaretDown}
                  className="ms-2"
                />
              </div>
              <Collapse in={openIndexes[index]}>
                <div className="mt-2 ps-3">
                  <small className="text-muted d-block">
                    {vuln.description}
                  </small>
                  <Button
                    variant="light"
                    size="sm"
                    className="text-primary fw-bold"
                    onClick={(event) => handleReviewClick(index, event)}
                  >
                    Review
                  </Button>
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <Container className="p-4">
        <h4 className="mb-3 text-dark">{selectedVuln.name}</h4>
        <Card className="shadow-sm border-0">
          <Card.Body>
            <div className="d-flex justify-content-between mb-4">
              <div>
                <p className="mb-1">
                  <strong>Assignee:</strong>{" "}
                  <span className="info">Not Assigned</span>
                </p>
                <p className="mb-1">
                  <strong>Severity:</strong>{" "}
                  <span className="info">{selectedVuln.severity || "Medium "}</span>
                </p>
                <p className="mb-1">
                  <strong>File Path:</strong>{" "}
                  <span className="text-primary">{selectedVuln.codePath}</span>
                </p>
              </div>
              <div>
                <Button
                  variant="light"
                  size="sm"
                  className="text-primary fw-bold"
                >
                  Status: To review
                </Button>
              </div>
            </div>

            {/* Code Snippet with Dynamic Highlighting */}
            <div
              className="bg-light p-3 rounded border small"
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                whiteSpace: "pre-wrap",
              }}
            >
              {codeSnippetLoading ? (
                <div style={{ textAlign: "center" }}>
                  <PropagateLoader color="#459cce" />
                </div>
              ) : (
                displayedSnippet.split("\n").map((line, index) => {
                  const lineNumber = index + 1;
                  let renderedLine;
                  if (selectedVuln) {
                    const {
                      codeStartLine,
                      codeStartColumn,
                      codeEndLine,
                      codeEndColumn,
                    } = selectedVuln;
                    // Multi-line vulnerability highlighting
                    if (codeEndLine && codeEndLine > codeStartLine) {
                      if (lineNumber < codeStartLine || lineNumber > codeEndLine) {
                        renderedLine = <span>{line}</span>;
                      } else if (lineNumber === codeStartLine) {
                        const before = line.substring(0, codeStartColumn - 1);
                        const highlight = line.substring(codeStartColumn - 1);
                        renderedLine = (
                          <span>
                            {before}
                            <span
                              style={{
                                textDecorationLine: "underline",
                                textDecorationStyle: "wavy",
                                textDecorationColor: "red",
                              }}
                            >
                              {highlight}
                            </span>
                          </span>
                        );
                      } else if (
                        lineNumber > codeStartLine &&
                        lineNumber < codeEndLine
                      ) {
                        renderedLine = (
                          <span
                            style={{
                              textDecorationLine: "underline",
                              textDecorationStyle: "wavy",
                              textDecorationColor: "red",
                            }}
                          >
                            {line}
                          </span>
                        );
                      } else if (lineNumber === codeEndLine) {
                        const highlight = line.substring(0, codeEndColumn);
                        const after = line.substring(codeEndColumn);
                        renderedLine = (
                          <span>
                            <span
                              style={{
                                textDecorationLine: "underline",
                                textDecorationStyle: "wavy",
                                textDecorationColor: "red",
                              }}
                            >
                              {highlight}
                            </span>
                            {after}
                          </span>
                        );
                      }
                    } else {
                      // Single-line vulnerability highlighting
                      if (lineNumber === codeStartLine) {
                        const effectiveEndColumn =
                          codeEndColumn && codeEndColumn > 0
                            ? codeEndColumn
                            : line.length;
                        const before = line.substring(0, codeStartColumn - 1);
                        const highlight = line.substring(
                          codeStartColumn - 1,
                          effectiveEndColumn
                        );
                        const after = line.substring(effectiveEndColumn);
                        renderedLine = (
                          <span>
                            {before}
                            <span
                              style={{
                                textDecorationLine: "underline",
                                textDecorationStyle: "wavy",
                                textDecorationColor: "red",
                              }}
                            >
                              {highlight}
                            </span>
                            {after}
                          </span>
                        );
                      } else {
                        renderedLine = <span>{line}</span>;
                      }
                    }
                  } else {
                    renderedLine = <span>{line}</span>;
                  }
                  return (
                    <div key={index} style={{ display: "flex" }}>
                      <span
                        style={{
                          width: "30px",
                          color: "#888",
                          textAlign: "right",
                          marginRight: "10px",
                          userSelect: "none",
                        }}
                      >
                        {lineNumber}
                      </span>
                      {renderedLine}
                    </div>
                  );
                })
              )}
            </div>

            {/* Tabs for More Details */}
            <div className="mt-4">
              <ul className="nav nav-tabs" id="riskTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="whats-risk-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#whats-risk"
                    type="button"
                    role="tab"
                    aria-controls="whats-risk"
                    aria-selected="true"
                  >
                    What's the risk?
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="are-you-risk-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#are-you-risk"
                    type="button"
                    role="tab"
                    aria-controls="are-you-risk"
                    aria-selected="false"
                  >
                    Are you at risk?
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="fix-it-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#fix-it"
                    type="button"
                    role="tab"
                    aria-controls="fix-it"
                    aria-selected="false"
                  >
                    How can you fix it?
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3" id="riskTabContent">
                <div
                  className="tab-pane fade show active"
                  id="whats-risk"
                  role="tabpanel"
                  aria-labelledby="whats-risk-tab"
                >
                  <p className="text-muted small">
                    {selectedVuln.description}
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="are-you-risk"
                  role="tabpanel"
                  aria-labelledby="are-you-risk-tab"
                >
                  <p className="text-muted small">
                    Applications that do not properly validate user-provided values may be vulnerable.
                  </p>
                </div>
                <div
                  className="tab-pane fade"
                  id="fix-it"
                  role="tabpanel"
                  aria-labelledby="fix-it-tab"
                >
                  <p className="text-muted small">
                    Ensure that all user inputs are properly validated and sanitized. For example:
                  </p>
                  <pre className="bg-light p-2 mt-2 rounded border small">
                    {`<input
  type="text"
  value={userInput}
  onChange={handleChange}
/>`}
                  </pre>
                </div>
              </div>
            </div>
            {/* Removed the Iframe from Main Content */}
            <div className="mt-3" style={{ width: "100%" }}>
            <iframe
              src={`http://192.168.18.20:8081/Portal/CodeProgress?reference_id=${referenceId}`}
              title="scan progress"
              width="100%"
              height="80px"
              style={{ backgroundColor: "black", borderRadius: "10px" }}
              className="mb-5"
            ></iframe>
          </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default StartScan;
