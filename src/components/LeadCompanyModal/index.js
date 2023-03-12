import React from "react";
import {
  Col,
  Row,
  Form,
  Modal,
  FormSelect,
  FloatingLabel,
  Button,
  Spinner,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

const LeadModal = ({ show, hide, requirement }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    medium: "",
    due_date: "",
    attempt_date: "",
    comment: "",
  });
  const [validated, setValidated] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function addLeadCall(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }

    setValidated(false);

    let tmpData = { requirement };
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/leadCompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) {
          hide();
        }
      })
      .catch(() => setViewState(VIEWSTATE.none));
    setViewState(VIEWSTATE.loading);
  }

  return (
    <Modal className="modal-xl" show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>New call</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col
            lg="3"
            className="d-flex flex-column justify-content-center align-items-center border-end"
          >
            <img
              src={require("../../assets/svgs/add.svg").default}
              width={128}
              height={128}
              alt="add"
            />
            <h6 className="text-center w-75 mx-auto text-black-50">
              Add New
              <br />
              Call
            </h6>
          </Col>
          <Col lg="9">
            <Form onSubmit={addLeadCall} validated={validated} noValidate>
              <Form.Group className="mb-3">
                <FloatingLabel label="Title">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    maxLength={100}
                    value={formData.title}
                    onChange={setField("title")}
                    autoFocus
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              <Row>
                <Col lg="4">
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Category">
                      <FormSelect
                        value={formData.medium}
                        onChange={setField("medium")}
                        required
                      >
                        <option value="" disabled>
                          Select medium
                        </option>
                        <option value="1">Voice call</option>
                        <option value="2">SMS</option>
                        <option value="3">Email</option>
                        <option value="4">WhatsApp</option>
                        <option value="5">Facebook</option>
                        <option value="6">Instagram</option>
                        <option value="7">LinkedIn</option>
                        <option value="8">Other</option>
                      </FormSelect>
                      <Form.Control.Feedback type="invalid">
                        This field is required!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col lg="4">
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Due date" className="mb-3">
                      <Form.Control
                        type="date"
                        placeholder="Due date"
                        value={formData.due_date}
                        onChange={setField("due_date")}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        This field is required!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col lg="4">
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Attempt">
                      <Form.Control
                        type="date"
                        placeholder="Attempt"
                        value={formData.attempt_date}
                        onChange={setField("attempt_date")}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <FloatingLabel label="Comment">
                  <Form.Control
                    maxLength="1000"
                    as={"textarea"}
                    placeholder="Comment"
                    className="form-control bg-light"
                    value={formData.comment}
                    onChange={setField("comment")}
                    style={{ height: "12rem" }}
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="btn-sm shadow my-3"
                >
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
                  Add Now
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LeadModal;
