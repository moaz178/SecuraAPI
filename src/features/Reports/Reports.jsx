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
        (reportList.length < 1 ? (
          <strong>Loading.. </strong>
        ) : (
          <div
            style={{
              margin: "0px 100px",
            }}
          >
            <br />
            <Card style={{ border: "none" }}>
              <Card.Body>
                <Table className="fs-12">
                  <thead>
                    <tr>
                      <th className="text-center">ID #</th>
                      <th className="text-center">Target Host</th>
                      <th className="text-center">Reference ID</th>
                      <th className="text-center">Reported At</th>
                      <th className="text-center">
                        <span className="ml-4">Actions</span>
                      </th>
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
                        <td className="text-end">
                          <Button
                            size="sm"
                            variant="info"
                            className="mr-2 fs-13"
                            onClick={() => handleView(report)}
                          >
                            <strong>
                              <i className="fa-solid fa-eye"></i> &nbsp;View
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
                    onClick={() =>
                      paginate(currentPage > 1 ? currentPage - 1 : 1)
                    }
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
                        currentPage <
                          Math.ceil(reportList.length / reportsPerPage)
                          ? currentPage + 1
                          : currentPage
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(reportList.length / reportsPerPage)
                    }
                  />
                  <Pagination.Last
                    onClick={() =>
                      paginate(Math.ceil(reportList.length / reportsPerPage))
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(reportList.length / reportsPerPage)
                    }
                  />
                </Pagination>
              </Card.Body>
            </Card>
          </div>
        ))}
    </>
  );
};

export default Reports;
