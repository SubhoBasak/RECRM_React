import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheck,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import "./style.css";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdViewHeadline } from "react-icons/md";

// components
import DeleteModal from "../DeleteModal";

const ContactCard = ({ data, selected, setSelected, remove }) => {
  const navigate = useNavigate();

  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  function roleClass() {
    switch (data.role) {
      case "company":
        return "success";
      case "agent":
        return "warning";
      default:
        return "primary";
    }
  }

  function showDetails() {
    let loc = "/client_details/";
    if (data.role === "company") loc = "/company_details/";
    else if (data.role === "agent") loc = "/agent_details/";

    loc += data._id;

    navigate(loc, { state: data });
  }

  function selectContact() {
    let indx = selected.findIndex(
      (cnt) => cnt.id === data._id && cnt.role === data.role
    );

    if (indx > -1)
      setSelected(
        selected.filter(
          (cnt) => !(cnt.id === data._id && cnt.role === data.role)
        )
      );
    else setSelected([...selected, { id: data._id, role: data.role }]);
  }

  return (
    <>
      <ListGroupItem className="person-card py-3" draggable>
        <Row className="w-100 m-0 p-0">
          <Col xs="1">
            <FormCheck
              checked={
                selected.findIndex(
                  (cnt) => cnt.id === data._id && cnt.role === data.role
                ) > -1
              }
              className="ms-1"
              onChange={selectContact}
            />
          </Col>
          <Col
            lg="3"
            md="8"
            xs="11"
            className="fs-6 text-truncate"
            onClick={showDetails}
          >
            {data.name}
          </Col>
          <Col xl="1" lg="2" md="3" xs="4">
            <Alert
              variant={roleClass()}
              className="p-0 px-2 m-0 text-truncate"
              onClick={showDetails}
              style={{ maxWidth: "fit-content" }}
            >
              {data.role}
            </Alert>
          </Col>
          <Col
            lg="2"
            md="12"
            sm="8"
            xs="12"
            className="text-grey fw-light text-truncate"
            onClick={showDetails}
          >
            {data.address1}
          </Col>
          <Col
            as="a"
            lg="2"
            xs="12"
            {...(data.email ? { href: `mailto:${data.email}` } : {})}
            className={
              "col-2 fw-light text-truncate" +
              (data.email ? "" : " text-black-50")
            }
          >
            {data.email || "Not present"}
          </Col>
          <Col
            as="a"
            lg="2"
            xs="12"
            className={
              "fw-light text-truncate" + (data.phone ? "" : " text-black-50")
            }
            {...(data.phone
              ? { href: `tel:${data.phone}` }
              : { onClick: showDetails })}
          >
            {data.phone || "Not present"}
          </Col>
          <Col lg="1">
            <ButtonGroup className="mb-auto">
              <Button
                variant="outline-secondary"
                className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
                onClick={showDetails}
              >
                <MdViewHeadline />
              </Button>
              <Button
                onClick={() => setViewState(VIEWSTATE.delete)}
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
        url={"/" + data.role}
        body={{ id: data._id }}
        msg="Do you really want to delete the contact?"
        remove={() => {
          setViewState(VIEWSTATE.none);
          remove();
        }}
      />
    </>
  );
};

export default ContactCard;
