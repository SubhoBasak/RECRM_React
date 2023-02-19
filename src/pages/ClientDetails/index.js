import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, Row, Button, FormSelect, Modal } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./style.css";

// icons
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";
import RemarkCard from "../../components/RemarkCard";

const ContactDetails = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    occupation: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    landmark: "",
    source: "",
    agent: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [clrModal, setClrModal] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);

  const navigate = useNavigate();

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const addClient = (e) => {
    e.preventDefault();
    setValidated(true);

    if (!e.currentTarget.checkValidity()) return e.stopPropagation();

    let tmpData = {};
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        if (res.status === 200) {
          setValidated(false);
        }
      })
      .catch();
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
              Client Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit client details
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
            onSubmit={addClient}
            className="p-3 bg-white rounded-4 mb-3"
          >
            <p className="text-secondary">Personal details</p>
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
                  <FloatingLabel label="Gender">
                    <FormSelect
                      value={formData.gender}
                      onChange={setField("gender")}
                    >
                      <option value="">Select</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Others</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Date of Birth">
                    <Form.Control
                      type="date"
                      className="d-flex"
                      min={new Date().toISOString().substring(0, 10)}
                      value={formData.dob}
                      onChange={setField("dob")}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Invalid date of birth!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <FloatingLabel label="Occupation">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Occupation"
                  value={formData.oc}
                  onChange={setField("oc")}
                />
              </FloatingLabel>
            </Form.Group>
            <p className="text-secondary mt-5">Address details</p>
            <Form.Group className="mb-3">
              <FloatingLabel label="Address line 1">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Address line 1"
                  value={formData.address1}
                  onChange={setField("address1")}
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
                  value={formData.address2}
                  onChange={setField("address2")}
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
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Source">
                    <FormSelect
                      value={formData.agent}
                      onChange={setField("source")}
                    >
                      <option value="">Select</option>
                      <option value="1">Direct</option>
                      <option value="2">Agent</option>
                      <option value="3">Website</option>
                      <option value="4">Social Media</option>
                      <option value="5">TV & Newspaper</option>
                      <option value="6">Others</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Agent">
                    <FormSelect
                      value={formData.agent}
                      onChange={setField("agent")}
                    >
                      <option value="">Select</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
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
              New Requirement
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Add Note
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              LEAD
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

export default ContactDetails;
