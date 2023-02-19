import React from "react";
import { Card } from "react-bootstrap";
import "./style.css";

const FolderCard = () => {
  return (
    <Card className="mt-4 ms-4 border-0" style={{ width: "260px" }} draggable>
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
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="text-center">Card Title</Card.Title>
        <div className="d-flex justify-content-between">
          <div
            className="my-2 py-2 d-flex flex-column justify-content-center align-items-center border-end"
            style={{ width: "33%" }}
          >
            <p className="text-primary fw-bold mb-0">128</p>
            <span className="text-black-50" style={{ fontSize: "10px" }}>
              Residential
            </span>
          </div>
          <div
            className="my-2 py-2 d-flex flex-column justify-content-center align-items-center border-end"
            style={{ width: "33%" }}
          >
            <p className="text-primary fw-bold mb-0">32</p>
            <span className="text-black-50" style={{ fontSize: "10px" }}>
              Commercial
            </span>
          </div>
          <div
            className="my-2 py-2 d-flex flex-column justify-content-center align-items-center"
            style={{ width: "33%" }}
          >
            <p className="text-primary fw-bold mb-0">17</p>
            <span className="text-black-50" style={{ fontSize: "10px" }}>
              Institutional
            </span>
          </div>
        </div>
        <p className="fw-light" style={{ fontSize: "12px" }}>
          Some quick example text to quick example text to
        </p>
      </Card.Body>
    </Card>
  );
};

export default FolderCard;
