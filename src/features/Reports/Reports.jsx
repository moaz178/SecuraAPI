import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ListGroup, Pagination, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";

const Reports = () => {
  const [reportList, setReportList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(5);
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
        // console.log("reportslist", reportList);
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
      navigate(`./report/${report.id}`);
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
      <div>
        <strong className="fs-30">Reports</strong>
      </div>
      <br />
      <div
        style={{
          margin: "0px 100px",
        }}
      >
        <ListGroup className="fs-12">
          {currentReports.map((report) => (
            <>
              <ListGroup.Item key={report.id} className="shadow">
                <strong>Report ID: {report.id}</strong>
                <p>Reference ID: {report.referenceId}</p>
                <p>
                  Target Host: <a href="#">{report.targetHost}</a>
                </p>
                <br />
                <div className="d-flex justify-content-between ">
                  <div>
                    <p>
                      Date: <strong>{report.date}</strong>
                    </p>
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
                  </div>
                </div>
              </ListGroup.Item>
              <br />
            </>
          ))}
        </ListGroup>
        <br />
        <Pagination className="d-flex justify-content-center">
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
        </Pagination>
      </div>
      {/* For displaying the PDF */}
      {/* <SelectedReport selectedReport={selectedReport} /> */}
    </>
  );
};

export default Reports;
