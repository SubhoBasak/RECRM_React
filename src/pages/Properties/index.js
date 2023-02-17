import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, Row, Col, InputGroup } from "react-bootstrap";
import "./style.css";

// icons
import { ImSearch } from "react-icons/im";
import { MdAdd } from "react-icons/md";
import { GoSettings } from "react-icons/go";
import PropertyCard from "../../components/PropertyCard";
import ProjectCard from "../../components/ProjectCard";

const Properties = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav>
        <InputGroup className="w-25 me-auto my-auto rounded-0 border-bottom">
          <InputGroup.Text className="bg-transparent border-0">
            <ImSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search properties..."
            type="text"
            maxLength="100"
            className="bg-light shadow-none border-0"
          />
        </InputGroup>
        <Button variant="outline-primary" className="d-flex my-auto">
          <GoSettings />
        </Button>
        <Button
          variant="outline-primary"
          className="ms-3 my-auto d-flex align-items-center btn-sm"
          onClick={() => navigate("/project")}
        >
          <MdAdd className="me-1" />
          Project
        </Button>
        <Button
          className="ms-3 my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/property")}
        >
          <MdAdd className="me-1" />
          Property
        </Button>
      </nav>
      <Row className="w-100">
        <Col lg="6" md="6" sm="12" className="d-flex align-items-center my-5">
          <img
            src={require("../../assets/svgs/properties.svg").default}
            alt="people"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              Properties
            </h1>
            <p className="text-secondary fw-light mb-0">
              Manage all properties
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
            <p className="text-secondary">Projects</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              75
            </h1>
            <p className="text-secondary">Properties</p>
          </div>
        </Col>
      </Row>
      <div className="d-flex flex-wrap w-100 p-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        {[1, 2, 3, 4, 5].map((i) => (
          <PropertyCard key={i} />
        ))}
      </div>
    </>
  );
};

export default Properties;
