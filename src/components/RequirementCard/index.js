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
import { MdHistory } from "react-icons/md";

// components
import DeleteModal from "../DeleteModal";

const RequirementCard = ({ data, remove, selected, setSelected, url }) => {
  const [deleteIt, setDeleteIt] = React.useState(false);

  function selectContact() {
    if (selected.findIndex((rqmn) => rqmn === data._id) > -1)
      setSelected(selected.filter((rqmn) => rqmn !== data._id));
    else setSelected([...selected, data._id]);
  }

  function getCategory() {
    switch (Number.parseInt(data.category)) {
      case 1:
        return (
          <Alert
            className="px-2 py-0"
            variant="primary"
            style={{ maxWidth: "fit-content" }}
          >
            Residential
          </Alert>
        );
      case 2:
        return (
          <Alert
            className="px-2 py-0"
            variant="success"
            style={{ maxWidth: "fit-content" }}
          >
            Commercial
          </Alert>
        );
      case 3:
        return (
          <Alert
            className="px-2 py-0"
            variant="warning"
            style={{ maxWidth: "fit-content" }}
          >
            Other
          </Alert>
        );
      default:
        return (
          <Alert
            className="px-2 py-0"
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
          <Col lg="1">
            <FormCheck
              checked={selected.findIndex((rqmn) => rqmn === data._id) > -1}
              onChange={selectContact}
            />
          </Col>
          <Col lg="4">{data.title}</Col>
          <Col lg="2" as="a" style={{ textDecoration: "none", fontSize: 12 }}>
            {getCategory()}
          </Col>
          <Col
            lg="2"
            as="a"
            className="text-primary"
            style={{ textDecoration: "none", fontSize: 12 }}
          >
            {data.budget ? data.budget + "/-" : "Not mentioned"}
          </Col>
          <Col
            lg="2"
            as="a"
            className="text-secondary"
            style={{ textDecoration: "none", fontSize: 12 }}
          >
            {data.area || "Not mentioned"}
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
              >
                <MdHistory />
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
