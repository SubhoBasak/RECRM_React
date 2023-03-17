import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";

// icons
import { ImSearch } from "react-icons/im";
import { GoSettings } from "react-icons/go";
import { MdClose, MdAutoGraph } from "react-icons/md";

// components
import LeadRequirementCard from "../../components/LeadRequirementCard";
import ConnectionLost from "../../components/ConnectionLost";
import NoRecords from "../../components/NoRecords";
import Loading from "../../components/Loading";

const Lead = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [connLost, setConnLost] = React.useState(false);
  const [search, setSearch] = React.useState("");

  function showData() {
    if (loading) return <Loading />;
    else if (connLost) return <ConnectionLost />;
    else if (leads.length === 0) return <NoRecords />;

    return (
      <>
        <Row
          className="w-100 m-0 p-0 fw-bold text-black-50 mt-3"
          style={{ margin: "20px", width: "calc(100% - 40px)" }}
        >
          <Col lg="2" className="ps-4">
            Client / Company
          </Col>
          <Col lg="2" className="ps-4">
            Title
          </Col>
          <Col lg="2" className="ps-4">
            Stage
          </Col>
          <Col lg="2" className="ps-4">
            Category
          </Col>
          <Col lg="2" className="ps-4">
            Budget
          </Col>
          <Col lg="2" className="ps-4">
            Area (sqft)
          </Col>
        </Row>
        <ListGroup
          variant="flush"
          className="rounded-4 mt-1"
          style={{ margin: "20px", width: "calc(100% - 40px)" }}
        >
          {leads
            .sort((a, b) => new Date(a.updatedAt) < new Date(b.updatedAt))
            .map((l, i) => (
              <LeadRequirementCard key={i} data={l} />
            ))}
        </ListGroup>
      </>
    );
  }

  React.useEffect(() => {
    async function getData() {
      fetch(process.env.REACT_APP_BASE_URL + "/rqmn")
        .then((res) => {
          setLoading(false);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                setLeads(data.client.concat(data.company));
              })
              .catch();
        })
        .catch(() => {
          setLoading(false);
          setConnLost(true);
        });
      setLoading(true);
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
            placeholder="Search workspaces..."
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
          className="ms-3 shadow btn-sm d-flex align-items-center"
          onClick={() => navigate("/lead")}
        >
          <MdAutoGraph className="me-2" />
          Stages
        </Button>
      </nav>
      <Row className="w-100">
        <Col lg="6" md="6" sm="12" className="d-flex align-items-center my-5">
          <img
            src={require("../../assets/svgs/lead.svg").default}
            alt="people"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              LEAD
            </h1>
            <p className="text-secondary fw-light mb-0">Manage all leads</p>
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
              {leads.filter((l) => !Boolean(l.stage)).length}
            </h1>
            <p className="text-secondary">Initiated</p>
          </div>
          <div className="p-3 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {leads.filter((l) => Boolean(l.stage)).length}
            </h1>
            <p className="text-secondary">On going</p>
          </div>
          <div className="p-3 px-4 border-end d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {leads.filter((l) => l.finally === 1).length}
            </h1>
            <p className="text-secondary">Cancelled</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {leads.filter((l) => l.finally === 2).length}
            </h1>
            <p className="text-secondary">Completed</p>
          </div>
        </Col>
      </Row>
      {showData()}
    </>
  );
};

export default Lead;
