import React from "react";
import {
  Alert,
  Row,
  Col,
  ListGroupItem,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// icons
import { RiBuilding2Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

const LeadRequirementCard = ({ data }) => {
  const navigate = useNavigate();

  function getCategory() {
    switch (Number.parseInt(data.category)) {
      case 1:
        return (
          <Alert
            className="px-2 py-0 my-auto"
            variant="primary"
            style={{ maxWidth: "fit-content", fontSize: 12 }}
          >
            Residential
          </Alert>
        );
      case 2:
        return (
          <Alert
            className="px-2 py-0 my-auto"
            variant="success"
            style={{ maxWidth: "fit-content", fontSize: 12 }}
          >
            Commercial
          </Alert>
        );
      case 3:
        return (
          <Alert
            className="px-2 py-0 my-auto"
            variant="warning"
            style={{ maxWidth: "fit-content", fontSize: 12 }}
          >
            Other
          </Alert>
        );
      default:
        return (
          <Alert
            className="px-2 py-0 my-auto"
            variant="secondary"
            style={{ maxWidth: "fit-content", fontSize: 12 }}
          >
            -
          </Alert>
        );
    }
  }

  function getStage() {
    if (data.finally === 1)
      return (
        <Alert
          className="p-0 px-2 my-auto"
          style={{ fontSize: 12 }}
          variant="danger"
        >
          Canceled
        </Alert>
      );
    else if (data.finally === 2)
      return (
        <Alert
          className="p-0 px-2 my-auto"
          style={{ fontSize: 12 }}
          variant="success"
        >
          Completed
        </Alert>
      );
    else if (data.stage)
      return (
        <Alert
          className="p-0 px-2 my-auto"
          style={{ fontSize: 12 }}
          variant="primary"
        >
          {data.stage.name}
        </Alert>
      );
    else
      return (
        <Alert
          className="p-0 px-2 my-auto"
          style={{ fontSize: 12 }}
          variant="warning"
        >
          Initiated
        </Alert>
      );
  }

  function showDetails() {
    navigate(
      (data.client ? "/requirement/" : "/companyRequirement/") + data._id,
      { state: data }
    );
  }

  return (
    <ListGroupItem className="py-3">
      <Row>
        <Col className="d-flex align-items-center" lg={2}>
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={
              <Popover id="popover-basic">
                <Popover.Header as="h3" className="fw-light">
                  Quick view
                </Popover.Header>
                <Popover.Body className="p-2 d-flex flex-column">
                  {data.client ? (
                    <>
                      <p className="mb-1 fs-5">{data.client.name}</p>
                      {data.client.phone && (
                        <a href={"tel:" + data.client.phone}>
                          {data.client.phone}
                        </a>
                      )}
                      {data.client.email && (
                        <a href={"mailto:" + data.client.email}>
                          {data.client.email}
                        </a>
                      )}
                      <p className="mb-1 text-black-50">
                        {data.client.address1}
                      </p>
                      <Link
                        to={"/client_details/" + data.client._id}
                        className="mt-3 mx-auto btn btn-primary btn-sm shadow"
                      >
                        View details
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="mb-1 fs-5">{data.company.name}</p>
                      {data.company.phone && (
                        <a href={"tel:" + data.company.phone}>
                          {data.company.phone}
                        </a>
                      )}
                      {data.company.email && (
                        <a href={"mailto:" + data.company.email}>
                          {data.company.email}
                        </a>
                      )}
                      <p className="mb-1 text-black-50">
                        {data.company.address1}
                      </p>
                      <Link
                        to={"/company_details/" + data.company._id}
                        className="mt-3 mx-auto btn btn-primary btn-sm shadow"
                      >
                        View details
                      </Link>
                    </>
                  )}
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="outline-primary" className="p-0 border-0">
              {data.client ? (
                <>
                  <RiBuilding2Line className="me-2" />
                  {data.client.name}
                </>
              ) : (
                <>
                  <FiUser className="me-2" />
                  {data.company.name}
                </>
              )}
            </Button>
          </OverlayTrigger>
        </Col>
        <Col className="d-flex align-items-center" lg={2} onClick={showDetails}>
          {data.title}
        </Col>
        <Col className="d-flex align-items-center" lg={2} onClick={showDetails}>
          {getStage()}
        </Col>
        <Col className="d-flex align-items-center" lg={2} onClick={showDetails}>
          {getCategory()}
        </Col>
        <Col
          className={
            "d-flex align-items-center" +
            (data.budget ? " text-primary" : " text-black-50")
          }
          style={{ fontSize: data.budget ? 18 : 12 }}
          lg={2}
          onClick={showDetails}
        >
          {data.budget ? data.budget.toLocaleString() + "/-" : "Not mentioned"}
        </Col>
        <Col
          className={
            "d-flex align-items-center" +
            (data.area ? " text-secondary" : " text-black-50")
          }
          style={{ fontSize: data.area ? 18 : 12 }}
          lg={2}
          onClick={showDetails}
        >
          {data.area ? data.area.toLocaleString() : "Not mentioned"}
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default LeadRequirementCard;
