import React from "react";
import {
  ListGroupItem,
  Row,
  Col,
  Button,
  ButtonGroup,
  Alert,
  Modal,
} from "react-bootstrap";

// utils
import { mediumCodedText } from "../../utils/codedText";
import { VIEWSTATE } from "../../utils/constants";
import { dateDecorator } from "../../utils/decorate";

// icons
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// components
import DeleteModal from "../DeleteModal";

const LeadCard = ({ data, remove }) => {
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  return (
    <>
      <ListGroupItem className="py-3">
        <Row>
          <Col
            lg="4"
            className="d-flex align-items-center"
            onClick={() => setViewState(VIEWSTATE.showDetails)}
          >
            {data.title}
          </Col>
          <Col
            lg="2"
            className="d-flex"
            onClick={() => setViewState(VIEWSTATE.showDetails)}
          >
            <Alert
              variant="warning"
              className="px-2 py-0 my-auto"
              style={{ fontSize: 12, width: "fit-content" }}
            >
              {mediumCodedText(data.medium)}
            </Alert>
          </Col>
          <Col
            lg="2"
            className="d-flex align-items-center fw-light text-primary"
            style={{ fontSize: 12 }}
            onClick={() => setViewState(VIEWSTATE.showDetails)}
          >
            {dateDecorator(data.due_date)}
          </Col>
          <Col
            lg="2"
            className={
              "d-flex align-items-center fw-light" +
              (data.attempt_date ? " text-secondary" : " text-black-50")
            }
            onClick={() => setViewState(VIEWSTATE.showDetails)}
            style={{ fontSize: 12 }}
          >
            {data.attempt_date
              ? dateDecorator(data.attempt_date)
              : "Not mentioned"}
          </Col>
          <Col lg="2" className="d-flex justify-content-end">
            <ButtonGroup>
              <Button
                variant="outline-secondary"
                className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
              >
                <AiOutlineEdit />
              </Button>
              <Button
                variant="outline-secondary"
                className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
                onClick={() => setViewState(VIEWSTATE.delete)}
              >
                <AiOutlineDelete />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ListGroupItem>
      <Modal
        centered
        show={viewState === VIEWSTATE.showDetails}
        onHide={() => setViewState(VIEWSTATE.none)}
      >
        <Modal.Header closeButton className="py-2">
          <Modal.Title className="text-black-50 fs-5">Call details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <p className="fs-4 text-primary fw-bold">{data.title}</p>
            <Alert variant="warning" className="py-0 my-auto">
              {mediumCodedText(data.medium)}
            </Alert>
          </div>
          <div className="d-flex justify-content-between">
            <div className="w-50 me-1 p-0">
              <Alert className="py-1 mb-0" style={{ fontSize: 12 }}>
                <strong>Due date : </strong>
                {dateDecorator(data.due_date)}
              </Alert>
              <p></p>
            </div>
            <div className="w-50 ms-1 p-0">
              <Alert
                variant="success"
                className="py-1 mb-0"
                style={{ fontSize: 12 }}
              >
                <strong>Attempt date : </strong>
                {data.attempt_date
                  ? dateDecorator(data.attempt_date)
                  : "Not mentioned"}
              </Alert>
            </div>
          </div>
          {data.comment && (
            <>
              <span className="text-secondary">Comment</span>
              <p className="bg-light p-2 rounded-3 mb-0 text-black-50">
                {data.comment}
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/lead"
        body={{ id: data._id }}
        msg="Do you really want to delete this call?"
        remove={() => {
          setViewState(VIEWSTATE.none);
          remove();
        }}
      />
    </>
  );
};

export default LeadCard;
