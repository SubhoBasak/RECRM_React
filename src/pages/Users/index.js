import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { ImSearch } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose, MdDeleteSweep } from "react-icons/md";

// components
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import UserCard from "../../components/UserCard";
import NoRecords from "../../components/NoRecords";
import ConnectionLost from "../../components/ConnectionLost";
import InternalServerError from "../../components/InternalServerError";

const Users = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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

    let tmp = search.toLowerCase();
    let list = users.map((data, i) => {
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
          <Col lg="1" className="d-none d-lg-block" />
          <Col lg="4" className="d-none d-lg-block fw-bold">
            Email
          </Col>
          <Col lg="2" className="d-none d-lg-block fw-bold">
            Status
          </Col>
          <Col lg="3" className="d-none d-lg-block fw-bold">
            Last login
          </Col>
          <Col lg="2" className="d-none d-lg-block fw-bold">
            Actions
          </Col>
        </Row>
        <ListGroup
          variant="flush"
          className="rounded-3 mt-1"
          style={{ margin: "20px", width: "calc(100% - 40px)" }}
        >
          {list}
        </ListGroup>
      </>
    );
  }

  function optionButtonHandler(method) {
    fetch(process.env.REACT_APP_BASE_URL + "/user/opt", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ users: selected }),
    })
      .then((res) => {
        if (res.status === 200) {
          if (method === "POST")
            setUsers(
              users.map((u) => {
                for (let i = 0; i < selected.length; i++)
                  if (u._id === selected[i]) u.active = true;
                return u;
              })
            );
          else if (method === "PUT")
            setUsers(
              users.map((u) => {
                for (let i = 0; i < selected.length; i++)
                  if (u._id === selected[i]) u.active = false;
                return u;
              })
            );
          else
            setUsers(
              users.filter((u) => {
                for (let i = 0; i < selected.length; i++)
                  if (u._id === selected[i]) return false;
                return true;
              })
            );
          setSelected([]);
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
      })
      .catch();
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
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
          else if (res.status === 500) setViewState(VIEWSTATE.serverError);
        })
        .catch(() => setViewState(VIEWSTATE.connLost));
      setViewState(VIEWSTATE.loading);
    }

    getData();
  }, []);

  return (
    <>
      <nav className="row w-100 m-0 py-0">
        <Col lg="6" xs="12" className="d-flex mt-3 m-md-0">
          <InputGroup
            className="w-25 me-auto my-auto rounded-0 border-bottom"
            style={{ minWidth: 300 }}
          >
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
        </Col>
        <Col lg="6" sm="12" className="d-flex justify-content-end mt-3 m-md-0">
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
        </Col>
      </nav>
      <Row className="w-100 m-0 p-0 d-none d-md-flex">
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
          <div className="p-2 px-4 d-flex flex-wrap border-end flex-column align-items-center">
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
      {selected.length > 0 && (
        <div className="w-100 px-3 d-flex align-items-center justify-content-between">
          <p className="m-2 fs-6 fw-bold text-nowrap">
            {selected.length} selected
          </p>
          <div className="d-flex flex-wrap">
            <Button
              variant="outline-primary"
              className="btn-sm my-auto"
              onClick={() => setSelected([])}
            >
              Unselect all
            </Button>
            <Button
              variant="outline-primary"
              className="ms-2 my-auto btn-sm d-flex align-items-center"
              onClick={() => optionButtonHandler("POST")}
            >
              <IoMdCheckmark className="me-2" />
              Active
            </Button>
            <Button
              variant="outline-primary"
              className="ms-2 my-auto btn-sm d-flex align-items-center"
              onClick={() => optionButtonHandler("PUT")}
            >
              <IoClose className="me-2" />
              Deactive
            </Button>
            <Button
              variant="primary"
              className="ms-2 my-auto btn-sm d-flex align-items-center shadow"
              onClick={() => optionButtonHandler("DELETE")}
            >
              <MdDeleteSweep className="me-2" />
              Delete
            </Button>
          </div>
        </div>
      )}
      {showData()}
    </>
  );
};

export default Users;
