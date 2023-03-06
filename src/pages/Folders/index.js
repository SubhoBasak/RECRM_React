import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Accordion, Row, Button, Modal } from "react-bootstrap";

// icons
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";

const Project = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    location: "",
    details: "",
    category: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [clrModal, setClrModal] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);

  const navigate = useNavigate();

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const addProject = (e) => {
    e.preventDefault();
    setValidated(true);
    !e.currentTarget.checkValidity() && e.stopPropagation();
  };

  return (
    <>
      <nav>
        <p className="text-primary">Add new project</p>
        <Button
          variant="outline-primary"
          className="d-flex my-auto ms-auto"
          onClick={() => setClrModal(true)}
        >
          <AiOutlineClear />
        </Button>
        <Button
          className="ms-3 my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/properties")}
        >
          <TbArrowBack className="me-2" />
          Return
        </Button>
      </nav>
      <Row className="w-100">
        <Col lg="6" md="6" sm="12" className="d-flex align-items-center my-5">
          <img
            src={require("../../assets/svgs/people.svg").default}
            alt="people"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              Person Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit person details
            </p>
          </div>
        </Col>
        <Col
          lg="6"
          md="6"
          sm="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="p-2 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              100
            </h1>
            <p className="text-secondary">Requirements</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              75
            </h1>
            <p className="text-secondary">Remarks</p>
          </div>
        </Col>
      </Row>
      <Row className="w-100 m-0 p-0">
        <Col lg="9">
          <Form
            noValidate
            validated={validated}
            onSubmit={addProject}
            className="p-3 bg-white rounded mb-3"
          >
            <Form.Group className="mb-3">
              <Form.Label>
                Title<span className="text-danger ms-1">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                maxLength="100"
                value={formData.title}
                onChange={setField("title")}
                required
              />
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <textarea
                rows="8"
                maxLength="500"
                className="form-control"
                value={formData.location}
                onChange={setField("location")}
              ></textarea>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Details</Form.Label>
              <textarea
                rows="8"
                maxLength="1000"
                className="form-control"
                value={formData.details}
                onChange={setField("details")}
              ></textarea>
            </Form.Group>
            <div className="d-flex pt-3 border-top border-1">
              <Button type="submit" variant="primary" className="mx-auto">
                <FiUserCheck className="me-2" />
                Add Project
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg="3">
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>GENDER</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Male" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Female" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Others" />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>SOURCE</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Direct" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Agent" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Website" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Social Media" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="TV or Newspaper" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Others" />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Modal
        size="sm"
        show={clrModal}
        onHide={() => setClrModal(false)}
        aria-labelledby="clear-all-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="clear-all-modal">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to clear all the fields?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setClrModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setClrModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="sm"
        show={cancelModal}
        onHide={() => setCancelModal(false)}
        aria-labelledby="clear-all-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="clear-all-modal">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cancelling may cause data loss. Do you really want to proceed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCancelModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              navigate("/agent");
              setCancelModal(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Project;
