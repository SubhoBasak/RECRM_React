import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  FormCheck,
  ListGroupItem,
  Row,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// components
import DeleteModal from "../DeleteModal";

const UserCard = ({ data, selected, setSelected, remove }) => {
  const navigate = useNavigate();

  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  function selectIt() {
    const indx = selected.findIndex((user) => user === data._id);

    if (indx > -1) setSelected(selected.filter((user) => user !== data._id));
    else setSelected([...selected, data._id]);
  }

  return (
    <>
      <ListGroupItem className="py-3">
        <Row>
          <Col lg="1" className="d-flex">
            <FormCheck
              className="my-auto"
              checked={selected.findIndex((user) => user === data._id) > -1}
              onChange={selectIt}
            />
          </Col>
          <Col lg="4" className="text-primary d-flex align-items-center">
            {data.email}
          </Col>
          <Col lg="2" className="d-flex">
            <Alert
              variant={data.active ? "success" : "warning"}
              className="p-0 px-2 my-auto"
              style={{ fontSize: 12, width: "fit-content" }}
            >
              {data.active ? "Active" : "Deactive"}
            </Alert>
          </Col>
          <Col
            lg="3"
            className="text-secondary fw-light d-flex align-items-center"
          >
            {data.last_login
              ? new Date(data.last_login).toLocaleDateString("default", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not logged in yet"}
          </Col>
          <Col lg="2" className="d-flex align-items-center">
            <Button
              variant="outline-primary"
              className="my-auto btn-sm"
              onClick={() => setViewState(VIEWSTATE.delete)}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              className="my-auto btn-sm shadow ms-3"
              onClick={() =>
                navigate("/user_details/" + data._id, { state: data })
              }
            >
              Edit
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        url="/user"
        body={{ id: data._id }}
        msg="Do you really want to delete this user?"
        remove={() => {
          setViewState(VIEWSTATE.none);
          remove();
        }}
      />
    </>
  );
};

export default UserCard;
