import React from "react";
import { Modal } from "react-bootstrap";

// components
import ConnectionLost from "../ConnectionLost";

const ConnectionLostModal = ({ show, hide }) => {
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <ConnectionLost cancel={hide} />
      </Modal.Body>
    </Modal>
  );
};

export default ConnectionLostModal;
