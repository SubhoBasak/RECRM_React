import React from "react";
import { Alert, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const StageModal = ({ show, hide, stages, setStages }) => {
  const [stageName, setStageName] = React.useState("");
  const [tmpStages, setTmpStages] = React.useState(stages);
  const [loading, setLoading] = React.useState(false);

  function changeStages(stages) {
    fetch(process.env.REACT_APP_BASE_URL + "/stage", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stages),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) setStages(tmpStages);
      })
      .catch(() => setLoading(false));
  }

  return (
    <Modal className="modal-lg" show={show} onHide={hide}>
      <Modal.Header className="py-1" closeButton>
        <Modal.Title>Stages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {tmpStages.map((stage, i) => (
          <Alert key={i} variant="primary" className="px-2 py-0">
            {stage}<MdClose className="ms-2" />
          </Alert>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Form onSubmit={() => changeStages([...tmpStages, stageName])}>
          <div className="d-flex align-items-center">
            <Form.Group>
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
              Add Now
            </Button>
          </div>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default StageModal;
