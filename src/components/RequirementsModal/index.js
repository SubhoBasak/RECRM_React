import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  FormSelect,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import NoRecords from "../NoRecords";

// icons
import { MdDeleteSweep } from "react-icons/md";

// components
import ConfirmModal from "../ConfirmModal";
import RequirementCard from "../RequirementCard";

const RequirementsModal = ({ show, hide, rqmns, setRqmns, client }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [validated, setValidated] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [addNew, setAddNew] = React.useState(false);
  const [deleteIt, setDeleteIt] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    budget: "",
    area: "",
    city: "",
    state: "",
    category: "",
    locationDetails: "",
    otherDetails: "",
  });

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function saveNow(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }

    setValidated(false);

    let tmpData = { client };
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/rqmn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        if (res.status === 200)
          res.json().then((data) => navigate("/requirement/" + data._id));
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
      })
      .catch();
  }

  function delRqmns() {
    fetch(process.env.REACT_APP_BASE_URL + "/rqmn", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        selected.length === 1 ? { id: selected[0] } : { ids: selected }
      ),
    })
      .then((res) => {
        if (res.status === 200)
          setRqmns(
            rqmns.filter((rqmn) => {
              for (let sel in selected)
                if (rqmn._id === selected[sel]) return false;
              return true;
            })
          );
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
      })
      .catch();
  }

  function showData() {
    if (rqmns.length === 0) return <NoRecords />;

    return (
      <>
        {selected.length > 0 && (
          <div className="w-100 px-3 d-flex align-items-center justify-content-between">
            <p className="m-2 fs-6 fw-bold">{selected.length} selected</p>
            <div className="d-flex">
              <Button
                variant="outline-primary"
                className="btn-sm my-auto"
                onClick={() => setSelected([])}
              >
                Unselect all
              </Button>
              <Button
                variant="primary"
                className="ms-2 my-auto btn-sm d-flex align-items-center shadow"
                onClick={() => setDeleteIt(true)}
              >
                <MdDeleteSweep className="me-2" />
                Delete Contacts
              </Button>
            </div>
          </div>
        )}
        <Row className="w-100 fw-bold text-black-50 mt-3">
          <Col lg="1" />
          <Col lg="4">Title</Col>
          <Col lg="2">Category</Col>
          <Col lg="2">Budget</Col>
          <Col lg="2">Area (sqft)</Col>
          <Col lg="1" />
        </Row>
        <ListGroup variant="flush">
          {rqmns.map((data, i) => (
            <RequirementCard
              key={i}
              url="/rqmn"
              data={data}
              selected={selected}
              setSelected={setSelected}
              remove={() =>
                setRqmns(rqmns.filter((rqmn) => data._id !== rqmn._id))
              }
            />
          ))}
        </ListGroup>
      </>
    );
  }

  function showForm() {
    return (
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
            <br /> Requirement
          </h6>
        </Col>
        <Col lg="9">
          <h4 className="w-100 text-center mb-0">Add New Requirement</h4>
          <Form
            className="p-3"
            validated={validated}
            onSubmit={saveNow}
            noValidate
          >
            <Form.Group>
              <FloatingLabel label="Title">
                <Form.Control
                  type="text"
                  maxLength={100}
                  placeholder="Title"
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
              <Col lg="6">
                <Form.Group>
                  <FloatingLabel label="Budget">
                    <Form.Control
                      type="number"
                      min={0}
                      step={1}
                      placeholder="Budget"
                      value={formData.budget}
                      onChange={setField("budget")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group>
                  <FloatingLabel label="Area (sqft)">
                    <Form.Control
                      type="number"
                      min={0}
                      step={1}
                      placeholder="Area (sqft)"
                      value={formData.area}
                      onChange={setField("area")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3">
                  <FloatingLabel label="Category">
                    <FormSelect
                      value={formData.category}
                      onChange={setField("category")}
                    >
                      <option value="">Select category</option>
                      <option value="1">Residential</option>
                      <option value="2">Commercial</option>
                      <option value="3">Others</option>
                    </FormSelect>
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <p className="text-secondary mt-4 mb-3">Location details</p>
            <Row>
              <Col lg="6">
                <Form.Group>
                  <FloatingLabel label="City">
                    <Form.Control
                      type="text"
                      maxLength={100}
                      placeholder="City"
                      value={formData.city}
                      onChange={setField("city")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group>
                  <FloatingLabel label="State">
                    <Form.Control
                      type="text"
                      maxLength={100}
                      placeholder="State"
                      value={formData.state}
                      onChange={setField("state")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mt-3">
              <FloatingLabel label="Location details">
                <Form.Control
                  type="text"
                  as="textarea"
                  className="bg-light"
                  maxLength={500}
                  value={formData.locationDetails}
                  placeholder="Location details"
                  onChange={setField("locationDetails")}
                  style={{ minHeight: "8rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <p className="text-secondary my-3">Other details</p>
            <Form.Group>
              <FloatingLabel label="Info">
                <Form.Control
                  type="text"
                  as="textarea"
                  className="bg-light"
                  maxLength={500}
                  value={formData.otherDetails}
                  placeholder="Info"
                  onChange={setField("otherDetails")}
                  style={{ minHeight: "8rem" }}
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex w-100 justify-content-center my-3">
              <Button type="submit" variant="primary" className="btn-sm shadow">
                Add Now
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Modal
        className={addNew ? "modal-xl" : "modal-lg"}
        show={show}
        onHide={hide}
      >
        <Modal.Header>
          <Modal.Title
            className="text-primary"
            style={{ fontFamily: "pacifico" }}
          >
            Requirements
          </Modal.Title>
          {addNew ? (
            <Button
              className="ms-auto btn-sm"
              variant="outline-primary"
              onClick={() => setAddNew(false)}
            >
              Cancel
            </Button>
          ) : (
            <>
              <Button
                className="ms-auto btn-sm"
                variant="outline-primary"
                onClick={hide}
              >
                Close
              </Button>
              <Button
                className="ms-2 btn-sm shadow"
                variant="primary"
                onClick={() => setAddNew(true)}
              >
                Add New
              </Button>
            </>
          )}
        </Modal.Header>
        <Modal.Body>{addNew ? showForm() : showData()}</Modal.Body>
      </Modal>
      <ConfirmModal
        show={deleteIt}
        hide={() => setDeleteIt(false)}
        msg="Do you really want to delete these contacts?"
        yes={delRqmns}
      />
    </>
  );
};

export default RequirementsModal;
