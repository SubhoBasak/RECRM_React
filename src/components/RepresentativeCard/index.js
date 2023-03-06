import React from "react";
import {
  ListGroupItem,
  FormCheck,
  Row,
  Col,
  Alert,
  ButtonGroup,
  Button,
} from "react-bootstrap";

// icons
import { AiOutlineDelete } from "react-icons/ai";
import { MdViewHeadline, MdHistory } from "react-icons/md";

// components
import DeleteModal from "../DeleteModal";

const RepresentativeCard = ({ edit, remove, data, selected, setSelected }) => {
  const [deleteIt, setDeleteIt] = React.useState(false);

  function selectRepr() {
    let indx = selected.findIndex((repr) => repr === data._id);

    if (indx > -1) setSelected(selected.filter((repr) => repr !== data._id));
    else setSelected([...selected, data._id]);
  }

  return (
    <>
      <ListGroupItem className="person-card py-3 bg-white" draggable>
        <Row>
          <Col lg="1" className="d-flex align-items-center">
            <FormCheck
              checked={selected.findIndex((repr) => repr === data._id) > -1}
              className="ms-1"
              onChange={selectRepr}
            />
          </Col>
          <Col className="d-flex align-items-center fs-6" onClick={edit}>
            {data.name}
          </Col>
          <Col className="d-flex align-items-center">
            <Alert
              variant="warning"
              className="p-0 px-2 m-0"
              style={{ fontSize: "12px" }}
              onClick={edit}
            >
              {data.designation || "-"}
            </Alert>
          </Col>
          <Col>
            <a
              className="fw-light"
              {...(data.email ? { href: "mailto:" + data.email } : {})}
            >
              {data.email || "Email not present"}
            </a>
          </Col>
          <Col>
            <a
              className="fw-light"
              {...(data.phone ? { href: "tel:" + data.phone } : {})}
            >
              {data.phone || "Number not present"}
            </a>
          </Col>
          <Col lg="1" className="d-flex justify-content-end">
            <ButtonGroup>
              <Button
                variant="outline-secondary"
                className="d-flex p-1 border-0 rounded-0 bg-transparent text-grey"
                onClick={edit}
              >
                <MdViewHeadline />
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
        url="/repr"
        body={{ id: data._id }}
        remove={() => {
          remove();
          setDeleteIt(false);
        }}
        msg="Do you really want to delete this representative?"
      />
    </>
  );
};

export default RepresentativeCard;
