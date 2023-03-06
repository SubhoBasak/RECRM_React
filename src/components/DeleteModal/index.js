import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

const DeleteModal = ({ show, hide, url, body, remove, msg }) => {
  const [loading, setLoading] = React.useState(false);

  function deleteNow() {
    fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) remove();
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }

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
        <Button variant="primary" className="btn-sm shadow" onClick={deleteNow}>
          {loading && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          )}
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
