import React from "react";
import { Col } from "react-bootstrap";

const ViewField = ({ label, value }) => {
  if (value)
    return (
      <Col lg="6">
        <label className="text-secondary">{label}</label>
        <p>{value}</p>
      </Col>
    );
  return <></>;
};

export default ViewField;
