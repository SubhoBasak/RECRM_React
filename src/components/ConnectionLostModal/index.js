import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

// icons
import { MdClose, MdRefresh } from "react-icons/md";

// components
import ConnectionLost from "../ConnectionLost";

const ConnectionLostModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <ConnectionLost cancel={true} />
      </Modal.Body>
    </Modal>
  );
};

export default ConnectionLostModal;
