import React, { useState } from "react";
import {
  Container,
  Table,
  Collapse,
  Badge,
  Modal,
  Form,
} from "react-bootstrap";

const ScanSummary = ({ scanResults }) => {
  console.log("scanResults: ", scanResults);
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedNestedRows, setExpandedNestedRows] = useState([]);

  const toggleCollapseTable = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((item) => item !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const toggleCollapseNestedTable = (index) => {
    if (expandedNestedRows.includes(index)) {
      setExpandedNestedRows(
        expandedNestedRows.filter((item) => item !== index)
      );
    } else {
      setExpandedNestedRows([...expandedNestedRows, index]);
    }
  };

  return (
    <>
      <strong className="fs-20">Summary:</strong>
      <br />
      <br />
      <div className="d-flex justify-content-between">
        <div>
          <strong className="fs-15 text-primary">Scan Information</strong>
          <div className="d-flex">
            <div>
              <p className="fs-14 text-secondary mt-2">Scan Started :</p>
              <p className="fs-14 text-secondary">Scan Ended :</p>
              <p className="fs-14 text-secondary">Scan Duration :</p>
              <p className="fs-14 text-secondary">Scan Status :</p>
            </div>
            <div className="ml-4">
              <p className="fs-14 text-secondary mt-2">
                <strong className="fs-14 text-secondary">
                  {scanResults.status ? scanResults.status.startTime : "N/A"}
                </strong>
              </p>
              <p className="fs-14 text-secondary">
                <strong className="fs-14 text-secondary">
                  {scanResults.status ? scanResults.status.endTime : "N/A"}
                </strong>
              </p>
              <p className="fs-14 text-secondary">
                <strong className="fs-14 text-secondary">
                  {scanResults.status ? scanResults.status.Duration : "N/A"}
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
              <p className="fs-14 text-secondary mt-3">Medium :</p>
              <p className="fs-14 text-secondary mt-3">Low:</p>
              <p className="fs-14 text-secondary mt-3">Informational :</p>
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
                  {scanResults.summary.High ? scanResults.summary.High : 0}
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
                  {scanResults.summary.Medium ? scanResults.summary.Medium : 0}
                </strong>
              </div>
              <div
                className="py-1 bg-primary text-light mt-1 "
                style={{
                  width: `${
                    scanResults.summary.Low ? scanResults.summary.Low + 40 : 40
                  }px`,
                }}
              >
                <strong className="fs-15 pl-3">
                  {scanResults.summary.Low ? scanResults.summary.Low : 0}
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
              {scanResults.summary.High ? scanResults.summary.High : 0}
            </strong>
          </div>
          <div className="py-1 bg-danger text-light mt-1 text-center width-75">
            <strong className="fs-15 ">High</strong>
          </div>
        </div>
        <div style={{ width: "160px" }}>
          <div className="py-3 bg-warning text-light text-center width-75">
            <strong className="fs-50">
              {scanResults.summary.Medium ? scanResults.summary.Medium : 0}
            </strong>
          </div>
          <div className="px-1 py-1 bg-warning text-light mt-1 text-center width-75">
            <strong className="fs-15 ">Medium</strong>
          </div>
        </div>
        <div style={{ width: "160px" }}>
          <div className="py-3 bg-primary text-light text-center width-75">
            <strong className="fs-50">
              {scanResults.summary.Low ? scanResults.summary.Low : 0}
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
              Any <strong className="text-danger">High</strong> and{" "}
              <strong className="text-warning">Medium</strong> risk
              vulnerabilities should be investigated and confirmed so that
              remedation can take place.
              <strong className="text-primary"> Low</strong> risk items should
              not be ignored as they can be chained with other vulnerabilities
              to enable further attacks.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <strong className="fs-20 text-primary"> Vulnerabilities Summary:</strong>

      <Container className="mt-5 p-0">
        <Table>
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th>Severity</th>
              <th>Description</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(scanResults.vulnerability).map(
              (vulnerability, index) => {
                const severity = vulnerability.split("-***-")[1].toLowerCase();
                let badgeVariant;
                switch (severity) {
                  case "high":
                    badgeVariant = "danger";
                    break;
                  case "medium":
                    badgeVariant = "warning";
                    break;
                  case "informational":
                    badgeVariant = "success";
                    break;
                  case "low":
                    badgeVariant = "primary";
                    break;
                  default:
                    badgeVariant = "info";
                }
                const vulnerabilityDetails =
                  scanResults.vulnerability[vulnerability];

                return (
                  <React.Fragment key={index}>
                    <tr
                      onClick={() => toggleCollapseTable(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <Badge bg={badgeVariant}>{severity}</Badge>
                      </td>
                      <td>
                        <p style={{ fontSize: "15px" }}>
                          {expandedRows.includes(index) ? (
                            <i className="fa-solid fa-angle-down mr-3 "></i>
                          ) : (
                            <i className="fa-solid fa-angle-right mr-3 "></i>
                          )}
                          {vulnerability.split("***-")[2]}
                        </p>
                      </td>
                      <td>
                        <p style={{ paddingLeft: "20px" }}>
                          {vulnerabilityDetails.APIs
                            ? vulnerabilityDetails.APIs.length
                            : null}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="3"
                        style={{
                          padding: "0px",
                          borderBottom: "none",
                        }}
                      >
                        <Collapse in={expandedRows.includes(index)}>
                          <div className="fs-13">
                            {vulnerabilityDetails.Description && (
                              <>
                                <td>
                                  <strong>Description</strong>
                                </td>
                                <td
                                  style={{
                                    paddingRight: "200px",
                                    paddingLeft: "90px",
                                  }}
                                >
                                  {vulnerabilityDetails.Description}
                                </td>
                              </>
                            )}

                            <Table
                              style={{ fontSize: "12px", marginBottom: "0px" }}
                            >
                              <thead>
                                <tr
                                  onClick={() =>
                                    toggleCollapseNestedTable(
                                      vulnerabilityDetails.Id
                                    )
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <th
                                    colSpan="2"
                                    className="text-start"
                                    style={{ borderBottom: "none" }}
                                  >
                                    {" "}
                                    {expandedNestedRows.includes(
                                      vulnerabilityDetails.Id
                                    ) ? (
                                      <i className="fa-solid fa-minus mr-2"></i>
                                    ) : (
                                      <i className="fa-solid fa-plus mr-2"></i>
                                    )}
                                    APIs
                                  </th>
                                </tr>
                              </thead>
                              <Collapse
                                in={expandedNestedRows.includes(
                                  vulnerabilityDetails.Id
                                )}
                              >
                                <tbody style={{ border: "1px solid #dee2e6" }}>
                                  {vulnerabilityDetails.APIs &&
                                    vulnerabilityDetails.APIs.map(
                                      (api, apiIndex) => (
                                        <React.Fragment key={apiIndex}>
                                          {Object.entries(api).map(
                                            ([key, value]) => (
                                              <tr key={key}>
                                                <td>{key}</td>
                                                <td>{value}</td>
                                              </tr>
                                            )
                                          )}
                                          <br />
                                        </React.Fragment>
                                      )
                                    )}
                                </tbody>
                              </Collapse>
                            </Table>
                            <Table style={{ fontSize: "13px" }}>
                              <tbody>
                                {Object.entries(vulnerabilityDetails)
                                  .filter(
                                    ([key, value]) =>
                                      key !== "APIs" &&
                                      key !== "Description" &&
                                      key !== "Id"
                                  )
                                  .map(([key, value]) => (
                                    <tr key={key}>
                                      <td style={{ width: "100px" }}>
                                        <strong>{key}</strong>
                                      </td>
                                      <td
                                        style={{
                                          paddingRight: "200px",
                                          paddingLeft: "90px",
                                        }}
                                      >
                                        {value ? value : "N/A"}
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </Table>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              }
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ScanSummary;
