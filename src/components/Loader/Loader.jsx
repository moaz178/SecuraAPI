import React from "react";
import ReactLoading from "react-loading";
import { Modal } from "react-bootstrap";

const Loader = ({ show }) => {
  return (
    <>
      <Modal show={show}>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              background: "none",
            }}
          >
            <ReactLoading
              type={"spokes"}
              color={"#55b9f2"}
              height={60}
              width={60}
            />
            <Modal.Title className="fs-15 ml-4 mt-4">
              Please wait. It may take few seconds ...
            </Modal.Title>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Loader;
