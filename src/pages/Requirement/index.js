import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  FormSelect,
  ListGroup,
  Alert,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";
import { genderCodedText } from "../../utils/codedText";
import { dateDecorator } from "../../utils/decorate";

// icons
import { TbArrowBack } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// components
import Loading from "../../components/Loading";
import NoRecords from "../../components/NoRecords";
import DeleteModal from "../../components/DeleteModal";
import ConnectionLost from "../../components/ConnectionLost";
import LeadCard from "../../components/LeadCard";
import LeadModal from "../../components/LeadModal";
import ViewField from "../../components/ViewField";

const Requirement = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = React.useState({
    title: state?.title || "",
    budget: state?.budget || "",
    area: state?.area || "",
    city: state?.city || "",
    state: state?.state || "",
    stage: state?.stage || "",
    category: state?.category || "",
    locationDetails: state?.locationDetails || "",
    otherDetails: state?.otherDetails || "",
  });
  const [client, setClient] = React.useState({
    id: state?.client._id || "",
    name: state?.client.name || "",
    email: state?.client.email || "",
    phone: state?.client.phone || "",
    address1: state?.client.address1 || "",
    address2: state?.client.address2 || "",
    city: state?.client.city || "",
    state: state?.client.state || "",
    country: state?.client.country || "",
    zip: state?.client.zip || "",
    landmark: state?.client.landmark || "",
  });
  const [timestamps, setTimestamps] = React.useState({
    createdAt: state?.createdAt || "",
    updatedAt: state?.updatedAt || "",
  });
  const [newLeadModal, setNewLeadModal] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [stages, setStages] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  const [leads, setLeads] = React.useState([]);
  const [view, setView] = React.useState(true);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }

    setValidated(false);

    let tmpData = { id };
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/rqmn", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        if (res.status === 200) {
          setView(true);
          setTimestamps({
            createdAt: timestamps.createdAt,
            updatedAt: new Date(),
          });
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
      })
      .catch();
  }

  function showData() {
    if (viewState === VIEWSTATE.loading) return <Loading />;
    else if (viewState === VIEWSTATE.connLost) return <ConnectionLost />;
    else if (leads.length === 0) return <NoRecords />;
    else
      return (
        <>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Contact history
          </h1>
          <ListGroup variant="flush" className="rounded-4 m-1 w-100 mb-5">
            {leads.map((data, i) => (
              <LeadCard data={data} key={i} />
            ))}
          </ListGroup>
        </>
      );
  }

  React.useState(() => {
    async function getData() {
      fetch(
        process.env.REACT_APP_BASE_URL + "/rqmn?" + new URLSearchParams({ id })
      )
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                setFormData({
                  title: data.details.title || "",
                  budget: data.details.budget || "",
                  area: data.details.area || "",
                  city: data.details.city || "",
                  state: data.details.state || "",
                  stage: data.details.stage || "",
                  category: data.details.category || "",
                  locationDetails: data.details.locationDetails || "",
                  otherDetails: data.details.otherDetails || "",
                });
                setClient({
                  id: data.details.client._id,
                  name: data.details.client.name,
                  email: data.details.client.email || "",
                  phone: data.details.client.phone || "",
                  address1: data.details.client.address1,
                  address2: data.details.client.address2 || "",
                  city: data.details.client.city || "",
                  state: data.details.client.state || "",
                  country: data.details.client.country || "",
                  zip: data.details.client.zip || "",
                  landmark: data.details.client.landmark || "",
                });
                setStages(data.stages || []);
                setHistory(data.details.history || []);
                setLeads(data.leads || []);
              })
              .catch();
        })
        .catch(() => setViewState(VIEWSTATE.connLost));

      setViewState(VIEWSTATE.loading);
    }

    getData();
  }, []);

  return (
    <>
      <nav>
        <p className="text-primary me-auto">Requirement</p>
        <Button
          className="my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/leads")}
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
              Requirement Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit requirement details
            </p>
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
            <Row className="w-100 m-1 p-3 bg-white rounded-4 mb-3">
              <Col lg="6">
                <label className="text-secondary">Title</label>
                <p>{formData.title || "-"}</p>
              </Col>
              {formData.budget && (
                <Col lg="6">
                  <label className="text-secondary">Budget</label>
                  <p>{formData.budget}</p>
                </Col>
              )}
              {formData.area && (
                <Col lg="6">
                  <label className="text-secondary">Area</label>
                  <p>{formData.area}</p>
                </Col>
              )}
              {(formData.city ||
                formData.state ||
                formData.country ||
                formData.zip) && (
                <>
                  <h5
                    className="mb-3 mt-3 text-primary"
                    style={{ fontFamily: "pacifico" }}
                  >
                    Location info
                  </h5>
                  <hr />
                </>
              )}
              <ViewField label="City" value={formData.city} />
              <ViewField label="State" value={formData.state} />
              <ViewField label="Country" value={formData.country} />
              <ViewField label="Zip code" value={formData.zip} />
            </Row>
          ) : (
            <Form
              noValidate
              validated={validated}
              onSubmit={formSubmitHandler}
              className="p-3 bg-white rounded-4 mb-3"
            >
              <Form.Group className="mb-3">
                <FloatingLabel label="Title">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    maxLength="100"
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
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Budget" className="mb-3">
                      <Form.Control
                        type="number"
                        min={0}
                        placeholder="Budget"
                        value={formData.budget}
                        onChange={setField("budget")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid budget!
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Area (sqft)">
                      <Form.Control
                        type="number"
                        min={0}
                        placeholder="Area (sqft)"
                        value={formData.area}
                        onChange={setField("area")}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid area!
                      </Form.Control.Feedback>
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
                        <option value="3">Other</option>
                      </FormSelect>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <FloatingLabel label="Occupation">
                  <Form.Control
                    type="text"
                    maxLength="100"
                    placeholder="Occupation"
                    value={formData.occupation}
                    onChange={setField("occupation")}
                  />
                </FloatingLabel>
              </Form.Group>
              <p className="text-secondary mt-5">Address details</p>
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
              </Row>
              <Form.Group className="mb-3">
                <FloatingLabel label="Location details">
                  <Form.Control
                    maxLength="500"
                    as={"textarea"}
                    placeholder="Location details"
                    className="form-control bg-light"
                    value={formData.locationDetails}
                    onChange={setField("locationDetails")}
                    style={{ height: "12rem" }}
                  />
                </FloatingLabel>
              </Form.Group>
              <p className="text-secondary mt-5">Other details</p>
              <Form.Group className="mb-3">
                <FloatingLabel label="Other details">
                  <Form.Control
                    maxLength="500"
                    as={"textarea"}
                    placeholder="Other details"
                    className="form-control bg-light"
                    value={formData.otherDetails}
                    onChange={setField("otherDetails")}
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
                  Update Now
                </Button>
              </div>
            </Form>
          )}
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Client details
          </h1>
          <Row className="w-100 m-1 p-3 bg-white rounded-4 mb-3">
            <h5
              className="mb-3 text-primary"
              style={{ fontFamily: "pacifico" }}
            >
              Personal info
            </h5>
            <ViewField label="Name" value={formData.name} />
            {client.email && (
              <Col lg="6">
                <label className="text-secondary">Email</label>
                <p>{client.email}</p>
              </Col>
            )}
            {client.phone && (
              <Col lg="6">
                <label className="text-secondary">Phone</label>
                <p>{client.phone}</p>
              </Col>
            )}
            <ViewField
              label="Gender"
              value={formData.gender ? genderCodedText(formData.gender) : ""}
            />
            <ViewField
              label="Date of birth"
              value={dateDecorator(formData.dob)}
            />
            {client.occupation && (
              <Col lg="6">
                <label className="text-secondary">Occupation</label>
                <p>{client.occupation}</p>
              </Col>
            )}
            <h5
              className="mb-3 mt-3 text-primary"
              style={{ fontFamily: "pacifico" }}
            >
              Address info
            </h5>
            <hr />
            <ViewField label="Address 1" value={client.address1} />
            <ViewField label="Address 2" value={client.address2} />
            <ViewField label="City" value={client.city} />
            <ViewField label="State" value={client.state} />
            <ViewField label="Country" value={client.country} />
            <ViewField label="Zip" value={client.zip} />
            <ViewField label="Landmark" value={client.landmark} />
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-primary"
                className="btn-sm"
                onClick={() => navigate("/client_details/" + client.id)}
              >
                View Details
              </Button>
            </div>
          </Row>
          {showData()}
        </Col>
        <Col lg="3" className="order-1 order-lg-2">
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
            onClick={() => setNewLeadModal(true)}
          >
            New Call
          </Button>
          <Button
            variant="primary"
            className="btn-sm mt-3 w-75 shadow"
            onClick={() => setViewState(VIEWSTATE.delete)}
          >
            Delete
          </Button>
          {history.map((stage, i) => (
            <Alert key={i} variant="">
              {stage.stage}
            </Alert>
          ))}
        </Col>
      </Row>
      <LeadModal
        show={newLeadModal}
        hide={() => setNewLeadModal(false)}
        requirement={id}
      />
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/rqmn"
        body={{ id }}
        msg="Do you really want to delete this reqirement?"
        remove={() => navigate("/leads")}
      />
    </>
  );
};

export default Requirement;
