import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Card, Table } from "react-bootstrap";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import { useNavigate } from "react-router-dom";
import { secura_URL } from "../../utils/endpoint";
import axios from "axios";
import ReactLoading from "react-loading";

const MuleAPIList = ({ handleNext, handlePrevious }) => {
  const [loading, setLoading] = useState(false);
  const [muleAPIdata, setMuleAPIdata] = useState([]);
  const [selectedAPIId, setSelectedAPIId] = useState({
    assetId: "",
    organizationId: "",
  }); // State to track selected API ID
  const [statusMsg, setStatusMsg] = useState(
    " Please wait. Request is being processed !"
  );

  // Context
  const { muleData, setAWSdata } = useScanContext();

  //For navigation
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .post(`${secura_URL}/Mule_APIList`, muleData)
      .then(function (res) {
        setMuleAPIdata(res.data);
        setLoading(false);
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
    setStatusMsg("Downloading.. .");
    const mulesoftParams = {
      assetId: selectedAPIId.assetId,
      organizationId: selectedAPIId.organizationId,
      ...muleData,
    };
    console.log("mulesoftParams: ", mulesoftParams);
    axios
      .post(` ${secura_URL}/Mule_SpecDownload`, mulesoftParams)
      .then(function (res) {
        console.log("res", res);
        setAWSdata(res.data);
        setLoading(false);
        navigate("/home/scans", { replace: true });
      })
      .catch(function (error) {
        toast.error(error);
        setLoading(false);
        console.log("MuleAPIList", error);
      });
  };

  console.log("mule api list", muleAPIdata);

  return (
    <>
      {/* <Loader show={loading} /> */}
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
                    <th className="text-center">Runtime Label</th>
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ReactLoading
                            type={"spokes"}
                            color={"#55b9f2"}
                            height={20}
                            width={20}
                          />
                          <p className="ml-3"> {statusMsg}</p>
                        </div>{" "}
                      </td>
                    </tr>
                  ) : muleAPIdata.assets && muleAPIdata.assets.length > 0 ? (
                    muleAPIdata.assets.map(
                      ({ exchangeAssetName, assetId, apis }) =>
                        apis.map((api) => (
                          <tr key={api.id}>
                            <td className="text-center">
                              {/* <input
                              type="checkbox"
                              name="selectAPI"
                              value={api.id}
                              onChange={() => setSelectedAPIId(api.id)}
                            /> */}
                              <input
                                type="radio"
                                name="selectAPI"
                                value={api.id}
                                checked={
                                  selectedAPIId.assetId === api.assetId &&
                                  selectedAPIId.organizationId ===
                                    api.organizationId
                                }
                                onChange={() =>
                                  setSelectedAPIId({
                                    assetId: api.assetId,
                                    organizationId: api.organizationId,
                                  })
                                }
                              />
                            </td>
                            <td className="text-center">
                              <a href="#">{exchangeAssetName}</a>
                            </td>
                            <td className="text-center">
                              <p className="text-secondary">{api.technology}</p>
                            </td>
                            {/* <td className="text-center">
                            <strong className="text-secondary fs-13">
                              {api.instanceLabel !== null
                                ? api.instanceLabel
                                : "-"}
                            </strong>
                          </td> */}
                            <td className="text-center">
                              {api.productVersion}
                            </td>
                            <td className="text-center">{api.id}</td>
                          </tr>
                        ))
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center fs-15 text-danger mt-4"
                      >
                        {muleAPIdata.error
                          ? muleAPIdata.error
                          : "Something went wrong !"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <br />

              <div className="d-flex justify-content-end">
                {muleAPIdata.error ? null : (
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
                )}
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
