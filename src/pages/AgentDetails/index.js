import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Form, Row, Button, FormSelect, Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// utils
import { VIEWSTATE } from "../../utils/constants";
import { genderCodedText } from "../../utils/codedText";
import { dateDecorator } from "../../utils/decorate";

// icons
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// components
import Loading from "../../components/Loading";
import NoteCard from "../../components/NoteCard";
import NoteModal from "../../components/NoteModal";
import NoRecords from "../../components/NoRecords";
import ViewField from "../../components/ViewField";
import DeleteModal from "../../components/DeleteModal";
import ConfirmModal from "../../components/ConfirmModal";
import ClientsModal from "../../components/ClientsModal";
import ConnectionLostModal from "../../components/ConnectionLostModal";
import InternalServerErrorModal from "../../components/InternalServerErrorModal";

const AgentDetails = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = React.useState({
    name: state?.name || "",
    email: state?.email || "",
    phone: state?.phone || "",
    dob: state?.dob || "",
    gender: state?.gender || "",
    address1: state?.address1 || "",
    address2: state?.address2 || "",
    city: state?.city || "",
    state: state?.state || "",
    country: state?.country || "",
    zip: state?.zip || "",
    landmark: state?.landmark || "",
    deals: state?.deals || "",
  });
  const [timestamps, setTimestamps] = React.useState({
    createdAt: state?.createdAt || "",
    updatedAt: state?.updatedAt || "",
  });
  const [view, setView] = React.useState(id ? true : false);
  const [validated, setValidated] = React.useState(false);
  const [noteModal, setNoteModal] = React.useState(false);
  const [clientModal, setClientModal] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [notes, setNotes] = React.useState([]);
  const [clients, setClients] = React.useState([]);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function clearFormData() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      landmark: "",
      deals: "",
    });
  }

  function formBlank() {
    for (let key in formData) if (formData[key] !== "") return false;
    return true;
  }

  function returnHandler() {
    if (id) {
      if (state)
        for (let key in formData)
          if (state[key] && formData[key] !== state[key])
            return setViewState(VIEWSTATE.cancel);
    } else {
      for (let key in formData)
        if (formData[key] !== "") return setViewState(VIEWSTATE.cancel);
    }

    navigate("/all_contacts");
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

    fetch(process.env.REACT_APP_BASE_URL + "/agent", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) navigate("/all_contacts");
        else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
  }

  function showNotes() {
    if (!id) return;
    else if (viewState === VIEWSTATE.loading) return <Loading />;
    else if (notes.length === 0)
      return (
        <>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Notes
          </h1>
          <NoRecords />
        </>
      );
    else
      return (
        <>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Notes
          </h1>
          {notes.map((data, i) => (
            <NoteCard
              key={i}
              data={data}
              url="/agent/note"
              remove={() =>
                setNotes(notes.filter((note) => note._id !== data._id))
              }
            />
          ))}
        </>
      );
  }

  React.useEffect(() => {
    async function getDetails() {
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/agent?" +
          new URLSearchParams({ id, details: state?.name ? false : true })
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
                    dob: data.details.dob || "",
                    gender: data.details.gender || "",
                    address1: data.details.address1 || "",
                    address2: data.details.address2 || "",
                    city: data.details.city || "",
                    state: data.details.state || "",
                    country: data.details.country || "",
                    zip: data.details.zip || "",
                    landmark: data.details.landmark || "",
                    deals: data.details.deals || "",
                  });
                  setTimestamps({
                    createdAt: data.details.createdAt || "",
                    updatedAt: data.details.updatedAt || "",
                  });
                }

                setNotes(data.notes || []);
                setClients(data.clients || []);
              })
              .catch();
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
          else if (res.status === 500) setViewState(VIEWSTATE.serverError);
        })
        .catch(() => {
          setViewState(VIEWSTATE.connLost);
        });
      setViewState(VIEWSTATE.loading);
    }

    id && getDetails();
  }, [id, state, pathname, navigate]);

  return (
    <>
      <nav>
        <p className="text-primary me-auto">Agent contact</p>
        {!view && !formBlank() && !id && (
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
          onClick={returnHandler}
        >
          <TbArrowBack className="me-2" />
          {id ? "Return" : "Cancel"}
        </Button>
      </nav>
      <Row className="w-100 d-none d-md-flex">
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
              Agent Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit agent details
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
              {clients.length}
            </h1>
            <p className="text-secondary">Clients</p>
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
          {(state?.name || viewState !== VIEWSTATE.loading) && (
            <>
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
                      Personal info
                    </h5>
                    <ViewField label="Name" value={formData.name} />
                    {formData.email && (
                      <Col lg="6" className="d-flex flex-column">
                        <label className="text-secondary">Email</label>
                        <a href={"mailto:" + formData.email}>
                          {formData.email}
                        </a>
                      </Col>
                    )}
                    {formData.phone && (
                      <Col lg="6" className="d-flex flex-column">
                        <label className="text-secondary">Phone</label>
                        <a href={"tel:" + formData.phone}>{formData.phone}</a>
                      </Col>
                    )}
                    <ViewField
                      label="Gender"
                      value={
                        formData.gender ? genderCodedText(formData.gender) : ""
                      }
                    />
                    <ViewField
                      label="Date of Birth"
                      value={dateDecorator(formData.dob)}
                    />
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
                    {(formData.deals || timestamps.createdAt) && (
                      <>
                        <h5
                          className="mb-3 mt-3 text-primary"
                          style={{ fontFamily: "pacifico" }}
                        >
                          Others info
                        </h5>
                        <hr />
                        {formData.deals && (
                          <Col lg="12">
                            <label className="text-secondary">Deals in</label>
                            <p>{formData.deals}</p>
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
                      </>
                    )}
                  </Row>
                </Container>
              ) : (
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={formSubmitHandler}
                  className="p-3 bg-white rounded-3 mb-3"
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
                            required
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
                        <FloatingLabel label="Gender">
                          <FormSelect
                            value={formData.gender}
                            onChange={setField("gender")}
                          >
                            <option value="">Select gender</option>
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
                            value={formData.dob}
                            onChange={setField("dob")}
                          />
                          <Form.Control.Feedback type="invalid">
                            Invalid date of birth!
                          </Form.Control.Feedback>
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
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Deals in">
                      <Form.Control
                        maxLength="500"
                        as={"textarea"}
                        placeholder="Deals in"
                        className="form-control bg-light"
                        value={formData.deals}
                        onChange={setField("deals")}
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
                      {state?.name ? "Update" : "Add Now"}
                    </Button>
                  </div>
                </Form>
              )}
            </>
          )}
          {showNotes()}
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
            {id ? (
              <>
                <Button
                  variant="primary"
                  className="btn-sm mt-3 w-75 shadow"
                  onClick={() =>
                    navigate("/client_details", { state: { agentId: id } })
                  }
                >
                  Add Client
                </Button>
                <Button
                  variant="primary"
                  className="btn-sm mt-3 w-75 shadow"
                  onClick={() => setClientModal(true)}
                >
                  View Clients
                </Button>
                <Button
                  variant="primary"
                  className="btn-sm mt-3 w-75 shadow"
                  onClick={() => setNoteModal(true)}
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
              </>
            ) : (
              <p className="fs-4 text-primary mt-4">Add new agent</p>
            )}
          </div>
        </Col>
      </Row>
      <ClientsModal
        show={clientModal}
        hide={() => setClientModal(false)}
        clients={clients}
      />
      <ConnectionLostModal
        show={viewState === VIEWSTATE.connLost}
        hide={() => setViewState(VIEWSTATE.none)}
      />
      <NoteModal
        agent={id}
        show={noteModal}
        hide={() => setNoteModal(false)}
        add={(data) => setNotes([data, ...notes])}
        url="/agent/note"
      />
      <ConfirmModal
        show={viewState === VIEWSTATE.clear || viewState === VIEWSTATE.cancel}
        hide={() => setViewState(VIEWSTATE.none)}
        msg={
          viewState === VIEWSTATE.clear
            ? "Do you really want to clear all the fields?"
            : "Cancelling it may result data loss. Do you really want to proceed?"
        }
        yes={
          viewState === VIEWSTATE.clear
            ? () => clearFormData()
            : () => {
                clearFormData();
                navigate("/all_contacts");
              }
        }
      />
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/agent"
        body={{ id }}
        msg="Do you really want to delete the agent?"
        remove={() => {
          setViewState(VIEWSTATE.none);
          navigate("/all_contacts");
        }}
      />
      <InternalServerErrorModal
        show={viewState === VIEWSTATE.serverError}
        hide={() => setViewState(VIEWSTATE.none)}
      />
    </>
  );
};

export default AgentDetails;
