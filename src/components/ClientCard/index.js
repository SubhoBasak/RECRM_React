import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, ListGroupItem, Row } from "react-bootstrap";

const ClientCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <ListGroupItem>
      <Row>
        <Col lg="3">{data.name}</Col>
        <Col lg="2">
          {data.email ? (
            <a href={"mailto:" + data.email}>{data.email}</a>
          ) : (
            "Not mentioned"
          )}
        </Col>
        <Col lg="2">
          {data.phone ? (
            <a href={"tel:" + data.phone}>{data.phone}</a>
          ) : (
            "Not mentioned"
          )}
        </Col>
        <Col lg="3">{data.address1}</Col>
        <Col lg="1">
          <Button
            variant="primary"
            className="btn-sm shadow"
            onClick={() =>
              navigate("/client_details/" + data._id, { state: data })
            }
          >
            View Details
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default ClientCard;
