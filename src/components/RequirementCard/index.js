import React from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  FormCheck,
  ListGroupItem,
  Row,
} from "react-bootstrap";

// icons
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// components
import DeleteModal from "../DeleteModal";

const RequirementCard = ({
  data,
  remove,
  selected,
  setSelected,
  url,
  details,
}) => {
  const navigate = useNavigate();

  const [deleteIt, setDeleteIt] = React.useState(false);

  function selectContact() {
    if (selected.findIndex((rqmn) => rqmn === data._id) > -1)
      setSelected(selected.filter((rqmn) => rqmn !== data._id));
    else setSelected([...selected, data._id]);
  }

  function showDetails() {
    navigate(details + data._id);
  }

  function getCategory() {
    switch (Number.parseInt(data.category)) {
      case 1:
        return (
          <Alert
            className="text-truncate px-2 py-0"
            variant="primary"
            style={{ maxWidth: "fit-content" }}
          >
            Residential
          </Alert>
        );
      case 2:
        return (
          <Alert
            className="text-truncate px-2 py-0"
            variant="success"
            style={{ maxWidth: "fit-content" }}
          >
            Commercial
          </Alert>
        );
      case 3:
        return (
          <Alert
            className="text-truncate px-2 py-0"
            variant="warning"
            style={{ maxWidth: "fit-content" }}
          >
            Other
          </Alert>
        );
      default:
        return (
          <Alert
            className="text-truncate px-2 py-0"
            variant="secondary"
            style={{ maxWidth: "fit-content" }}
          >
            Not mentioned
          </Alert>
        );
    }
  }

  return (
    <>
      <ListGroupItem className="py-3">
        <Row className="w-100">
          <Col xs="1" className="mb-2 mb-md-0" onClick={showDetails}>
            <FormCheck
              checked={selected.findIndex((rqmn) => rqmn === data._id) > -1}
              onChange={selectContact}
            />
          </Col>
          <Col
            xs="10"
            lg="4"
            className="text-truncate mb-2 mb-md-0"
            onClick={showDetails}
          >
            {data.title}
          </Col>
          <Col
            xs="12"
            lg="2"
            as="a"
            style={{ textDecoration: "none", fontSize: 12 }}
            onClick={showDetails}
          >
            {getCategory()}
          </Col>
          <Col
            xs="6"
            lg="2"
            as="a"
            className={data.budget ? "text-primary" : "text-black-50"}
            style={{ textDecoration: "none", fontSize: 12 }}
            onClick={showDetails}
          >
            {data.budget
              ? data.budget.toLocaleString() + "/-"
              : "Not mentioned"}
          </Col>
          <Col
            xs="6"
            lg="2"
            as="a"
            className={data.area ? "text-secondary" : "text-black-50"}
            style={{ textDecoration: "none", fontSize: 12 }}
            onClick={showDetails}
          >
            {data.area ? data.area.toLocaleString() : "Not mentioned"}
          </Col>
          <Col lg="1">
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
                onClick={() => setDeleteIt(true)}
              >
                <AiOutlineDelete />
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </ListGroupItem>
      <DeleteModal
        show={deleteIt}
        hide={() => setDeleteIt(false)}
        url={url}
        body={{ id: data._id }}
        msg="Do you really want to delete the requirement?"
        remove={() => {
          setDeleteIt(false);
          remove();
        }}
      />
    </>
  );
};

export default RequirementCard;
