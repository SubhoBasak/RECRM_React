import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Button,
  FormSelect,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import "./style.css";

// icons
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";

const Property = () => {
  const [image, setImage] = React.useState("");
  const [formData, setFormData] = React.useState({
    title: "",
    location: "",
    details: "",
    category: "",
    price: "",
    project: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [clrModal, setClrModal] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);

  const navigate = useNavigate();

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const addProperty = (e) => {
    e.preventDefault();
    setValidated(true);
    !e.currentTarget.checkValidity() && e.stopPropagation();
  };

  return (
    <>
      <nav>
        <p className="text-primary">Add new property</p>
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
            alt="property"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              Property Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit property details
            </p>
          </div>
        </Col>
        <Col
          lg="6"
          md="6"
          sm="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              75
            </h1>
            <p className="text-secondary">Looking</p>
          </div>
        </Col>
      </Row>
      <Row className="w-100 m-0 p-0">
        <Col lg="9">
          <Form
            noValidate
            validated={validated}
            onSubmit={addProperty}
            className="p-3 bg-white rounded mb-3"
          >
            <div className="d-flex mb-5">
              <div className="mx-auto upload-image">
                <img
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : "https://picsum.photos/512"
                  }
                  alt="property"
                  width="150"
                  height="150"
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                />
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <Form.Group className="mb-3">
              <FloatingLabel label="Title">
                <Form.Control
                  type="text"
                  maxLength="100"
                  placeholder="Title"
                  value={formData.title}
                  onChange={setField("title")}
                  required
                />
              </FloatingLabel>
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Category">
                    <FormSelect
                      value={formData.category}
                      onChange={setField("category")}
                      required
                    >
                      <option value="" disabled>
                        Select category
                      </option>
                      <option value="1">Residential</option>
                      <option value="2">Commercial</option>
                      <option value="3">Others</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Project">
                    <FormSelect
                      value={formData.project}
                      placeholder="Project"
                      onChange={setField("project")}
                    >
                      <option value="">Select project</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <FloatingLabel label="Location">
                <Form.Control
                  maxLength="500"
                  as={"textarea"}
                  placeholder="Location"
                  className="form-control bg-light"
                  value={formData.location}
                  onChange={setField("location")}
                  style={{ height: "12rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Details">
                <Form.Control
                  maxLength="500"
                  as={"textarea"}
                  placeholder="Details"
                  className="form-control bg-light"
                  value={formData.details}
                  onChange={setField("details")}
                  style={{ height: "12rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex my-2">
              <Button
                type="submit"
                variant="primary"
                className="mx-auto btn-sm"
              >
                <FiUserCheck className="me-2" />
                Add Property
              </Button>
            </div>
          </Form>
        </Col>
        <Col lg="3"></Col>
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
              navigate("/properties");
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

export default Property;
