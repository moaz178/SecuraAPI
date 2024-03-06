import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, Table } from "react-bootstrap";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import axios from "axios";
import ReactLoading from "react-loading";
import Loader from "../../components/Loader/Loader";
import { secura_URL } from "../../utils/endpoint";

const MuleAPIList = ({ handleNext, handlePrevious }) => {
  const [loading, setLoading] = useState(false);
  const [muleAPIdata, setMuleAPIdata] = useState([]);
  const [selectedAPIId, setSelectedAPIId] = useState(null); // State to track selected API ID

  // Context
  const { muleData, setAWSdata } = useScanContext();

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${secura_URL}/Mule_APIList`, muleData)
      .then(function (res) {
        setMuleAPIdata(res.data);
        setLoading(false);
        console.log("api table data", res.data);
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("MuleAPIList", error);
      });
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const mulesoftParams = {
      apiId: selectedAPIId,
      ...muleData,
    };
    axios
      .post(` ${secura_URL}/Mule_Connect`, mulesoftParams)
      .then(function (res) {
        setAWSdata(res.data);
        setLoading(false);
        handleNext();
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("MuleAPIList", error);
      });
  };

  console.log("api listttttttt", muleAPIdata);

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
      <div className="d-flex" style={{ marginLeft: "50px", marginTop: "30px" }}>
        <Card style={{ width: "100%" }} className="shadow">
          <Card.Body>
            <strong className="fs-20 text-secondary">
              <span className="">Mule</span> Connectors
            </strong>
            <br />
            <div className="mt-2 mb-3">
              <img
                src="/dist/muleAPI.png"
                alt="apimanager-logo"
                width="30px"
                className="mr-2"
              />
              <strong className="fs-14 text-secondary">API Manager</strong>
            </div>
            <br />
            <div className="d-flex flex-column">
              <Table className="fs-12">
                <thead>
                  <tr>
                    <th className="text-center">
                      <i className="fa-solid fa-angle-down"></i>
                    </th>
                    <th className="text-center">API Name</th>
                    <th className="text-center">Runtime</th>
                    <th className="text-center">Label</th>
                    <th className="text-center">Version</th>
                    <th className="text-center">Instance</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center fs-13 text-primary mt-4"
                      >
                        Please wait. Request is being processed !
                      </td>
                    </tr>
                  ) : muleAPIdata.length > 0 ? (
                    muleAPIdata.map(
                      ({
                        assetId,
                        technology,
                        productVersion,
                        id,
                        instanceLabel,
                      }) => (
                        <tr key={assetId}>
                          <td className="text-center">
                            <input
                              type="radio"
                              name="selectAPI"
                              value={id}
                              checked={selectedAPIId === id}
                              onChange={() => setSelectedAPIId(id)} // Update selectedAPIId when radio is changed
                            />
                          </td>{" "}
                          <td className="text-center">
                            <a href="#">{assetId}</a>
                          </td>
                          <td className="text-center">
                            <p className="text-secondary">{technology}</p>
                          </td>
                          <td className="text-center">
                            <strong className="text-secondary fs-13">
                              {instanceLabel !== null ? instanceLabel : "-"}
                            </strong>
                          </td>
                          <td className="text-center">{productVersion}</td>
                          <td className="text-center">{id}</td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center fs-15 text-danger mt-4"
                      >
                        Something went wrong !
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <br />

              <div className="d-flex">
                <button
                  className="btn btn-primary"
                  style={{ marginLeft: "auto", width: "100px" }}
                  onClick={handleSubmitForm}
                  disabled={loading || !selectedAPIId} // Disable button if no API is selected
                >
                  <strong
                    style={{
                      letterSpacing: "1px",
                    }}
                  >
                    Next <i className="fa-solid fa-arrow-right"></i>
                  </strong>
                </button>
                {muleAPIdata.error && (
                  <button
                    className="btn btn-primary ml-2"
                    onClick={handlePrevious}
                  >
                    <strong
                      style={{
                        letterSpacing: "1px",
                      }}
                    >
                      <i className="fa-solid fa-arrow-left"></i> Back
                    </strong>
                  </button>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MuleAPIList;
