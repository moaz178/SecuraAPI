import React from "react";
import html2pdf from "html2pdf.js";
import { Table } from "react-bootstrap";
import ReactDOMServer from "react-dom/server";
import { useScanContext } from "../../../contexts/scanContext/scanContext";
import "../Report.css";

const ReportPdf = ({ data, pdfMode, onChange }) => {
  //Scan context
  const { selectedReport } = useScanContext();
  console.log("selectedReport: ", selectedReport);

  // Check for selectedReport exists before accessing its properties
  if (!selectedReport) {
    return (
      <div className="text-secondary fs-15">
        Something went wrong !{" "}
        <button
          className="btn btn-sm btn-info ml-3"
          onClick={() => window.history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i> Go back
        </button>
      </div>
    );
  }

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

  const pdfJSX = () => {
    return (
      <>
        <div
          style={{ margin: "10px 25px", paddingTop: "20px" }}
          id="report-pdf"
        >
          <strong className="fs-20">Scan Summary:</strong>
          <br />
          <br />
          <div className="d-flex justify-content-between">
            <div>
              <strong className="fs-14 text-primary">Scan Information</strong>
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
                      {selectedReport.status
                        ? selectedReport.status.startTime
                        : "N/A"}
                    </strong>
                  </p>
                  <p className="fs-14 text-secondary">
                    <strong className="fs-14 text-secondary">
                      {selectedReport.status
                        ? selectedReport.status.endTime
                        : "N/A"}
                    </strong>
                  </p>
                  <p className="fs-14 text-secondary">
                    <strong className="fs-14 text-secondary">
                      {selectedReport.status
                        ? selectedReport.status.Duration
                        : "N/A"}
                    </strong>
                  </p>
                  <p className="fs-14 text-secondary">
                    <span className="badge badge-success">Finished</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <strong className="fs-14 text-primary">Findings</strong>

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
                        selectedReport.summary.High
                          ? selectedReport.summary.High + 40
                          : 40
                      }px`,
                    }}
                  >
                    <strong className="fs-15 pl-3">
                      {selectedReport.summary.High
                        ? selectedReport.summary.High
                        : 0}
                    </strong>
                  </div>
                  <div
                    className="py-1 bg-warning text-light mt-1 "
                    style={{
                      width: `${
                        selectedReport.summary.Medium
                          ? selectedReport.summary.Medium + 40
                          : 40
                      }px`,
                    }}
                  >
                    <strong className="fs-15 pl-3">
                      {selectedReport.summary.Medium
                        ? selectedReport.summary.Medium
                        : 0}
                    </strong>
                  </div>
                  <div
                    className="py-1 bg-primary text-light mt-1 "
                    style={{
                      width: `${
                        selectedReport.summary.Low
                          ? selectedReport.summary.Low + 40
                          : 40
                      }px`,
                    }}
                  >
                    <strong className="fs-15 pl-3">
                      {selectedReport.summary.Low
                        ? selectedReport.summary.Low
                        : 0}
                    </strong>
                  </div>
                  <div
                    className="py-1 text-light mt-1"
                    style={{
                      width: `${
                        selectedReport.summary.Informational
                          ? selectedReport.summary.Informational + 40
                          : 40
                      }px`,
                      background: "rgb(128 199 145)",
                    }}
                  >
                    <strong className="fs-15 pl-3">
                      {selectedReport.summary.Informational
                        ? selectedReport.summary.Informational
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
                  {selectedReport.summary.High
                    ? selectedReport.summary.High
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
                  {selectedReport.summary.Medium
                    ? selectedReport.summary.Medium
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
                  {selectedReport.summary.Low ? selectedReport.summary.Low : 0}
                </strong>
              </div>
              <div className="px-1 py-1 bg-primary text-light mt-1 text-center width-75">
                <strong className="fs-15 ">Low</strong>
              </div>
            </div>

            <div style={{ width: "200px" }}>
              <div className="py-3 bg-success text-light text-center width-75">
                <strong className="fs-50">
                  {selectedReport.summary.Informational
                    ? selectedReport.summary.Informational
                    : 0}
                </strong>
              </div>
              <div className="px-1 py-1 bg-success text-light mt-1 text-center width-75">
                <strong className="fs-15 ">Informational</strong>
              </div>
            </div>

            <div style={{ width: "410px" }}>
              <div className="text-secondary fs-14 mt-3">
                <p>
                  Any <strong className="text-danger">High</strong> and{" "}
                  <strong className="text-warning">Medium</strong> risk
                  vulnerabilities should be investigated and confirmed so that
                  remedation can take place.
                  <strong className="text-primary"> Low</strong> risk items
                  should not be ignored as they can be chained with other
                  vulnerabilities to enable further attacks.
                </p>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <strong className="fs-15 text-primary">
            {" "}
            Vulnerabilities Summary:
          </strong>
          <br />
          <br />

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
              {Object.entries(selectedReport.vulnerability).map(
                ([severity, details]) => (
                  <React.Fragment key={severity}>
                    {Object.entries(details).map(
                      ([description, subDetails]) => (
                        <React.Fragment key={description}>
                          <tr>
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
                              <strong>{description}</strong>
                            </td>
                            <td>{Object.keys(subDetails).length}</td>
                          </tr>
                          {Object.entries(subDetails).map(([key, value]) => (
                            <tr key={key}>
                              <td colSpan="3" style={{ padding: "0px" }}>
                                <div>
                                  <Table
                                    bordered
                                    style={{ tableLayout: "fixed" }}
                                  >
                                    <tbody className="fs-12">
                                      {Object.entries(value).map(
                                        ([propertyKey, propertyValue]) => (
                                          <tr key={propertyKey}>
                                            <td colSpan="2">{propertyKey}</td>
                                            <td
                                              colSpan="9"
                                              style={{
                                                wordWrap: "break-word",
                                              }}
                                            >
                                              {propertyValue}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      )
                    )}
                  </React.Fragment>
                )
              )}
            </tbody>
          </Table>
        </div>
      </>
    );
  };

  const printHandler = () => {
    const printElement = ReactDOMServer.renderToString(pdfJSX());
    // const printElement = pdfJSX();

    html2pdf().from(printElement).save();
  };

  return (
    <>
      <button onClick={printHandler} className="btn btn-sm btn-primary">
        Donwload
      </button>
      <div
        style={{ margin: "20px 100px", padding: "26px 35px" }}
        id="report-pdf"
        className="shadow"
      >
        <strong className="fs-20">Scan Summary:</strong>
        <br />
        <br />
        <div className="d-flex justify-content-between">
          <div>
            <strong className="fs-14 text-primary">Scan Information</strong>
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
                    {selectedReport.status
                      ? selectedReport.status.startTime
                      : "N/A"}
                  </strong>
                </p>
                <p className="fs-14 text-secondary">
                  <strong className="fs-14 text-secondary">
                    {selectedReport.status
                      ? selectedReport.status.endTime
                      : "N/A"}
                  </strong>
                </p>
                <p className="fs-14 text-secondary">
                  <strong className="fs-14 text-secondary">
                    {selectedReport.status
                      ? selectedReport.status.Duration
                      : "N/A"}
                  </strong>
                </p>
                <p className="fs-14 text-secondary">
                  <span className="badge badge-success">Finished</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <strong className="fs-14 text-primary">Findings</strong>

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
                      selectedReport.summary.High
                        ? selectedReport.summary.High + 40
                        : 40
                    }px`,
                  }}
                >
                  <strong className="fs-15 pl-3">
                    {selectedReport.summary.High
                      ? selectedReport.summary.High
                      : 0}
                  </strong>
                </div>
                <div
                  className="py-1 bg-warning text-light mt-1 "
                  style={{
                    width: `${
                      selectedReport.summary.Medium
                        ? selectedReport.summary.Medium + 40
                        : 40
                    }px`,
                  }}
                >
                  <strong className="fs-15 pl-3">
                    {selectedReport.summary.Medium
                      ? selectedReport.summary.Medium
                      : 0}
                  </strong>
                </div>
                <div
                  className="py-1 bg-primary text-light mt-1 "
                  style={{
                    width: `${
                      selectedReport.summary.Low
                        ? selectedReport.summary.Low + 40
                        : 40
                    }px`,
                  }}
                >
                  <strong className="fs-15 pl-3">
                    {selectedReport.summary.Low
                      ? selectedReport.summary.Low
                      : 0}
                  </strong>
                </div>
                <div
                  className="py-1 text-light mt-1"
                  style={{
                    width: `${
                      selectedReport.summary.Informational
                        ? selectedReport.summary.Informational + 40
                        : 40
                    }px`,
                    background: "rgb(128 199 145)",
                  }}
                >
                  <strong className="fs-15 pl-3">
                    {selectedReport.summary.Informational
                      ? selectedReport.summary.Informational
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
                {selectedReport.summary.High ? selectedReport.summary.High : 0}
              </strong>
            </div>
            <div className="py-1 bg-danger text-light mt-1 text-center width-75">
              <strong className="fs-15 ">High</strong>
            </div>
          </div>
          <div style={{ width: "160px" }}>
            <div className="py-3 bg-warning text-light text-center width-75">
              <strong className="fs-50">
                {selectedReport.summary.Medium
                  ? selectedReport.summary.Medium
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
                {selectedReport.summary.Low ? selectedReport.summary.Low : 0}
              </strong>
            </div>
            <div className="px-1 py-1 bg-primary text-light mt-1 text-center width-75">
              <strong className="fs-15 ">Low</strong>
            </div>
          </div>

          <div style={{ width: "200px" }}>
            <div className="py-3 bg-success text-light text-center width-75">
              <strong className="fs-50">
                {selectedReport.summary.Informational
                  ? selectedReport.summary.Informational
                  : 0}
              </strong>
            </div>
            <div className="px-1 py-1 bg-success text-light mt-1 text-center width-75">
              <strong className="fs-15 ">Informational</strong>
            </div>
          </div>

          <div style={{ width: "410px" }}>
            <div className="text-secondary fs-14 mt-3">
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
        <strong className="fs-15 text-primary">
          {" "}
          Vulnerabilities Summary:
        </strong>
        <br />
        <br />

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
            {Object.entries(selectedReport.vulnerability).map(
              ([severity, details]) => (
                <React.Fragment key={severity}>
                  {Object.entries(details).map(([description, subDetails]) => (
                    <React.Fragment key={description}>
                      <tr>
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
                          <strong>{description}</strong>
                        </td>
                        <td>{Object.keys(subDetails).length}</td>
                      </tr>
                      {Object.entries(subDetails).map(([key, value]) => (
                        <tr key={key}>
                          <td colSpan="3" style={{ padding: "0px" }}>
                            <div>
                              <Table bordered style={{ tableLayout: "fixed" }}>
                                <tbody className="fs-13">
                                  {Object.entries(subDetails).map(
                                    ([key, value]) => (
                                      <tr key={key}>
                                        <td
                                          colSpan="6"
                                          style={{ padding: "0px" }}
                                        >
                                          <div>
                                            <Table
                                              bordered
                                              style={{ tableLayout: "fixed" }}
                                            >
                                              <tbody className="fs-13">
                                                {Object.entries(value).map(
                                                  ([
                                                    propertyKey,
                                                    propertyValue,
                                                  ]) => (
                                                    <tr key={propertyKey}>
                                                      <td colSpan="2">
                                                        {propertyKey}
                                                      </td>
                                                      <td
                                                        colSpan="6"
                                                        style={{
                                                          wordWrap:
                                                            "break-word",
                                                        }}
                                                      >
                                                        {propertyValue}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </Table>
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              )
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ReportPdf;
