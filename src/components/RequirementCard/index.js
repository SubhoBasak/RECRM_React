import React from "react";
import { Col, FormSelect, ListGroupItem, Row } from "react-bootstrap";

const RequirementCard = ({ data, remove, selected, setSelected }) => {
  return (
    <ListGroupItem>
      <Row>
        <Col lg="1">
          <FormSelect />
        </Col>
        <Col lg="3">{data.title}</Col>
        <Col lg="2">{data.budget}</Col>
        <Col lg="2">{data.area}</Col>
      </Row>
    </ListGroupItem>
  );
};

export default RequirementCard;
