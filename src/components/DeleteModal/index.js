import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// components
import ConnectionLostModal from "../ConnectionLostModal";
import InternalServerErrorModal from "../InternalServerErrorModal";

const DeleteModal = ({ show, hide, url, body, remove, msg }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  function deleteNow() {
    fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) remove();
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
    setViewState(VIEWSTATE.loading);
  }

  return (
    <>
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
            onClick={deleteNow}
          >
            {viewState === VIEWSTATE.loading && (
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
      <ConnectionLostModal
        show={viewState === VIEWSTATE.connLost}
        hide={() => setViewState(VIEWSTATE.none)}
      />
      <InternalServerErrorModal
        show={viewState === VIEWSTATE.serverError}
        hide={() => setViewState(VIEWSTATE.none)}
      />
    </>
  );
};

export default DeleteModal;
