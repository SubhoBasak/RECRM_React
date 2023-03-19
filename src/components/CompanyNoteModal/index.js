import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Dropdown,
  FloatingLabel,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";

// icons
import { IoIosSave } from "react-icons/io";
import { FiUserPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

const CompanyNoteModal = ({ company, hide, show, add, reprs }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [note, setNote] = React.useState("");
  const [validated, setValidated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tagged, setTagged] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    fetch(process.env.REACT_APP_BASE_URL + "/company/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, note, tagged: tagged.map((x) => x.id) }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200)
          res
            .json()
            .then((res) => {
              add({ _id: res.id, note, createdAt: new Date() });
              setNote("");
              setTagged([]);
              hide();
            })
            .catch();
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }

  return (
    <Modal size="lg" show={show} onHide={hide} centered>
      <div className="d-flex my-3 align-items-center">
        <img
          src={require("../../assets/svgs/note.svg").default}
          className="mx-3"
          width={128}
          height={128}
          alt="note"
        />
        <div>
          <h1 style={{ fontFamily: "pacifico" }}>Add Note</h1>
          <p className="text-secondary mb-0">
            Add a small piece of information
          </p>
        </div>
      </div>
      <Modal.Body>
        <Form validated={validated} onSubmit={handleSubmit} noValidate>
          <label className="text-black-50 mb-3">
            <FiUserPlus className="me-2" />
            Tag representatives
          </label>
          <div className="d-flex flex-wrap">
            {tagged.map((repr, i) => (
              <Alert
                key={i}
                variant="warning py-0 px-2 ms-1 d-flex align-items-center"
                style={{ maxHeight: "fit-content" }}
              >
                {repr.name}
                <IoCloseSharp
                  onClick={() =>
                    setTagged(tagged.filter((tmp) => tmp.id !== repr.id))
                  }
                />
              </Alert>
            ))}
          </div>
          <Dropdown autoClose="outside" className="mb-3">
            <Dropdown.Toggle className="btn-sm">
              Select Representatives
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {reprs.length === tagged.length ? (
                <Dropdown.Item className="text-black-50">
                  All Selected
                </Dropdown.Item>
              ) : (
                reprs.map((repr, i) => {
                  if (tagged.findIndex((tmp) => tmp.id === repr._id) === -1)
                    return (
                      <Dropdown.Item
                        key={i}
                        onClick={() =>
                          setTagged([
                            { id: repr._id, name: repr.name },
                            ...tagged,
                          ])
                        }
                      >
                        {repr.name}
                      </Dropdown.Item>
                    );
                  return <></>;
                })
              )}
            </Dropdown.Menu>
          </Dropdown>
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

export default CompanyNoteModal;
