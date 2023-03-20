import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  ListGroup,
} from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { ImSearch } from "react-icons/im";
import { GoSettings } from "react-icons/go";
import { MdClose, MdAutoGraph } from "react-icons/md";

// components
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import NoRecords from "../../components/NoRecords";
import StageModal from "../../components/StageModal";
import ConnectionLost from "../../components/ConnectionLost";
import LeadRequirementCard from "../../components/LeadRequirementCard";
import InternalServerError from "../../components/InternalServerError";

const Lead = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [leads, setLeads] = React.useState([]);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [search, setSearch] = React.useState("");
  const [stages, setStages] = React.useState([]);
  const [stageModal, setStageModal] = React.useState(false);

  function showData() {
    if (viewState === VIEWSTATE.loading) return <Loading />;
    else if (viewState === VIEWSTATE.connLost) return <ConnectionLost />;
    else if (viewState === VIEWSTATE.serverError)
      return <InternalServerError />;
    else if (leads.length === 0) return <NoRecords />;

    let tmp = search.toLowerCase();
    let list = leads
      .sort((a, b) => new Date(a.updatedAt) < new Date(b.updatedAt))
      .map((data, i) => {
        if (
          tmp === "" ||
          data.title?.toLowerCase().includes(tmp) ||
          data.budget?.toString().includes(tmp) ||
          data.area?.toString().includes(tmp) ||
          data.client?.name.includes(tmp) ||
          data.company?.name.includes(tmp)
        )
          return <LeadRequirementCard key={i} data={data} />;
        return null;
      });

    if (list.every((i) => i === null)) return <NotFound />;
    return (
      <>
        <Row
          className="w-100 m-0 p-0 fw-bold text-black-50 mt-3"
          style={{ margin: "20px", width: "calc(100% - 40px)" }}
        >
          <Col lg="2" className="ps-4 d-none d-lg-block">
            Client / Company
          </Col>
          <Col lg="2" className="ps-4 d-none d-lg-block">
            Title
          </Col>
          <Col lg="2" className="ps-4 d-none d-lg-block">
            Stage
          </Col>
          <Col lg="2" className="ps-4 d-none d-lg-block">
            Category
          </Col>
          <Col lg="2" className="ps-4 d-none d-lg-block">
            Budget
          </Col>
          <Col lg="2" className="ps-4 d-none d-lg-block">
            Area (sqft)
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

  React.useEffect(() => {
    async function getData() {
      fetch(process.env.REACT_APP_BASE_URL + "/rqmn")
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                setLeads(data.client.concat(data.company));
                setStages(data.stages);
              })
              .catch();
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
        })
        .catch(() => setViewState(VIEWSTATE.connLost));
      setViewState(VIEWSTATE.loading);
    }

    getData();
  }, [pathname, navigate]);

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
              placeholder="Search leads..."
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
            className="ms-3 shadow btn-sm d-flex align-items-center"
            onClick={() => setStageModal(true)}
          >
            <MdAutoGraph className="me-2" />
            Stages
          </Button>
        </Col>
      </nav>
      <Row className="w-100 m-0 p-0 d-none d-md-flex">
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
          className="d-flex flex-wrap justify-content-center align-items-center"
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
      <StageModal
        show={stageModal}
        hide={() => setStageModal(false)}
        stages={stages}
        setStages={setStages}
      />
    </>
  );
};

export default Lead;
