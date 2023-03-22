import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Form,
  Row,
  Button,
  FormSelect,
  FloatingLabel,
  Spinner,
  Container,
} from "react-bootstrap";

// utils
import { categoryCodedText } from "../../utils/codedText";
import { dateDecorator } from "../../utils/decorate";

// icons
import { IoIosSave } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";
import { TbArrowBack } from "react-icons/tb";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

// components
import DeleteModal from "../../components/DeleteModal";
import ConfirmModal from "../../components/ConfirmModal";
import ViewField from "../../components/ViewField";

const Property = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  const [image, setImage] = React.useState("");
  const [formData, setFormData] = React.useState({
    title: state?.title || "",
    details: state?.details || "",
    category: state?.category || "",
    price: state?.price || "",
    area: state?.area || "",
    address1: state?.address1 || "",
    address2: state?.address2 || "",
    city: state?.city || "",
    state: state?.state || "",
    country: state?.country || "",
    zip: state?.zip || "",
    landmark: state?.landmark || "",
  });
  const [timestamps, setTimestamps] = React.useState({
    createdAt: state?.createdAt || "",
    updatedAt: state?.updatedAt || "",
  });
  const [validated, setValidated] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState(id ? true : false);
  const [clearIt, setClearIt] = React.useState(false);
  const [cancelIt, setCancelIt] = React.useState(false);
  const [deleteIt, setDeleteIt] = React.useState(false);

  const setField = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  function clearFormData() {
    setFormData({
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
  }

  function addProperty(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }

    setValidated(false);

    let tmpData = id ? { id } : {};
    for (let k in formData) if (formData[k]) tmpData[k] = formData[k];

    fetch(process.env.REACT_APP_BASE_URL + "/property", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setValidated(false);
          setView(true);
          setTimestamps({ createdAt: new Date() });
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }

  React.useEffect(() => {
    async function getDetails() {
      fetch(
        process.env.REACT_APP_BASE_URL +
          "/property?" +
          new URLSearchParams({ id, details: state?.name ? false : true })
      )
        .then((res) => {
          setLoading(false);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                if (data.details) {
                  setFormData({
                    title: data.details.title || "",
                    details: data.details.details || "",
                    category: data.details.category || "",
                    price: data.details.price || "",
                    area: data.details.area || "",
                    address1: data.details.address1 || "",
                    address2: data.details.address2 || "",
                    city: data.details.city || "",
                    state: data.details.state || "",
                    country: data.details.country || "",
                    zip: data.details.zip || "",
                    landmark: data.details.landmark || "",
                  });
                  setTimestamps({
                    createdAt: data.details.createdAt || "",
                    updatedAt: data.details.updatedAt || "",
                  });
                }
              })
              .catch();
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
        })
        .catch(() => setLoading(false));
    }

    id && getDetails();
  }, [id, state, pathname, navigate]);

  return (
    <>
      <nav>
        <p className="text-primary me-auto">Add new property</p>
        {!view && !id && (
          <Button
            variant="outline-primary"
            className="d-flex my-auto me-3"
            onClick={() => setClearIt(true)}
          >
            <AiOutlineClear />
          </Button>
        )}
        <Button
          className="my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => (id ? navigate("/properties") : setCancelIt(true))}
        >
          <TbArrowBack className="me-2" />
          {id ? "Return" : "Cancel"}
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
                <ViewField label="Title" value={formData.title} />
                <ViewField
                  label="Category"
                  value={categoryCodedText(formData.category)}
                />
                <ViewField label="Price" value={formData.price + "/-"} />
                <ViewField label="Area (sqft)" value={formData.area} />
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
                {timestamps.createdAt && (
                  <>
                    <h5
                      className="mb-3 mt-3 text-primary"
                      style={{ fontFamily: "pacifico" }}
                    >
                      Other info
                    </h5>
                    <hr />
                    <ViewField
                      label="Created at"
                      value={dateDecorator(timestamps.createdAt)}
                    />
                  </>
                )}
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
              onSubmit={addProperty}
              className="p-3 bg-white rounded-3 mb-3"
            >
              <div className="d-flex mb-5">
                <div className="mx-auto upload-image">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : require("../../assets/images/picture.png")
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
                    autoFocus
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
                      Please enter valid area!
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
                  {loading ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                  ) : (
                    <IoIosSave className="me-2" />
                  )}
                  {id ? "Update" : "Add Property"}
                </Button>
              </div>
            </Form>
          )}
        </Col>
        <Col lg="3">
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
              onClick={() => setDeleteIt(true)}
            >
              Delete
            </Button>
          </div>
        </Col>
      </Row>
      <ConfirmModal
        show={clearIt}
        hide={() => setClearIt(false)}
        msg="Do you really want to clear all the fields?"
        yes={() => clearFormData()}
      />
      <ConfirmModal
        show={cancelIt}
        hide={() => setCancelIt(false)}
        msg="Cancelling it may result data loss. Do you really want to proceed?"
        yes={() => {
          clearFormData();
          navigate("/properties");
        }}
      />
      <DeleteModal
        show={deleteIt}
        hide={() => setDeleteIt(false)}
        url="/property"
        body={{ id }}
        msg="Do you really want to delete the property?"
        remove={() => {
          setDeleteIt(false);
          navigate("/properties");
        }}
      />
    </>
  );
};

export default Property;
