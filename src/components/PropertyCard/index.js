import React from "react";
import { Card, Alert } from "react-bootstrap";
import "./style.css";

const PropertyCard = () => {
  return (
    <Card className="mt-4 ms-4 border-0" style={{ width: "260px" }}>
      <Card.Img
        variant="top"
        src="https://picsum.photos/512"
        width="240"
        height="90"
        alt="property"
        style={{
          minHeight: "90px",
          maxHeight: "90px",
          minWidth: "100%",
          maxWidth: "100%",
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <Card.Title className="text-center">Card Title</Card.Title>
        <Alert
          variant="warning"
          className="p-0 px-2 mx-auto"
          style={{ fontSize: "12px", maxWidth: "fit-content" }}
        >
          Residential
        </Alert>
        <div className="d-flex justify-content-between">
          <p className="text-primary">15,000,000/-</p>
          <p className="text-secondary" style={{ fontSize: "12px" }}>
            15000 sqft
          </p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold d-flex flex-column align-items-center p-2 me-2 border-end">
            25
            <span
              className="fw-light text-black-50"
              style={{ fontSize: "10px" }}
            >
              Looking
            </span>
          </p>
          <p className="fw-light mb-auto" style={{ fontSize: "12px" }}>
            Some quick example text to quick example text to
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
