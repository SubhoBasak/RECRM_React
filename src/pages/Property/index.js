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
    details: "",
    category: "",
    price: "",
    area: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    landmark: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [clrModal, setClrModal] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);

  const navigate = useNavigate();

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const addProperty = (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      e.stopPropagation();
    }

    let tmpData = {};
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/property", {
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
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Price" className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      min={0}
                      onChange={setField("price")}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid price!
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Area (sqft)">
                    <Form.Control
                      type="number"
                      min={0}
                      placeholder="Area"
                      value={formData.area}
                      onChange={setField("area")}
                    />
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid area!
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
            <p className="text-secondary mt-5">Location</p>
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
