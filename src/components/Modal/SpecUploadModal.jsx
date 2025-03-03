import React from "react";
import { Modal } from "react-bootstrap";

const SpecUploadModal = ({ show, setShow, handleUpload, file, uploadFile }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        centered
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "0px",
          }}
        ></Modal.Header>
        <Modal.Body>
          <div className="scan-upload-container">
            <strong className="fs-14">Upload your API spec here.</strong>
            <strong className="fs-12 text-secondary mt-3">
              ( Supported Format : Swagger , OAS and RAML )
            </strong>
            <br />
            <h3 className="text-center text-info">Drag your file here Or</h3>
            {/* <h3 className="text-center text-info">Or</h3> */}
            <i className="fa fa-upload fa-5x text-dark"></i>
            <br />

            <input
              style={{ marginLeft: "100px" }}
              type="file"
              onChange={handleUpload}
            ></input>
            <br />
            <br />
            <button
              type="submit"
              className="btn btn-md btn-info btn-block mb-2"
              onClick={uploadFile}
              disabled={!file}
              style={{ width: "300px" }}
            >
              Upload
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SpecUploadModal;
