import React from "react";
import { FormCheck, ListGroupItem, Row, Col } from "react-bootstrap";

const LeadCard = ({ data }) => {
  return (
    <ListGroupItem>
      <Row>
        <Col lg="1">
          <FormCheck />
        </Col>
        <Col lg="3">{data.title}</Col>
        <Col lg="2">{data.due_date}</Col>
        <Col lg="2">{data.client.name}</Col>
      </Row>
    </ListGroupItem>
  );
};

export default LeadCard;
