import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { TbArrowBack } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// components
import DeleteModal from "../../components/DeleteModal";
import PropertyCard from "../../components/PropertyCard";
import Loading from "../../components/Loading";
import ConnectionLost from "../../components/ConnectionLost";
import InternalServerError from "../../components/InternalServerError";
import NoRecords from "../../components/NoRecords";

const FolderDetails = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = React.useState({
    title: state?.title || "",
    info: state?.info || "",
  });
  const [view, setView] = React.useState(true);
  const [selected, setSelected] = React.useState([]);
  const [properties, setProperties] = React.useState([]);
  const [validated, setValidated] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const showData = () => {
    if (viewState === VIEWSTATE.loading) return <Loading />;
    else if (viewState === VIEWSTATE.connLost) return <ConnectionLost />;
    else if (viewState === VIEWSTATE.serverError)
      return <InternalServerError />;
    else if (properties.length === 0) return <NoRecords />;
    else
      return (
        <div className="d-flex flex-wrap mb-3">
          {properties.map((data, i) => (
            <PropertyCard
              key={i}
              data={data}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      );
  };

  const updateFolder = (e) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    fetch(process.env.REACT_APP_BASE_URL + "/folder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData }),
    })
      .then((res) => {
        if (res.status === 200) setView(true);
        else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
      })
      .catch();
  };

  React.useState(() => {
    async function getData() {
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/folder?" +
          new URLSearchParams({ id })
      )
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                setFormData({
                  title: data[0].title || "",
                  info: data[0].info || "",
                });
                setProperties(data[1] || []);
              })
              .catch();
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
        })
        .catch();
      setViewState(VIEWSTATE.loading);
    }

    !state?.name && getData();
  });

  return (
    <>
      <nav>
        <p className="text-primary me-auto">Property Folder</p>
        <Button
          className="my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/properties")}
        >
          <TbArrowBack className="me-2" />
          Return
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
              Property Folder
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and manage properties inside folder
            </p>
          </div>
        </Col>
        <Col
          lg="6"
          md="6"
          sm="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="p-2 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {properties.length}
            </h1>
            <p className="text-secondary">Properties</p>
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
                    <Col lg="12">
                      <label className="text-secondary">Title</label>
                      <p>{formData.title}</p>
                    </Col>
                    <Col lg="12">
                      <label className="text-secondary">Info</label>
                      <p>{formData.info}</p>
                    </Col>
                  </Row>
                </Container>
              ) : (
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={updateFolder}
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
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Info">
                      <Form.Control
                        maxLength="500"
                        as={"textarea"}
                        placeholder="Info"
                        className="form-control bg-light"
                        value={formData.info}
                        onChange={setField("info")}
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
                      Update
                    </Button>
                  </div>
                </Form>
              )}
            </>
          )}
          <h1 className="ms-2 mb-5 mt-5" style={{ fontFamily: "pacifico" }}>
            Properties
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
                >
                  Delete Contacts
                </Button>
              </div>
            </div>
          )}
          {showData()}
        </Col>
        <Col
          lg="3"
          className="order-1 d-flex flex-column align-items-center order-lg-2"
        >
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
              className="w-100 btn-sm mt-3 w-75 shadow"
              onClick={() => navigate("/property", { state: { folder: id } })}
            >
              New Property
            </Button>
            <Button
              variant="primary"
              className="w-100 btn-sm mt-3 w-75 shadow"
              onClick={() => setViewState(VIEWSTATE.delete)}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        msg="Do you really want to delete this folder with all the properties in here?"
        body={{ id }}
        url="/folder"
        remove={() => navigate("/properties")}
      />
    </>
  );
};

export default FolderDetails;
