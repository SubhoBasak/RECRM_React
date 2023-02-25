import React from "react";
import { Modal } from "react-bootstrap";
import "./style.css";

// components
import ConnectionLost from "../ConnectionLost";

const ConnectionLostModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.hide} centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <ConnectionLost cancel={props.hide} />
      </Modal.Body>
    </Modal>
  );
};

export default ConnectionLostModal;
