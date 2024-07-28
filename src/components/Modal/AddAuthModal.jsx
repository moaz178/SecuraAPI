import React from "react";
import { Modal } from "react-bootstrap";
import Authentication from "../../features/Authentication/Authentication";

const AddAuthModal = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        show={open}
        onHide={() => {
          setOpen(false);
        }}
        style={{ paddingBottom: "0px" }}
        centered
        size="xl"
        backdrop="static"
      >
        <Modal.Header
          closeButton
          style={{
            borderBottom: "0px",
          }}
        ></Modal.Header>
        <Modal.Body>
          <div
            style={{ paddingBottom: "0px" }}
            className="scan-upload-container"
          >
            <Authentication setOpen={setOpen} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddAuthModal;
