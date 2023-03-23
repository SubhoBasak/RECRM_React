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
import { dateDecorator } from "../../utils/decorate";

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
          <Col xs="1" className="d-flex mb-2 mb-md-0">
            <FormCheck
              className="my-auto"
              checked={selected.findIndex((user) => user === data._id) > -1}
              onChange={selectIt}
            />
          </Col>
          <Col
            xs="11"
            lg="3"
            className="text-truncate mb-2 mb-md-0"
            onClick={() =>
              navigate("/user_details/" + data._id, { state: data })
            }
          >
            {data.name}
          </Col>
          <Col
            lg="3"
            xs="12"
            className="text-primary text-truncate mb-2 mb-md-0"
            onClick={() =>
              navigate("/user_details/" + data._id, { state: data })
            }
          >
            {data.email}
          </Col>
          <Col
            xs="6"
            lg="2"
            className="d-flex mb-2 mb-md-0"
            onClick={() =>
              navigate("/user_details/" + data._id, { state: data })
            }
          >
            <Alert
              variant={data.active ? "primary" : "warning"}
              className="text-truncate p-0 px-2 my-auto"
              style={{ fontSize: 12, width: "fit-content" }}
            >
              {data.active ? "Active" : "Deactive"}
            </Alert>
          </Col>
          <Col
            xs="6"
            lg="2"
            className={
              "fw-light d-flex align-items-center mb-2 mb-md-0" +
              (data.last_login ? "text-secondary" : "text-black-50")
            }
            style={{ fontSize: 12 }}
            onClick={() =>
              navigate("/user_details/" + data._id, { state: data })
            }
          >
            {data.last_login
              ? dateDecorator(data.last_login)
              : "Not logged in yet"}
          </Col>
          <Col
            xs="12"
            lg="1"
            className="d-flex justify-content-end align-items-center"
          >
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
