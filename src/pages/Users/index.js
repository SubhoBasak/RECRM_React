import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { GoSettings } from "react-icons/go";
import { ImSearch } from "react-icons/im";
import { MdClose } from "react-icons/md";

// components
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import UserCard from "../../components/UserCard";
import NoRecords from "../../components/NoRecords";
import ConnectionLost from "../../components/ConnectionLost";
import InternalServerError from "../../components/InternalServerError";

const Users = () => {
  const navigate = useNavigate();

  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  function showData() {
    if (viewState === VIEWSTATE.loading) return <Loading />;
    else if (viewState === VIEWSTATE.connLost) return <ConnectionLost />;
    else if (viewState === VIEWSTATE.serverError)
      return <InternalServerError />;
    else if (users.length === 0) return <NoRecords />;

    let list = users.map((data, i) => {
      let tmp = search.toLowerCase();

      if (tmp === "" || data.email?.toLowerCase().includes(tmp))
        return (
          <UserCard
            key={i}
            {...{ data, selected, setSelected }}
            remove={() => setUsers(users.filter((x) => x._id !== data._id))}
          />
        );
      return null;
    });

    if (list.every((i) => i === null)) return <NotFound />;
    return (
      <>
        <Row
          style={{
            margin: "20px",
            marginTop: "40px",
            width: "calc(100% - 40px)",
          }}
        >
          <Col lg="1" />
          <Col lg="4" className="fw-bold">
            Email
          </Col>
          <Col lg="2" className="fw-bold">
            Status
          </Col>
          <Col lg="3" className="fw-bold">
            Last login
          </Col>
          <Col lg="2" className="fw-bold">
            Actions
          </Col>
        </Row>
        <ListGroup
          variant="flush"
          className="rounded-4 mt-1"
          style={{ margin: "20px", width: "calc(100% - 40px)" }}
        >
          {list}
        </ListGroup>
      </>
    );
  }

  React.useState(() => {
    async function getData() {
      fetch(process.env.REACT_APP_BASE_URL + "/user")
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res
              .json()
              .then((data) => setUsers(data))
              .catch();
          else if (res.status === 500) setViewState(VIEWSTATE.serverError);
        })
        .catch(() => setViewState(VIEWSTATE.connLost));
      setViewState(VIEWSTATE.loading);
    }

    getData();
  }, []);

  return (
    <>
      <nav>
        <InputGroup className="w-25 me-auto my-auto rounded-0 border-bottom">
          <InputGroup.Text className="bg-transparent border-0">
            <ImSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search users..."
            type="text"
            maxLength="100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-light shadow-none border-0"
          />
          {search !== "" && (
            <InputGroup.Text
              className="bg-transparent border-0"
              onClick={() => setSearch("")}
            >
              <MdClose />
            </InputGroup.Text>
          )}
        </InputGroup>
        <Button variant="outline-primary" className="d-flex my-auto">
          <GoSettings />
        </Button>
        <Button
          variant="primary"
          className="ms-3 btn-sm shadow"
          onClick={() => navigate("/user_details")}
        >
          Add User
        </Button>
      </nav>
      <Row className="w-100">
        <Col lg="6" md="6" sm="12" className="d-flex align-items-center my-5">
          <img
            src={require("../../assets/svgs/people.svg").default}
            alt="people"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              Users
            </h1>
            <p className="text-secondary fw-light mb-0">Manage all users</p>
          </div>
        </Col>
        <Col
          lg="6"
          md="6"
          sm="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="p-2 px-4 d-flex border-end flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {users.length}
            </h1>
            <p className="text-secondary">Users</p>
          </div>
          <div className="p-2 px-4 d-flex border-end flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {users.filter((u) => u.active).length}
            </h1>
            <p className="text-secondary">Active</p>
          </div>
          <div className="p-2 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {users.filter((u) => !u.active).length}
            </h1>
            <p className="text-secondary">Deactive</p>
          </div>
        </Col>
      </Row>
      {showData()}
    </>
  );
};

export default Users;
