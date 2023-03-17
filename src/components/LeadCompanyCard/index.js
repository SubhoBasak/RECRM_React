import React from "react";
import { ListGroupItem, Row, Col, ButtonGroup, Button } from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";
import { mediumCodedText } from "../../utils/codedText";

// icons
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

// components
import DeleteModal from "../DeleteModal";

const LeadCompanyCard = ({ data }) => {
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  return (
    <>
      <ListGroupItem className="py-3">
        <Row>
          <Col lg="4">{data.title}</Col>
          <Col lg="2">{mediumCodedText(data.medium)}</Col>
          <Col lg="2">
            {new Date(data.due_date).toLocaleDateString("default", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Col>
          <Col lg="2">
            {data.attempt_date
              ? new Date(data.attempt_date).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
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
              >
                <AiOutlineDelete />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ListGroupItem>
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/leadCompany"
        body={{ id: data._id }}
        msg="Do you really want to delete the call?"
      />
    </>
  );
};

export default LeadCompanyCard;
