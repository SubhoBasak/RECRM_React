import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Button,
  ListGroup,
  FloatingLabel,
  FormSelect,
  Container,
} from "react-bootstrap";

// utils
import { sourceCodedText } from "../../utils/codedText";
import { VIEWSTATE } from "../../utils/constants";
import { dateDecorator } from "../../utils/decorate";

// icons
import { FiUserCheck } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { MdDeleteSweep } from "react-icons/md";
import { AiOutlineClear } from "react-icons/ai";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

// components
import Loading from "../../components/Loading";
import NoRecords from "../../components/NoRecords";
import ViewField from "../../components/ViewField";
import DeleteModal from "../../components/DeleteModal";
import ConfirmModal from "../../components/ConfirmModal";
import CompanyNoteCard from "../../components/CompanyNoteCard";
import CompanyNoteModal from "../../components/CompanyNoteModal";
import RepresentativeCard from "../../components/RepresentativeCard";
import ConnectionLostModal from "../../components/ConnectionLostModal";
import RepresentativeModal from "../../components/RepresentativeModal";
import RequirementsCompanyModal from "../../components/RequirementsCompanyModal";
import InternalServerErrorModal from "../../components/InternalServerErrorModal";

const CompanyDetails = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = React.useState({
    name: state?.name || "",
    email: state?.email || "",
    phone: state?.phone || "",
    industry: state?.industry || "",
    address1: state?.address1 || "",
    address2: state?.address2 || "",
    city: state?.city || "",
    state: state?.state || "",
    country: state?.country || "",
    zip: state?.zip || "",
    landmark: state?.landmark || "",
    source: state?.source || "",
    agent: state?.agent || "",
    about: state?.about || "",
  });
  const [timestamps, setTimestamps] = React.useState({
    createdAt: state?.createdAt || "",
    updatedAt: state?.updatedAt || "",
  });
  const [validated, setValidated] = React.useState(false);
  const [reprModal, setReprModal] = React.useState(false);
  const [editRepr, setEditRepr] = React.useState({});
  const [view, setView] = React.useState(id ? true : false);
  const [notes, setNotes] = React.useState([]);
  const [reprs, setReprs] = React.useState([]);
  const [rqmns, setRqmns] = React.useState([]);
  const [agents, setAgents] = React.useState([]);
  const [deleteSelected, setDeleteSelected] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [addNote, setAddNote] = React.useState(false);
  const [rqmnModal, setRqmnModal] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function clearFormData() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      industry: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      landmark: "",
      source: "",
      agent: "",
      about: "",
    });
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }

    setValidated(false);

    let tmpData = {};
    id && (tmpData.id = id);
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/company", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        if (res.status === 200) {
          setView(true);
          setTimestamps(
            id
              ? { createdAt: timestamps.createdAt, updatedAt: new Date() }
              : { createdAt: new Date() }
          );
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
  }

  function showData() {
    if (!id) return;
    else if (viewState === VIEWSTATE.loading) return <Loading />;

    return (
      <>
        <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
          Representatives
        </h1>
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
                onClick={() => setDeleteSelected(true)}
              >
                <MdDeleteSweep className="me-2 d-none d-md-block" />
                Delete
              </Button>
            </div>
          </div>
        )}
        {reprs.length === 0 ? (
          <NoRecords />
        ) : (
          <>
            <Row className="text-black-50">
              <Col lg="1" />
              <Col className="fw-bold mb-1 mt-3 d-none d-lg-block">Name</Col>
              <Col className="fw-bold mb-1 mt-3 d-none d-lg-block">
                Designation
              </Col>
              <Col className="fw-bold mb-1 mt-3 d-none d-lg-block">Email</Col>
              <Col className="fw-bold mb-1 mt-3 d-none d-lg-block">Phone</Col>
              <Col lg="1" />
            </Row>
            <ListGroup variant="flush" className="rounded-3 mt-1">
              {reprs.map((data, i) => (
                <RepresentativeCard
                  key={i}
                  data={data}
                  selected={selected}
                  setSelected={setSelected}
                  edit={() =>
                    navigate("/representative/" + data._id, {
                      state: { ...data, company: id },
                    })
                  }
                  remove={() =>
                    setReprs(reprs.filter((repr) => repr._id !== data._id))
                  }
                />
              ))}
            </ListGroup>
          </>
        )}
        <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
          Notes
        </h1>
        {notes.length === 0 ? (
          <NoRecords />
        ) : (
          <ListGroup variant="flush" className="rounded-3 mt-1">
            {notes.map((data, i) => (
              <CompanyNoteCard
                data={data}
                key={i}
                remove={() =>
                  setNotes(notes.filter((note) => note._id !== data._id))
                }
              />
            ))}
          </ListGroup>
        )}
      </>
    );
  }

  function delSelected() {
    fetch(process.env.REACT_APP_BASE_URL + "/repr", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        selected.length === 1 ? { id: selected[0] } : { ids: selected }
      ),
    })
      .then((res) => {
        if (res.status === 200) {
          if (selected.length === 1)
            setReprs(reprs.filter((repr) => repr._id !== selected[0]));
          else
            setReprs(
              reprs.filter((repr) => {
                for (let sel in selected)
                  if (selected[sel] === repr._id) return false;
                return true;
              })
            );
          setSelected([]);
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
      })
      .catch();
  }

  React.useEffect(() => {
    async function getDetails() {
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/company?" +
          new URLSearchParams({
            id,
            details: state?.name ? false : true,
          })
      )
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                if (data.details) {
                  setFormData({
                    name: data.details.name || "",
                    email: data.details.email || "",
                    phone: data.details.phone || "",
                    industry: data.details.industry || "",
                    address1: data.details.address1 || "",
                    address2: data.details.address2 || "",
                    city: data.details.city || "",
                    state: data.details.state || "",
                    country: data.details.country || "",
                    zip: data.details.zip || "",
                    landmark: data.details.landmark || "",
                    source: data.details.source || "",
                    agent: data.details.agent || "",
                    about: data.details.about || "",
                  });
                  setTimestamps({
                    createdAt: data.details.createdAt || "",
                    updatedAt: data.details.updatedAt || "",
                  });
                }
                setNotes(data.notes || []);
                setReprs(data.reprs || []);
                setRqmns(data.rqmns || []);
                setAgents(data.agents || []);
              })
              .catch();
          else if (res.status === 500) setViewState(VIEWSTATE.serverError);
        })
        .catch(() => setViewState(VIEWSTATE.none));
      setViewState(VIEWSTATE.loading);
    }

    id && getDetails();
  }, [id, state]);

  return (
    <>
      <nav>
        <p className="text-primary me-auto">Add new contact</p>
        {!view && !id && (
          <Button
            variant="outline-primary"
            className="d-flex my-auto me-3"
            onClick={() => setViewState(VIEWSTATE.clear)}
          >
            <AiOutlineClear />
          </Button>
        )}
        <Button
          className="my-auto d-flex align-items-center btn-sm shadow"
          onClick={() =>
            id ? navigate("/all_contacts") : setViewState(VIEWSTATE.cancel)
          }
        >
          <TbArrowBack className="me-2" />
          {id ? "Return" : "Cancel"}
        </Button>
      </nav>
      <Row className="w-100 m-0 p-0 d-none d-md-flex">
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
          className="d-flex flex-wrap justify-content-center align-items-center"
        >
          <div className="p-2 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {reprs.length}
            </h1>
            <p className="text-secondary">Representatives</p>
          </div>
          <div className="p-3 px-4 d-flex border-end flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {rqmns.length}
            </h1>
            <p className="text-secondary">Requirements</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {notes.length}
            </h1>
            <p className="text-secondary">Notes</p>
          </div>
        </Col>
      </Row>
      <Row className="w-100 m-0 p-0">
        <Col lg="9" className="order-2 order-lg-1">
          <div className="d-flex align-items-center justify-content-end">
            <p className="my-0 me-2 text-black-50" style={{ fontSize: 14 }}>
              View
            </p>
            <button
              onClick={() => setView(!view)}
              className="fs-4 bg-transparent border-0"
            >
              {view ? (
                <BsToggleOff className="text-black-50" />
              ) : (
                <BsToggleOn className="text-primary" />
              )}
            </button>
            <p className="my-0 mx-2 text-black-50" style={{ fontSize: 14 }}>
              Edit
            </p>
          </div>
          {view ? (
            <Container>
              <Row className="p-3 bg-white rounded-3 mb-3">
                <h5
                  className="mb-3 text-primary"
                  style={{ fontFamily: "pacifico" }}
                >
                  Company info
                </h5>
                <ViewField label="Name" value={formData.name} />
                {formData.email && (
                  <Col lg="6">
                    <label className="text-secondary">Email</label>
                    <p>{formData.email}</p>
                  </Col>
                )}
                {formData.phone && (
                  <Col lg="6">
                    <label className="text-secondary">Phone</label>
                    <p>{formData.phone}</p>
                  </Col>
                )}
                <ViewField label="Industry" value={formData.industry} />
                <h5
                  className="mb-3 mt-3 text-primary"
                  style={{ fontFamily: "pacifico" }}
                >
                  Address info
                </h5>
                <hr />
                <ViewField label="Address 1" value={formData.address1} />
                <ViewField label="Address 2" value={formData.address2} />
                <ViewField label="City" value={formData.city} />
                <ViewField label="State" value={formData.state} />
                <ViewField label="Country" value={formData.country} />
                <ViewField label="Zip" value={formData.zip} />
                <ViewField label="Landmark" value={formData.landmark} />
                {(formData.source || timestamps.createdAt) && (
                  <>
                    <h5
                      className="mb-3 mt-3 text-primary"
                      style={{ fontFamily: "pacifico" }}
                    >
                      Other info
                    </h5>
                    <hr />
                  </>
                )}
                <ViewField
                  label="Source"
                  value={
                    formData.source ? sourceCodedText(formData.source) : ""
                  }
                />
                {formData.agent && (
                  <Col lg="6">
                    <label className="text-secondary">Agent</label>
                    <p>{formData.agent}</p>
                  </Col>
                )}
                {formData.about && (
                  <Col lg="12">
                    <label className="text-secondary">About</label>
                    <p>{formData.about}</p>
                  </Col>
                )}
                <ViewField
                  label="Created at"
                  value={dateDecorator(timestamps.createdAt)}
                />
                <ViewField
                  label="Last modified"
                  value={dateDecorator(timestamps.updatedAt)}
                />
              </Row>
            </Container>
          ) : (
            <Form
              noValidate
              validated={validated}
              onSubmit={formSubmitHandler}
              className="p-3 bg-white rounded-3 mb-3"
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
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Email" className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={setField("email")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email address!
                      </Form.Control.Feedback>
                    </FloatingLabel>
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
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid phone number!
                      </Form.Control.Feedback>
                    </FloatingLabel>
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
                    value={formData.address1}
                    onChange={setField("address1")}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    This field is required!
                  </Form.Control.Feedback>
                </FloatingLabel>
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
                  <Form.Control.Feedback type="invalid">
                    This field is required!
                  </Form.Control.Feedback>
                </FloatingLabel>
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
                        value={formData.source}
                        onChange={setField("source")}
                      >
                        <option value="">Select source</option>
                        <option value="1">Direct</option>
                        <option value="2" disabled={agents.length === 0}>
                          Agent
                        </option>
                        <option value="3">Website</option>
                        <option value="4">Social Media</option>
                        <option value="5">TV & Newspaper</option>
                        <option value="6">Others</option>
                      </FormSelect>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                {Number.parseInt(formData.source) === 2 && (
                  <Col lg="6">
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Agent">
                        <FormSelect
                          value={formData.agent}
                          onChange={setField("agent")}
                        >
                          <option value="">Select agent</option>
                          {agents.map((data, i) => (
                            <option key={i} value={data._id}>
                              {data.name +
                                " | " +
                                data.email +
                                " | " +
                                data.address1}
                            </option>
                          ))}
                        </FormSelect>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                )}
              </Row>
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
                  {id ? "Update" : "Add Now"}
                </Button>
              </div>
            </Form>
          )}
          {showData()}
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
            <Button
              variant="primary"
              className="btn-sm mt-3 w-75 shadow"
              onClick={() => setRqmnModal(true)}
            >
              Requirements
            </Button>
            <Button
              variant="primary"
              className="btn-sm mt-3 w-75 shadow"
              onClick={() => setReprModal(true)}
            >
              Add Representative
            </Button>
            <Button
              variant="primary"
              className="btn-sm mt-3 w-75 shadow"
              onClick={() => setAddNote(true)}
            >
              Add Note
            </Button>
            <Button
              variant="primary"
              className="btn-sm mt-3 w-75 shadow"
              onClick={() => setViewState(VIEWSTATE.delete)}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
      <ConfirmModal
        show={viewState === VIEWSTATE.clear}
        hide={() => setViewState(VIEWSTATE.none)}
        msg="Do you really want to clear all the fields?"
        yes={() => clearFormData()}
      />
      <ConfirmModal
        show={viewState === VIEWSTATE.cancel}
        hide={() => setViewState(VIEWSTATE.none)}
        msg="Cancelling it may result data loss. Do you really want to proceed?"
        yes={() => {
          clearFormData();
          navigate("/all_contacts");
        }}
      />
      <ConfirmModal
        show={deleteSelected}
        hide={() => setDeleteSelected(false)}
        msg="Do you really want to delete the selected contacts?"
        yes={delSelected}
      />
      <RepresentativeModal
        show={reprModal}
        hide={() => {
          setReprModal(false);
          setEditRepr({});
        }}
        add={(data) => setReprs([data, ...reprs])}
        data={editRepr}
        company={id}
      />
      <ConnectionLostModal
        show={viewState === VIEWSTATE.connLost}
        hide={() => setViewState(VIEWSTATE.none)}
      />
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/company"
        body={{ id }}
        msg="Do you really want to delete this company?"
        remove={() => {
          setViewState(VIEWSTATE.none);
          navigate("/all_contacts");
        }}
      />
      <CompanyNoteModal
        show={addNote}
        hide={() => setAddNote(false)}
        company={id}
        reprs={reprs}
        add={(data) => setNotes([data, ...notes])}
      />
      <RequirementsCompanyModal
        show={rqmnModal}
        hide={() => setRqmnModal(false)}
        rqmns={rqmns}
        setRqmns={setRqmns}
        reprs={reprs}
        company={id}
      />
      <InternalServerErrorModal
        show={viewState === VIEWSTATE.serverError}
        hide={() => setViewState(VIEWSTATE.none)}
      />
    </>
  );
};

export default CompanyDetails;
