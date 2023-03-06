import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, hide, msg, yes }) => {
  return (
    <Modal
      show={show}
      onHide={hide}
      backdrop="static"
      className="modal-sm"
      centered
    >
      <Modal.Header>
        <Modal.Title style={{ fontFamily: "pacifico" }}>Warning!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex py-0 flex-column align-items-center">
        <img
          src={require("../../assets/svgs/warn.svg").default}
          width={128}
          height={128}
          alt="warn"
        />
        <p className="w-75 text-center">{msg}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" className="btn-sm" onClick={hide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          className="btn-sm shadow"
          onClick={() => {
            yes();
            hide();
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
