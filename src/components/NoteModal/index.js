import React from "react";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";

// icons
import { IoIosSave } from "react-icons/io";

const NoteModal = ({ agent, client, url, hide, show, add }) => {
  const [note, setNote] = React.useState("");
  const [validated, setValidated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    let tmpData = {};
    if (client) tmpData = { client, note };
    else tmpData = { agent, note };

    fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200)
          res
            .json()
            .then((res) => {
              add({ _id: res.id, note, createdAt: new Date() });
              setNote("");
              hide();
            })
            .catch();
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }

  return (
    <Modal size="lg" show={show} onHide={hide} centered>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit} noValidate>
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
              {loading ? (
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
  );
};

export default NoteModal;
