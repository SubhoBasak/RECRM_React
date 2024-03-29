import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Alert,
  Dropdown,
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

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { MdDeleteSweep } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";

// components
import DeleteModal from "../DeleteModal";
import RequirementCard from "../RequirementCard";
import ConnectionLostModal from "../ConnectionLostModal";
import InternalServerErrorModal from "../InternalServerErrorModal";

const RequirementsCompanyModal = ({
  show,
  hide,
  rqmns,
  reprs,
  setRqmns,
  company,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [validated, setValidated] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [addNew, setAddNew] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [tagged, setTagged] = React.useState([]);
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

    let tmpData = { company };
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/rqmnCompany", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200)
          res.json().then((data) => {
            delete tmpData.company;
            setRqmns([{ _id: data.id, ...tmpData }, ...rqmns]);
            setAddNew(false);
            setFormData({
              title: "",
              budget: "",
              area: "",
              city: "",
              state: "",
              locationDetails: "",
              otherDetails: "",
            });
          });
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
    setViewState(VIEWSTATE.loading);
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
                onClick={() => setViewState(VIEWSTATE.delete)}
              >
                <MdDeleteSweep className="me-2 d-none d-md-block" />
                Delete
              </Button>
            </div>
          </div>
        )}
        <Row className="w-100 fw-bold text-black-50 mt-3">
          <Col lg="1" />
          <Col lg="3" className="d-none d-lg-block">
            Title
          </Col>
          <Col lg="3" className="d-none d-lg-block">
            Category
          </Col>
          <Col lg="2" className="d-none d-lg-block">
            Budget
          </Col>
          <Col lg="2" className="d-none d-lg-block">
            Area (sqft)
          </Col>
          <Col lg="1" />
        </Row>
        <ListGroup variant="flush">
          {rqmns.map((data, i) => (
            <RequirementCard
              key={i}
              url="/rqmnCompany"
              details="/companyRequirement/"
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
          <label className="text-black-50 mb-3">
            <FiUserPlus className="me-2" />
            Tag representatives
          </label>
          <div className="d-flex flex-wrap">
            {tagged.map((repr, i) => (
              <Alert
                key={i}
                variant="warning py-0 px-2 ms-1 d-flex align-items-center"
                style={{ maxHeight: "fit-content" }}
              >
                {repr.name}
                <IoCloseSharp
                  onClick={() =>
                    setTagged(tagged.filter((tmp) => tmp.id !== repr.id))
                  }
                />
              </Alert>
            ))}
          </div>
          <Dropdown autoClose="outside" className="mb-3">
            <Dropdown.Toggle className="btn-sm">
              Select Representatives
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {reprs.length === tagged.length ? (
                <Dropdown.Item className="text-black-50">
                  All Selected
                </Dropdown.Item>
              ) : (
                reprs.map((repr, i) => {
                  if (tagged.findIndex((tmp) => tmp.id === repr._id) === -1)
                    return (
                      <Dropdown.Item
                        key={i}
                        onClick={() =>
                          setTagged([
                            { id: repr._id, name: repr.name },
                            ...tagged,
                          ])
                        }
                      >
                        {repr.name}
                      </Dropdown.Item>
                    );
                  return <></>;
                })
              )}
            </Dropdown.Menu>
          </Dropdown>
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
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        msg="Do you really want to delete these contacts?"
        url="/rqmnCompany"
        body={selected.length === 1 ? { id: selected[0] } : { ids: selected }}
        remove={() => {
          setRqmns(
            rqmns.filter((rqmn) => {
              for (let sel in selected)
                if (rqmn._id === selected[sel]) return false;
              return true;
            })
          );
          setViewState(VIEWSTATE.none);
        }}
      />
      <ConnectionLostModal
        show={viewState === VIEWSTATE.connLost}
        hide={() => setViewState(VIEWSTATE.none)}
      />
      <InternalServerErrorModal
        show={viewState === VIEWSTATE.serverError}
        hide={() => setViewState(VIEWSTATE.none)}
      />
    </>
  );
};

export default RequirementsCompanyModal;
