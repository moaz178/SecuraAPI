import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ListGroup, Pagination, Button, Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";

const Reports = () => {
  const [reportList, setReportList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(8);
  // const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  //Scan context
  const { selectedReport, setSelectedReport } = useScanContext();

  useEffect(() => {
    const securaKey = { secura_key: "6m1fcduh0lm3h757ofun4194jn" };
    axios
      .post(`http://192.168.18.20:8082/SecuraCore/ListReport`, securaKey)
      .then(function (res) {
        setReportList(res.data);
        console.log("reportslist", reportList);
      })
      .catch(function (error) {
        toast.error(error.message);
        console.log("report list error", error);
      });
  }, []);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reportList.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleView = async (report) => {
    console.log("report: ", report);
    try {
      const response = await axios.post(
        `http://192.168.18.20:8082/SecuraCore/Report`,
        {
          secura_referenceId: report.referenceId,
        }
      );

      setSelectedReport(response.data);
      navigate(`./${report.id}`);
    } catch (error) {
      toast.error(error.message);
      console.log("report view error", error);
    }
  };

  const handleDownload = (refId) => {
    console.log(`Download clicked for reference ID ${refId}`);
  };

  console.log("SelectedReport", selectedReport);
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            fontWeight: "600",
            fontSize: "12px",
            padding: "20px 10px",
          },
        }}
      />

      {reportList === null ||
        (reportList.length < 1 && (
          <strong>No Reports Found ! Check your internect connection</strong>
        ))}

      <div
        style={{
          margin: "0px 100px",
        }}
      >
        <br />
        <Card style={{ border: "none" }}>
          <Card.Body>
            <Table hover className="fs-12">
              <thead>
                <tr>
                  <th className="text-center">ID #</th>
                  <th className="text-center">Target Host</th>
                  <th className="text-center">Reference ID</th>
                  <th className="text-center">Reported At</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report, index) => (
                  <tr key={report.id}>
                    <td className="text-center">{report.id}</td>
                    <td className="text-center">
                      <a href="#">{report.targetHost}</a>
                    </td>
                    <td className="text-center">
                      <p className="text-secondary">{report.referenceId}</p>
                    </td>
                    <td className="text-center">
                      <strong className="text-secondary fs-13">
                        <i className="fa-regular fa-calendar"></i>&nbsp;{" "}
                        {report.date}
                      </strong>
                    </td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="primary"
                        className="mr-2 fs-13"
                        onClick={() => handleView(report)}
                      >
                        <strong>
                          <i className="fa-solid fa-eye"></i>
                          {/* View */}
                        </strong>
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        className="fs-13"
                        onClick={() => handleDownload(report.referenceId)}
                      >
                        <strong>
                          <i className="fa-solid fa-cloud-arrow-down"></i>
                          {/* Download */}
                        </strong>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
            <Pagination className="d-flex justify-content-center">
              <Pagination.First onClick={() => paginate(1)} />
              <Pagination.Prev
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              />
              {Array.from({
                length: Math.ceil(reportList.length / reportsPerPage),
              }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() =>
                  paginate(
                    currentPage < Math.ceil(reportList.length / reportsPerPage)
                      ? currentPage + 1
                      : currentPage
                  )
                }
                disabled={
                  currentPage === Math.ceil(reportList.length / reportsPerPage)
                }
              />
              <Pagination.Last
                onClick={() =>
                  paginate(Math.ceil(reportList.length / reportsPerPage))
                }
                disabled={
                  currentPage === Math.ceil(reportList.length / reportsPerPage)
                }
              />
            </Pagination>
          </Card.Body>
        </Card>

        {/* <ListGroup className="fs-12">
          {currentReports.map((report) => (
            <ListGroup.Item key={report.id} className="shadow mb-3">
              <div className="d-flex justify-content-between mb-2 mt-1">
                <div className="d-flex">
                  <strong>Target Host:</strong>&nbsp; &nbsp;
                  <a href="#">{report.targetHost}</a>
                </div>

                <div>
                  <p>
                    <strong className="text-secondary fs-13">
                      <i className="fa-regular fa-calendar"></i>&nbsp;{" "}
                      {report.date}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between ">
                <div className="d-flex">
                  <strong>Reference ID:</strong>&nbsp; &nbsp;
                  <p className="text-secondary">{report.referenceId}</p>
                </div>

                <div>
                  <Button
                    size="sm"
                    variant="primary"
                    className="mr-2 fs-13"
                    onClick={() => handleView(report)}
                  >
                    <strong>
                      <i className="fa-solid fa-eye"></i>
                    </strong>
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    className="fs-13"
                    onClick={() => handleDownload(report.referenceId)}
                  >
                    <strong>
                      <i className="fa-solid fa-cloud-arrow-down"></i>
                    </strong>
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <br />
        <Pagination className="d-flex justify-content-center">
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Prev
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          />
          {Array.from({
            length: Math.ceil(reportList.length / reportsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              paginate(
                currentPage < Math.ceil(reportList.length / reportsPerPage)
                  ? currentPage + 1
                  : currentPage
              )
            }
            disabled={
              currentPage === Math.ceil(reportList.length / reportsPerPage)
            }
          />
          <Pagination.Last
            onClick={() =>
              paginate(Math.ceil(reportList.length / reportsPerPage))
            }
            disabled={
              currentPage === Math.ceil(reportList.length / reportsPerPage)
            }
          />
        </Pagination> */}
      </div>
      {/* For displaying the PDF */}
      {/* <SelectedReport selectedReport={selectedReport} /> */}
    </>
  );
};

export default Reports;
