import React from "react";
import { Modal } from "react-bootstrap";

// components
import InternalServerError from "../InternalServerError";

const InternalServerErrorModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.hide} centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <InternalServerError cancel={props.hide} />
      </Modal.Body>
    </Modal>
  );
};

export default InternalServerErrorModal;
