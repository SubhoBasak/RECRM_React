import React from "react";
import { Modal } from "react-bootstrap";

// components
import InternalServerError from "../InternalServerError";

const InternalServerErrorModal = ({ show, hide }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <InternalServerError cancel={hide} />
      </Modal.Body>
    </Modal>
  );
};

export default InternalServerErrorModal;
