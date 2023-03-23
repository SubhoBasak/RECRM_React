import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { IoIosSave } from "react-icons/io";

// components
import ConnectionLostModal from "../ConnectionLostModal";
import InternalServerErrorModal from "../InternalServerErrorModal";

const NoteModal = ({ agent, client, url, hide, show, add }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [note, setNote] = React.useState("");
  const [validated, setValidated] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client ? { client, note } : { agent, note }),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200)
          res
            .json()
            .then((res) => {
              add({ _id: res.id, note, createdAt: new Date() });
              setNote("");
              hide();
            })
            .catch();
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
    setViewState(VIEWSTATE.loading);
  }

  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <Form validated={validated} onSubmit={handleSubmit} noValidate>
            <p className="text-secondary">Add a note</p>
            <Form.Group>
              <FloatingLabel label="Note">
                <Form.Control
                  as="textarea"
                  maxLength={1000}
                  placeholder="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-light"
                  style={{ minHeight: "12rem" }}
                  autoFocus
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your note!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Modal.Footer className="pb-0 px-0">
              <Button
                variant="outline-primary"
                className="btn-sm me-2"
                onClick={hide}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="btn-sm shadow d-flex align-items-center"
              >
                {viewState === VIEWSTATE.loading ? (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                ) : (
                  <IoIosSave className="me-2" />
                )}
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
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

export default NoteModal;
