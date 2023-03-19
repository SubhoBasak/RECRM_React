import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { MdDelete, MdOutlineAddToPhotos } from "react-icons/md";
import { IoCloseCircle, IoWarningOutline } from "react-icons/io5";

// components
import NoRecords from "../NoRecords";
import ConfirmModal from "../ConfirmModal";
import ConnectionLostModal from "../ConnectionLostModal";
import InternalServerErrorModal from "../InternalServerErrorModal";

const StageModal = ({ show, hide, stages, setStages }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [alertMsg, setAlertMsg] = React.useState("");
  const [stageName, setStageName] = React.useState("");
  const [validated, setValidated] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  function updateState(newStages) {
    fetch(process.env.REACT_APP_BASE_URL + "/stage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stages: newStages }),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) {
          setStages(newStages);
          setStageName("");
          alertMsg("");
        } else if (res.status === 400)
          setAlertMsg("Something went wrong! Please try again.");
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.none));
    setViewState(VIEWSTATE.loading);
  }

  function removeStage(tmp) {
    updateState(stages.filter((stage) => stage !== tmp));
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    const indx = stages.findIndex((tmp) => tmp === stageName);
    if (indx === -1) updateState([stageName, ...stages]);
    else setAlertMsg("Stages can't have same name!");
  }

  return (
    <>
      <Modal show={show} onHide={hide}>
        <Modal.Header className="py-2">
          <Modal.Title>Stages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMsg !== "" && (
            <Alert className="d-flex align-items-center">
              <IoWarningOutline className="me-2 fs-4" />
              <strong className="me-1">Warning!</strong>
              {alertMsg}
              <IoCloseCircle
                className="ms-auto"
                onClick={() => setAlertMsg("")}
              />
            </Alert>
          )}
          {stages.length === 0 ? (
            <NoRecords />
          ) : (
            stages.map((stage, i) => (
              <Alert
                key={i}
                variant="warning"
                className="py-2 d-flex align-items-center"
                draggable
              >
                {i + 1 + ". " + stage}
                <MdDelete
                  className="ms-auto"
                  onClick={() => removeStage(stage)}
                />
              </Alert>
            ))
          )}
          <hr />
          <Form onSubmit={formSubmitHandler} validated={validated} noValidate>
            <div className="d-flex align-items-center">
              <Form.Group className="flex-grow-1 me-2">
                <FloatingLabel label="Stage name">
                  <Form.Control
                    type="text"
                    maxLength={100}
                    placeholder="Stage name"
                    value={stageName}
                    onChange={(e) => setStageName(e.target.value)}
                    pattern="[0-1a-zA-Z ]+"
                    autoFocus
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
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
                <MdOutlineAddToPhotos /> Add Stage
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ConfirmModal />
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

export default StageModal;
