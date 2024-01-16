import React from "react";
import { Container, Table, Collapse, Modal, Form } from "react-bootstrap";

const ScanSummary = ({ scanResults, toggleCollapseTable, openRows }) => {
  //Get Badge based on Risk
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

  //Nested tables
  const renderNestedTable = (subDetails, rowId) => (
    <Collapse in={openRows.includes(rowId)}>
      <div>
        <Table className="m-0" style={{ tableLayout: "fixed" }}>
          <tbody>
            {Object.entries(subDetails).map(([key, value]) => (
              <React.Fragment key={key}>
                <tr>
                  <td style={{ wordWrap: "break-word", width: "100%" }}>
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
                        <Table bordered style={{ tableLayout: "fixed" }}>
                          <tbody className="fs-13">
                            {Object.entries(value).map(([key, value]) => (
                              <tr key={key}>
                                <td colSpan="2"> {key}</td>
                                <td
                                  style={{
                                    wordWrap: "break-word",
                                  }}
                                  colSpan="6"
                                >
                                  {value}
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
            ))}
          </tbody>
        </Table>
      </div>
    </Collapse>
  );

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

      <Container className="mt-5">
        <Table style={{ tableLayout: "fixed" }}>
          <thead style={{ background: "#f5f5f5" }}>
            <tr>
              <th scope="col">Severity</th>
              <th scope="col" style={{ width: "500px" }}>
                Description
              </th>
              <th scope="col" style={{ width: "100px" }}>
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scanResults.vulnerability).map(
              ([severity, details]) => (
                <React.Fragment key={severity}>
                  {Object.entries(details).map(([description, subDetails]) => (
                    <React.Fragment key={description}>
                      <tr
                        className="clickable"
                        onClick={() =>
                          toggleCollapseTable(`${severity}-${description}`)
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
                        <td>
                          <strong>
                            <i
                              className={
                                openRows.length > 0
                                  ? "fa-solid fa-angle-down  mr-3"
                                  : "fa-solid fa-angle-right  mr-3"
                              }
                            ></i>
                          </strong>
                          {description}
                        </td>
                        <td>{Object.keys(subDetails).length}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" style={{ padding: "0px" }}>
                          {renderNestedTable(
                            subDetails,
                            `${severity}-${description}`
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ScanSummary;
