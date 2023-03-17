import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Form, Modal, Spinner } from "react-bootstrap";

const RepresentativeModal = ({ company, add, hide, show }) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

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

  function handleSubmit(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    let tmpData = { company };
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/repr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          res.json().then((res) => add({ ...tmpData, _id: res.id }));
          setFormData({ name: "", phone: "", email: "", designation: "" });
          hide();
        } else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
      })
      .catch(() => {
        setLoading(false);
      });

    setLoading(true);
  }

  return (
    <Modal show={show} onHide={hide}>
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
        <Form validated={validated} onSubmit={handleSubmit} noValidate>
          <Form.Group>
            <FloatingLabel label="Name">
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Name"
                value={formData.name}
                onChange={setField("name")}
                autoFocus
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
                value={formData.designation}
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
                value={formData.phone}
                onChange={setField("phone")}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={setField("email")}
              />
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
