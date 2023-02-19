import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import "./style.css";

// icons
import { GoSettings } from "react-icons/go";
import { IoPersonSharp } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <p className="text-primary me-auto">Welcome</p>
        <Button variant="outline-primary" className="d-flex my-auto">
          <GoSettings />
        </Button>
        <Button
          className="ms-3 my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/client")}
        >
          <IoPersonSharp className="me-2" />
          Account
        </Button>
      </nav>
      <Row className="w-100">
        <Col
          lg="5"
          className="d-flex align-items-center justify-content-center"
        >
          <img
            src={require("../../assets/svgs/hero.svg").default}
            width="256"
            height="256"
            alt="welcome"
          />
        </Col>
        <Col lg="7" className="d-flex flex-column justify-content-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center border-end px-4 py-1 my-4"
              style={{ maxHeight: "fit-content" }}
            >
              <h1 style={{ fontFamily: "pacifico" }}>108</h1>
              <p className="text-secondary">Properties</p>
            </div>
            <div
              className="d-flex flex-column align-items-center border-end px-4 py-1 my-4"
              style={{ maxHeight: "fit-content" }}
            >
              <h1 style={{ fontFamily: "pacifico" }}>44</h1>
              <p className="text-secondary">Clients</p>
            </div>
            <div
              className="d-flex flex-column align-items-center border-end px-4 py-1 my-4"
              style={{ maxHeight: "fit-content" }}
            >
              <h1 style={{ fontFamily: "pacifico" }}>23</h1>
              <p className="text-secondary">Agents</p>
            </div>
            <div
              className="d-flex flex-column align-items-center px-4 py-1 my-4"
              style={{ maxHeight: "fit-content" }}
            >
              <h1 style={{ fontFamily: "pacifico" }}>7</h1>
              <p className="text-secondary">Companies</p>
            </div>
          </div>
          <p className="fs-5 fw-light text-center w-100 text-black-50 mt-0 pt-0">
            Get a quick look on the record counts
          </p>
        </Col>
      </Row>
    </>
  );
};

export default Home;
