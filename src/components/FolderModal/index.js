import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, Form, FloatingLabel, Spinner } from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// components
import ConnectionLostModal from "../ConnectionLostModal";
import InternalServerErrorModal from "../InternalServerErrorModal";

const FolderModal = ({ hide, show }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [formData, setFormData] = React.useState({
    name: "",
    info: "",
  });
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [validated, setValidated] = React.useState(false);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function clearFormData() {
    setFormData({
      name: "",
      info: "",
    });
  }

  function addFolder(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      e.stopPropagation();
    }

    let tmpData = {};
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/folder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) {
          setValidated(false);
          clearFormData();
          hide();
        } else if (res.status === 401)
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
        onHide={() => {
          setValidated(false);
          hide();
        }}
      >
        <Modal.Body>
          <div className="d-flex align-items-center">
            <img
              src={require("../../assets/svgs/folder.svg").default}
              width={128}
              height={128}
              alt="folder"
              className="me-2"
            />
            <div>
              <h2 style={{ fontFamily: "pacifico" }}>Add Folder</h2>
              <p className="text-secondary mb-0">Add new property folder</p>
            </div>
          </div>
          <Form onSubmit={addFolder} validated={validated} noValidate>
            <Form.Group className="mb-3">
              <FloatingLabel label="Folder name">
                <Form.Control
                  type="text"
                  maxLength={100}
                  value={formData.name}
                  placeholder="Folder name"
                  onChange={setField("name")}
                  autoFocus
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter folder name!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <FloatingLabel label="Info">
                <Form.Control
                  type="text"
                  as="textarea"
                  className="bg-light"
                  maxLength={500}
                  value={formData.info}
                  placeholder="Info"
                  onChange={setField("info")}
                  style={{ minHeight: "8rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="outline-primary"
                className="btn-sm me-1"
                onClick={() => {
                  clearFormData();
                  setValidated(false);
                  hide();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="btn-sm shadow">
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
                Create
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

export default FolderModal;
