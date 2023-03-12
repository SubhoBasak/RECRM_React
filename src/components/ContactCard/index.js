import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheck,
  ListGroupItem,
  Row,
  Modal,
  Spinner,
} from "react-bootstrap";
import "./style.css";

// icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdViewHeadline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ data, selected, setSelected }) => {
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function roleClass() {
    switch (data.role) {
      case "company":
        return "success";
      case "agent":
        return "warning";
      default:
        return "primary";
    }
  }

  function showDetails() {
    let loc = "/client_details";
    if (data.role === "company") loc = "/company_details";
    else if (data.role === "agent") loc = "/agent_details";
    loc += "/" + data._id;
    navigate(loc, { state: data });
  }

  function selectContact() {
    let indx = selected.findIndex(
      (cnt) => cnt.id === data._id && cnt.role === data.role
    );

    if (indx > -1)
      setSelected(
        selected.filter(
          (cnt) => !(cnt.id === data._id && cnt.role === data.role)
        )
      );
    else setSelected([...selected, { id: data._id, role: data.role }]);
  }

  function delContact() {
    fetch(process.env.REACT_APP_BASE_URL + "/" + data.role, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: data._id }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) setDeleteModal(false);
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }

  return (
    <>
      <ListGroupItem className="person-card bg-white py-3" draggable>
        <Row>
          <Col lg="1">
            <FormCheck
              checked={
                selected.findIndex(
                  (cnt) => cnt.id === data._id && cnt.role === data.role
                ) > -1
              }
              className="ms-1"
              onChange={selectContact}
            />
          </Col>
          <Col lg="3" className="fs-6 text-turncate" onClick={showDetails}>
            {data.name}
          </Col>
          <Col lg="1">
            <Alert
              variant={roleClass()}
              className="p-0 px-2 m-0"
              onClick={showDetails}
              style={{ maxWidth: "fit-content" }}
            >
              {data.role}
            </Alert>
          </Col>
          <Col
            lg="2"
            className="text-grey fw-light text-turncate"
            onClick={showDetails}
          >
            {data.address1}
          </Col>
          <Col lg="2">
            <a
              {...(data.email ? { href: `mailto:${data.email}` } : {})}
              className="fw-light text-break"
            >
              {data.email || "Email not present"}
            </a>
          </Col>
          <Col lg="2">
            <a
              {...(data.phone ? { href: `tel:${data.phone}` } : {})}
              className="fw-light text-turncate"
            >
              {data.phone || "Number not present"}
            </a>
          </Col>
          <Col lg="1">
            <ButtonGroup className="mb-auto">
              <Button
                variant="outline-secondary"
                className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
                onClick={showDetails}
              >
                <MdViewHeadline />
              </Button>
              <Button
                onClick={() => setDeleteModal(true)}
                variant="outline-secondary"
                className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
              >
                <AiOutlineDelete />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ListGroupItem>
      <Modal
        backdrop="static"
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
        className="modal-sm"
        centered
      >
        <Modal.Header>
          <Modal.Title style={{ fontFamily: "pacifico" }}>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex py-0 flex-column align-items-center">
          <img
            src={require("../../assets/svgs/warn.svg").default}
            width={128}
            height={128}
            alt="warn"
          />
          <p className="w-75 text-center">
            Do you really want to delete the contact?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            className="btn-sm me-1"
            onClick={() => setDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn-sm shadow"
            onClick={delContact}
          >
            {loading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
            )}
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactCard;
