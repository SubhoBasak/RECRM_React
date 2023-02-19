import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Dropdown,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./style.css";

// icons
import { ImSearch } from "react-icons/im";
import { IoPersonAddSharp } from "react-icons/io5";
import { GoSettings } from "react-icons/go";

// components
import ContactCard from "../../components/ContactCard";

const AllContacts = () => {
  return (
    <>
      <nav>
        <InputGroup className="w-25 me-auto my-auto rounded-0 border-bottom">
          <InputGroup.Text className="bg-transparent border-0">
            <ImSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search contacts..."
            type="text"
            maxLength="100"
            className="bg-light shadow-none border-0"
          />
        </InputGroup>
        <Button variant="outline-primary" className="d-flex my-auto">
          <GoSettings />
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            className="btn-sm ms-3 shadow"
            id="dropdown-basic"
          >
            <IoPersonAddSharp className="me-2" />
            Add New Contact
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link className="dropdown-item" to="/client_details">
              Client
            </Link>
            <Link className="dropdown-item" to="/company_details">
              Company
            </Link>
            <Dropdown.Divider />
            <Link className="dropdown-item" to="/agent_details">
              Agent
            </Link>
          </Dropdown.Menu>
        </Dropdown>
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
              Contacts
            </h1>
            <p className="text-secondary fw-light mb-0">Manage all contacts</p>
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
            <p className="text-secondary">Clients</p>
          </div>
          <div className="p-3 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              32
            </h1>
            <p className="text-secondary">Companies</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              75
            </h1>
            <p className="text-secondary">Agents</p>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          margin: "20px",
          marginTop: "40px",
          width: "calc(100% - 40px)",
        }}
      >
        <Col lg="1" />
        <Col className="fw-bold">Name</Col>
        <Col lg="1" className="fw-bold">
          Role
        </Col>
        <Col className="fw-bold">Address</Col>
        <Col className="fw-bold">Email</Col>
        <Col className="fw-bold">Phone</Col>
        <Col lg="1" />
      </Row>
      <ListGroup
        variant="flush"
        className="rounded-4 mt-1"
        style={{ margin: "20px", width: "calc(100% - 40px)" }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
          <ContactCard key={i} role={i % 2 ? "agent" : "client"} />
        ))}
      </ListGroup>
    </>
  );
};

export default AllContacts;
