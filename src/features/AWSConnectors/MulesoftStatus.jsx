import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useScanContext } from "../../contexts/scanContext/scanContext";
import { Modal, Form } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { andromeda } from "@uiw/codemirror-theme-andromeda";
import { javascript } from "@codemirror/lang-javascript";

const MulesoftStatus = ({ handlePrevious }) => {
  const [open, setOpen] = useState(false);

  //Context
  const { awsData } = useScanContext();
  const navigate = useNavigate();
  return (
    <div className="d-flex" style={{ marginLeft: "50px", marginTop: "30px" }}>
      <Card style={{ width: "1100px" }} className="shadow">
        <Card.Body>
          <strong className="fs-20 text-secondary">
            <span>Mule</span> Connectors
          </strong>
          <br />
          <p className="fs-30 text-center" style={{ marginTop: "100px" }}>
            {" "}
            {awsData.msg && (
              <>
                {awsData.msg}{" "}
                <i className="fa-solid fa-check ml-2 text-success fs-30"></i>
                <br />
                <button
                  type="button"
                  className="btn btn-primary btn-outline btn-sm  mt-3"
                  onClick={() => setOpen(!open)}
                >
                  <i className="fa-solid fa-check fs-13"></i>
                  &nbsp; View Spec{" "}
                </button>
              </>
            )}
            {awsData.error && (
              <>
                {awsData.error}
                <i class="fa-solid fa-circle-exclamation text-danger ml-3"></i>{" "}
              </>
            )}
          </p>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "230px" }}
          >
            {awsData.msg !== null && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate("/home/scans", { replace: true });
                }}
              >
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  Next
                </strong>
              </button>
            )}
            {awsData.error && (
              <button className="btn btn-primary" onClick={handlePrevious}>
                <strong
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  <i class="fa-solid fa-arrow-left"></i> Back
                </strong>
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
        style={{ paddingBottom: "0px" }}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "0px",
          }}
        >
          <div className="fs-15 text-secondary ml-4 mt-2">
            Following are the details for API spec :
          </div>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ paddingBottom: "0px" }}
            className="scan-upload-container"
          >
            {/* <CodeMirror
              value={awsData.spec_url}
              height={"463px"}
              width={"660px"}
              className="editor-scroll"
              theme={andromeda}
              extensions={[javascript({ jsx: true })]}
            />{" "} */}
            <iframe
              height={"353px"}
              width={"660px"}
              src={awsData.spec_url}
            ></iframe>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MulesoftStatus;
