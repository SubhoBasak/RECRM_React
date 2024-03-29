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
  Container,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { TbArrowBack } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// components
import Loading from "../../components/Loading";
import NoRecords from "../../components/NoRecords";
import ViewField from "../../components/ViewField";
import DeleteModal from "../../components/DeleteModal";
import ConnectionLost from "../../components/ConnectionLost";
import LeadCompanyCard from "../../components/LeadCompanyCard";
import LeadCompanyModal from "../../components/LeadCompanyModal";
import InternalServerError from "../../components/InternalServerError";
import Deleted from "../../components/Deleted";

const RequirementCompany = () => {
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
  const [company, setCompany] = React.useState({
    id: state?.company?._id || "",
    name: state?.company?.name || "",
    email: state?.company?.email || "",
    phone: state?.company?.phone || "",
    address1: state?.company?.address1 || "",
    address2: state?.company?.address2 || "",
    city: state?.company?.city || "",
    state: state?.company?.state || "",
    country: state?.company?.country || "",
    zip: state?.company?.zip || "",
    landmark: state?.company?.landmark || "",
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

    fetch(process.env.REACT_APP_BASE_URL + "/rqmnCompany", {
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
    else if (viewState === VIEWSTATE.serverError)
      return <InternalServerError />;
    else if (leads.length === 0)
      return (
        <>
          <h1 className="ms-2 mb-4 mt-5" style={{ fontFamily: "pacifico" }}>
            Call history
          </h1>
          <NoRecords />
        </>
      );
    else
      return (
        <>
          <h1 className="ms-2 mb-4 mt-5" style={{ fontFamily: "pacifico" }}>
            Call history
          </h1>
          <Row className="d-none d-lg-flex px-1 text-black-50 fw-bold">
            <Col lg="4">Title</Col>
            <Col lg="2">Medium</Col>
            <Col lg="2">Due date</Col>
            <Col lg="2">Attempt date</Col>
            <Col lg="2" />
          </Row>
          <ListGroup variant="flush" className="rounded-3 mb-5">
            {leads.map((data, i) => (
              <LeadCompanyCard
                data={data}
                key={i}
                remove={() =>
                  setLeads(leads.filter((lead) => lead._id !== data._id))
                }
              />
            ))}
          </ListGroup>
        </>
      );
  }

  React.useState(() => {
    async function getData() {
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/rqmnCompany?" +
          new URLSearchParams({ id, details: state?.title ? false : true })
      )
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res.json().then((data) => {
              if (data.details) {
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

                setCompany({
                  id: data.details.company._id || "",
                  name: data.details.company.name || "",
                  email: data.details.company.email || "",
                  phone: data.details.company.phone || "",
                  address1: data.details.company.address1 || "",
                  address2: data.details.company.address2 || "",
                  city: data.details.company.city || "",
                  state: data.details.company.state || "",
                  country: data.details.company.country || "",
                  zip: data.details.company.zip || "",
                  landmark: data.details.company.landmark || "",
                });

                setHistory(data.details.history || []);
              }

              setStages(data.stages || []);
              setLeads(data.leads || []);
            });
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
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
      <div className="d-none d-md-flex w-100 m-0 p-0 align-items-center my-5">
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
      </div>
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
                {formData.occupation && (
                  <Col lg="6">
                    <label className="text-secondary">Occupation</label>
                    <p>{formData.occupation}</p>
                  </Col>
                )}
                <h5
                  className="mb-3 mt-3 text-primary"
                  style={{ fontFamily: "pacifico" }}
                >
                  Location info
                </h5>
                <hr />
                {formData.city && (
                  <Col lg="6">
                    <label className="text-secondary">City</label>
                    <p>{formData.city}</p>
                  </Col>
                )}
                {formData.state && (
                  <Col lg="6">
                    <label className="text-secondary">State</label>
                    <p>{formData.state}</p>
                  </Col>
                )}
                {formData.country && (
                  <Col lg="6">
                    <label className="text-secondary">Country</label>
                    <p>{formData.country}</p>
                  </Col>
                )}
                {formData.zip && (
                  <Col lg="6">
                    <label className="text-secondary">Zip code</label>
                    <p>{formData.zip}</p>
                  </Col>
                )}
                {formData.landmark && (
                  <Col lg="6">
                    <label className="text-secondary">Landmark</label>
                    <p>{formData.landmark}</p>
                  </Col>
                )}
                {formData.agent && (
                  <Col lg="6">
                    <label className="text-secondary">Agent</label>
                    <p>{formData.agent}</p>
                  </Col>
                )}
                {timestamps.createdAt && (
                  <Col lg="6">
                    <label className="text-secondary">Created at</label>
                    <p>
                      {new Date(timestamps.createdAt).toLocaleDateString(
                        "default",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </Col>
                )}
                {timestamps.updatedAt && (
                  <Col lg="6">
                    <label className="text-secondary">Last modified</label>
                    <p>
                      {new Date(timestamps.updatedAt).toLocaleDateString(
                        "default",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </Col>
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
                <Col lg="6">
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Stage">
                      <FormSelect
                        value={formData.category}
                        onChange={setField("category")}
                      >
                        <option value="">Select stage</option>
                        {stages.map((stage, i) => (
                          <option key={i}>{stage}</option>
                        ))}
                      </FormSelect>
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
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
          <Container>
            <Row className="p-3 bg-white rounded-3 mb-3">
              {!company.id ? (
                <Deleted msg="The company is deleted from the contact list!" />
              ) : (
                <>
                  <h5
                    className="mb-3 text-primary"
                    style={{ fontFamily: "pacifico" }}
                  >
                    Company info
                  </h5>
                  <ViewField label="Name" value={company.name} />
                  {company.email && (
                    <Col lg="6">
                      <label className="text-secondary">Email</label>
                      <p>{company.email}</p>
                    </Col>
                  )}
                  {company.phone && (
                    <Col lg="6">
                      <label className="text-secondary">Phone</label>
                      <p>{company.phone}</p>
                    </Col>
                  )}
                  <ViewField label="Industry" value={company.industry} />
                  <h5
                    className="mb-3 mt-3 text-primary"
                    style={{ fontFamily: "pacifico" }}
                  >
                    Address info
                  </h5>
                  <hr />
                  <ViewField label="Address 1" value={company.address1} />
                  <ViewField label="Address 2" value={company.address2} />
                  <ViewField label="City" value={company.city} />
                  <ViewField label="State" value={company.state} />
                  <ViewField label="Country" value={company.country} />
                  <ViewField label="Zip" value={company.zip} />
                  <ViewField label="Landmark" value={company.landmark} />
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="outline-primary"
                      className="btn-sm"
                      onClick={() => navigate("/company_details/" + company.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </>
              )}
            </Row>
          </Container>
          {showData()}
        </Col>
        <Col
          lg="3"
          className="order-1 order-lg-2 d-flex flex-column align-items-center"
        >
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
      <LeadCompanyModal
        show={newLeadModal}
        hide={() => setNewLeadModal(false)}
        requirement={id}
        add={(data) => setLeads([data, ...leads])}
      />
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/rqmnCompany"
        body={{ id }}
        msg="Do you really want to delete this reqirement?"
        remove={() => navigate("/leads")}
      />
    </>
  );
};

export default RequirementCompany;
