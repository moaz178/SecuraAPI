import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const OTPModal = ({ show, setShow }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-success fs-14" role="alert">
          We've sent you a verification code to your email !
        </div>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter Verification Code" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShow(false)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPModal;
