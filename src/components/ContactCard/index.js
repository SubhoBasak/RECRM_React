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

const PersonCard = (props) => {
  return (
    <ListGroupItem className="person-card bg-white py-3">
      <Row>
        <Col lg="1" className="d-flex align-items-center">
          <FormCheck className="ms-1" />
        </Col>
        <Col className="d-flex align-items-center">
          <p className="fs-6 my-0">Person fullname</p>
        </Col>
        <Col lg="1" className="d-flex align-items-center">
          <Alert
            variant={props.role === "agent" ? "warning" : "primary"}
            className="p-0 px-2 m-0"
          >
            {props.role}
          </Alert>
        </Col>
        <Col className="d-flex align-items-center">
          <p className="text-grey my-0 fw-light">Person address</p>
        </Col>
        <Col className="d-flex align-items-center">
          <a href="mailto:customer@email.com" className="fw-light">
            person@email.com
          </a>
        </Col>
        <Col className="d-flex align-items-center">
          <a href="tel:9876543210" className="fw-light">
            +91 9876543210
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

export default PersonCard;
