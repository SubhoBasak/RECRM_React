import React from "react";
import { Spinner } from "react-bootstrap";
import "./style.css";

const Loading = () => {
  return (
    <div className="d-flex flex-column w-100 justify-content-center align-items-center my-5">
      <Spinner animation="grow" variant="primary" />
      <h3 className="mt-3">Fetching data...</h3>
      <p
        className="text-secondary text-center fw-light"
        style={{ maxWidth: 300 }}
      >
        Keep patient, we are fetching the data from the database.
      </p>
    </div>
  );
};

export default Loading;
