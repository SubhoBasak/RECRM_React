import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row, Button, Modal, ListGroup } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./style.css";

// icons
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";
import RemarkCard from "../../components/RemarkCard";
import RepresentativeCard from "../../components/RepresentativeCard";

const CompanyDetails = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    industry: "",
    a1: "",
    a2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    landmark: "",
    about: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [clrModal, setClrModal] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);

  const navigate = useNavigate();

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const addPerson = (e) => {
    e.preventDefault();
    setValidated(true);
    !e.currentTarget.checkValidity() && e.stopPropagation();
  };

  return (
    <>
      <nav>
        <p className="text-primary">Add new contact</p>
        <Button
          variant="outline-primary"
          className="d-flex my-auto ms-auto"
          onClick={() => setClrModal(true)}
        >
          <AiOutlineClear />
        </Button>
        <Button
          className="ms-3 my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/all_contacts")}
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
              Company Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit company details
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
        <Col lg="9" className="order-2 order-lg-1">
          <Form
            noValidate
            validated={validated}
            onSubmit={addPerson}
            className="p-3 bg-white rounded-4 mb-3"
          >
            <p className="text-secondary">Company details</p>
            <Form.Group className="mb-3">
              <FloatingLabel label="Name">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  maxLength="100"
                  value={formData.name}
                  onChange={setField("name")}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={setField("email")}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Phone">
                    <Form.Control
                      type="text"
                      maxLength="20"
                      placeholder="Phone"
                      pattern="[+]?[0-9 -]*"
                      value={formData.phone}
                      onChange={setField("phone")}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Industry">
                    <Form.Control
                      type="text"
                      className="d-flex"
                      maxLength="100"
                      placeholder="Industry"
                      value={formData.industry}
                      onChange={setField("industry")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <p className="text-secondary mt-5">Address details</p>
            <Form.Group className="mb-3">
              <FloatingLabel label="Address line 1">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Address line 1"
                  value={formData.a1}
                  onChange={setField("a1")}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Address line 2">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Address line 2"
                  value={formData.a2}
                  onChange={setField("a2")}
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="City">
                    <Form.Control
                      type="text"
                      maxLength="100"
                      placeholder="City"
                      value={formData.city}
                      onChange={setField("city")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="State">
                    <Form.Control
                      type="text"
                      maxLength="100"
                      placeholder="State"
                      value={formData.state}
                      onChange={setField("state")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Country">
                    <Form.Control
                      type="text"
                      maxLength="100"
                      placeholder="Country"
                      value={formData.country}
                      onChange={setField("country")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Zip code">
                    <Form.Control
                      type="text"
                      maxLength="100"
                      placeholder="Zip code"
                      value={formData.zip}
                      onChange={setField("zip")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <FloatingLabel label="Landmark">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Landmark"
                  value={formData.landmark}
                  onChange={setField("landmark")}
                />
              </FloatingLabel>
            </Form.Group>
            <p className="text-secondary mt-5">Other details</p>
            <Form.Group className="mb-3">
              <FloatingLabel label="About">
                <Form.Control
                  maxLength="500"
                  as={"textarea"}
                  placeholder="About"
                  className="form-control bg-light"
                  value={formData.about}
                  onChange={setField("about")}
                  style={{ height: "12rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex py-3">
              <Button
                type="submit"
                variant="primary"
                className="btn-sm shadow mx-auto"
              >
                <FiUserCheck className="me-2" />
                Add Now
              </Button>
            </div>
          </Form>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Representatives
          </h1>
          <ListGroup variant="flush" className="rounded-4 mt-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <RepresentativeCard key={i} role="Employee" />
            ))}
          </ListGroup>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Notes
          </h1>
          {[1, 2, 3, 4, 5].map((i) => (
            <RemarkCard key={i} />
          ))}
        </Col>
        <Col lg="3" className="order-1 order-lg-2">
          <div className="d-flex flex-column align-items-center mb-5 position-sticky top-0 mx-auto">
            <img
              src={require("../../assets/svgs/person.svg").default}
              width="180"
              height="180"
              alt="person"
              className="my-3"
            />
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Add Representative
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              View Clients
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Add Remark
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Delete
            </Button>
          </div>
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
          <Button
            variant="outline-secondary"
            onClick={() => setClrModal(false)}
          >
            Close
          </Button>
          <Button
            variant="outline-danger"
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

export default CompanyDetails;
