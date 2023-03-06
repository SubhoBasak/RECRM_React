import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Col, Form, Row, Button } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./style.css";

// icons
import { FiUserCheck } from "react-icons/fi";
import { TbArrowBack } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// components
import NoteCard from "../../components/NoteCard";
import NoRecords from "../../components/NoRecords";
import Loading from "../../components/Loading";
import ConnectionLostModal from "../../components/ConnectionLostModal";

const RepresentativeDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = React.useState({
    name: state?.name || "",
    email: state?.email || "",
    phone: state?.phone || "",
    designation: state?.designation || "",
  });
  const [view, setView] = React.useState(id ? true : false);
  const [validated, setValidated] = React.useState(false);
  const [connLost, setConnLost] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function showNotes() {
    if (loading) return <Loading />;
    else if (notes.length === 0)
      return (
        <>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Tagged Notes
          </h1>
          <NoRecords />
        </>
      );
    else
      return (
        <>
          <h1 className="ms-2 mb-3 mt-5" style={{ fontFamily: "pacifico" }}>
            Tagged Notes
          </h1>
          {notes.map((data, i) => (
            <NoteCard
              key={i}
              data={data}
              url="/companyNote"
              remove={() =>
                setNotes(notes.filter((note) => note._id !== data._id))
              }
            />
          ))}
        </>
      );
  }

  function updateRepr(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      e.stopPropagation();
    }
    setValidated(false);

    let tmpData = {};
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/repr", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setConnLost(false);
        setLoading(false);
        if (res.status === 200) {
        }
      })
      .catch(() => {
        setLoading(false);
        setConnLost(true);
      });
    setLoading(true);
  }

  React.useEffect(() => {
    async function getDetails() {
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/repr?" +
          new URLSearchParams({ id, details: state?.name ? false : true })
      )
        .then((res) => {
          setLoading(false);
          setConnLost(false);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                if (data.details) {
                  setFormData({
                    name: data.details.name || "",
                    email: data.details.email || "",
                    phone: data.details.phone || "",
                    designation: data.details.designation || "",
                  });
                }
              })
              .catch();
        })
        .catch(() => {
          setLoading(false);
          setConnLost(true);
        });
      setLoading(true);
    }

    getDetails();
  }, [id, state]);

  return (
    <>
      <nav>
        <p className="text-primary">Company Representative</p>
        <Button
          className="ms-auto my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/company_details/" + state.company)}
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
              Representative Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit representative details
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
            <p className="text-secondary">Notes</p>
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
                <label className="text-secondary">Name</label>
                <p>{formData.name || "-"}</p>
              </Col>
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
              {formData.designation && (
                <Col lg="6">
                  <label className="text-secondary">Designation</label>
                  <p>{formData.designation}</p>
                </Col>
              )}
            </Row>
          ) : (
            <Form
              noValidate
              validated={validated}
              onSubmit={updateRepr}
              className="p-3 bg-white rounded-4 mb-3"
            >
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
                <Form.Group className="mb-3">
                  <FloatingLabel label="Designation">
                    <Form.Control
                      type="text"
                      placeholder="Designation"
                      maxLength="100"
                      value={formData.designation}
                      onChange={setField("designation")}
                    />
                  </FloatingLabel>
                </Form.Group>
              </Row>
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
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Add Client
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              View Clients
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Add Note
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Delete
            </Button>
          </div>
        </Col>
      </Row>
      <ConnectionLostModal show={connLost} />
    </>
  );
};

export default RepresentativeDetails;
