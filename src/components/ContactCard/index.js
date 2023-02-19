import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheck,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import "./style.css";

// icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdViewHeadline, MdHistory } from "react-icons/md";

const ContactCard = ({ data, selected, setSelected }) => {
  function roleClass(r) {
    switch (r) {
      case "company":
        return "success";
      case "agent":
        return "warning";
      default:
        return "primary";
    }
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

  return (
    <ListGroupItem className="person-card bg-white py-3" draggable>
      <Row>
        <Col lg="1" className="d-flex align-items-center">
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
        <Col className="d-flex align-items-center">
          <p className="fs-6 my-0 d-block text-turncate">{data.name}</p>
        </Col>
        <Col lg="1" className="d-flex align-items-center">
          <Alert variant={roleClass(data.role)} className="p-0 px-2 m-0">
            {data.role}
          </Alert>
        </Col>
        <Col className="d-flex align-items-center">
          <p className="text-grey my-0 fw-light text-turncate">
            {data.address1}
          </p>
        </Col>
        <Col className="d-flex align-items-center">
          <a
            {...(data.email ? { href: `mailto:${data.email}` } : {})}
            className="fw-light text-turncate"
          >
            {data.email || "Email not present"}
          </a>
        </Col>
        <Col className="d-flex align-items-center">
          <a
            {...(data.phone ? { href: `tel:${data.phone}` } : {})}
            className="fw-light text-turncate"
          >
            {data.phone || "Number not present"}
          </a>
        </Col>
        <Col lg="1" className="d-flex justify-content-end">
          <ButtonGroup className="mb-auto">
            <Button
              variant="outline-secondary"
              className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
            >
              <MdViewHeadline />
            </Button>
            <Button
              variant="outline-secondary"
              className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
            >
              <MdHistory />
            </Button>
            <Button
              variant="outline-secondary"
              className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
            >
              <AiOutlineDelete />
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default ContactCard;
