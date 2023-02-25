import React from "react";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";
import "./style.css";

const RepresentativeModal = (props) => {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function addRepr(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    fetch(process.env.REACT_APP_BASE_URL + "/repr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
        }
      })
      .catch(() => {
        setLoading(false);
      });

    setLoading(true);
  }

  return (
    <Modal show={props.show} onHide={props.hide}>
      <Modal.Header className="pb-0" closeButton />
      <Modal.Body>
        <div className="d-flex align-items-center">
          <img
            width={128}
            height={128}
            className="me-3"
            src={require("../../assets/svgs/repr.svg").default}
            alt="repr"
          />
          <div>
            <h2 style={{ fontFamily: "pacifico" }}>Representative</h2>
            <p className="text-secondary mb-0">
              View & edit representative details
            </p>
          </div>
        </div>
        <Form validated={validated} onSubmit={addRepr} noValidate>
          <Form.Group>
            <FloatingLabel label="Name">
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Name"
                value={formData.name}
                onChange={setField("name")}
                required
              />
            <Form.Control.Feedback type="invalid">
              This field is required!
            </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Designation">
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Designation"
                value={Form.designation}
                onChange={setField("designation")}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Phone">
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Phone"
                value={Form.phone}
                onChange={setField("phone")}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={Form.email}
                onChange={setField("email")}
              />
            </FloatingLabel>
          </Form.Group>
          <Modal.Footer className="pb-0 px-0">
            <Button
              variant="outline-primary"
              className="btn-sm me-2"
              onClick={props.hide}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="btn-sm shadow">
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
              Add Now
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RepresentativeModal;
