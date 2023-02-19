import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Dropdown,
  FormControl,
  InputGroup,
  ListGroup,
  Row,
} from "react-bootstrap";
import "./style.css";

// icons
import { ImSearch } from "react-icons/im";
import { IoPersonAddSharp } from "react-icons/io5";
import { GoSettings } from "react-icons/go";
import { MdDeleteSweep, MdClose } from "react-icons/md";

// components
import ContactCard from "../../components/ContactCard";
import ConnectionLost from "../../components/ConnectionLost";
import NoRecords from "../../components/NoRecords";
import NotFound from "../../components/NotFound";
import Loading from "../../components/Loading";

const AllContacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const [clientCount, setClientCount] = React.useState(0);
  const [companyCount, setCompanyCount] = React.useState(0);
  const [agentCount, setAgentCount] = React.useState(0);
  const [connLost, setConnLost] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState([]);
  const [search, setSearch] = React.useState("");

  async function getAllContacts() {
    fetch(process.env.REACT_APP_BASE_URL + "/contacts")
      .then((res) => {
        setConnLost(false);
        setLoading(false);
        if (res.status === 200)
          res
            .json()
            .then((data) => {
              setClientCount(data[0]?.length || 0);
              setCompanyCount(data[1]?.length || 0);
              setAgentCount(data[2]?.length || 0);

              data[0] = data[0].map((d) => {
                d.role = "client";
                return d;
              });

              data[1] = data[1].map((d) => {
                d.role = "company";
                return d;
              });

              data[2] = data[2].map((d) => {
                d.role = "agent";
                return d;
              });

              setContacts(
                data[0]
                  .concat(data[1])
                  .concat(data[2])
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
              );
            })
            .catch();
      })
      .catch(() => {
        setConnLost(true);
        setLoading(false);
      });
  }

  function showData() {
    if (loading) return <Loading />;
    else if (connLost) return <ConnectionLost />;
    else if (contacts.length === 0) return <NoRecords />;
    else {
      let list = contacts.map((data, i) => {
        let tmp = search.toLowerCase();

        if (
          tmp === "" ||
          data.name.toLowerCase().includes(tmp) ||
          data.address1.toLowerCase().includes(tmp) ||
          data.email?.toLowerCase().includes(tmp) ||
          data.phone?.toLowerCase().includes(tmp) ||
          data.address2?.toLowerCase().includes(tmp) ||
          data.city?.toLowerCase().includes(tmp) ||
          data.state?.toLowerCase().includes(tmp) ||
          data.country?.toLowerCase().includes(tmp) ||
          data.zip?.toLowerCase().includes(tmp) ||
          data.landmark?.toLowerCase().includes(tmp)
        )
          return <ContactCard key={i} {...{ data, selected, setSelected }} />;
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
            <Col className="fw-bold">Name</Col>
            <Col lg="1" className="fw-bold">
              Role
            </Col>
            <Col className="fw-bold">Address</Col>
            <Col className="fw-bold">Email</Col>
            <Col className="fw-bold">Phone</Col>
            <Col lg="1" />
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
  }

  React.useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      <nav>
        <InputGroup className="w-25 me-auto my-auto rounded-0 border-bottom">
          <InputGroup.Text className="bg-transparent border-0">
            <ImSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search contacts..."
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
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            className="btn-sm ms-3 shadow"
            id="dropdown-basic"
          >
            <IoPersonAddSharp className="me-2" />
            New Contact
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link className="dropdown-item" to="/client_details">
              Client
            </Link>
            <Link className="dropdown-item" to="/company_details">
              Company
            </Link>
            <Dropdown.Divider />
            <Link className="dropdown-item" to="/agent_details">
              Agent
            </Link>
          </Dropdown.Menu>
        </Dropdown>
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
              Contacts
            </h1>
            <p className="text-secondary fw-light mb-0">Manage all contacts</p>
          </div>
        </Col>
        <Col
          lg="6"
          md="6"
          sm="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="p-2 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {clientCount}
            </h1>
            <p className="text-secondary">Clients</p>
          </div>
          <div className="p-3 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {companyCount}
            </h1>
            <p className="text-secondary">Companies</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {agentCount}
            </h1>
            <p className="text-secondary">Agents</p>
          </div>
        </Col>
      </Row>
      {selected.length > 0 && (
        <div className="w-100 px-3 d-flex align-items-center justify-content-between">
          <p className="m-2 fs-6 fw-bold">{selected.length} selected</p>
          <div className="d-flex">
            <Button
              variant="outline-primary"
              className="btn-sm my-auto"
              onClick={() => setSelected([])}
            >
              Unselect all
            </Button>
            <Button
              variant="primary"
              className="ms-2 my-auto btn-sm d-flex align-items-center shadow"
            >
              <MdDeleteSweep className="me-2" />
              Delete Contacts
            </Button>
          </div>
        </div>
      )}
      {showData()}
    </>
  );
};

export default AllContacts;
