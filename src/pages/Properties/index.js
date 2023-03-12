import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, Row, Col, InputGroup } from "react-bootstrap";

// icons
import { ImSearch } from "react-icons/im";
import { MdDeleteSweep } from "react-icons/md";
import { GoSettings } from "react-icons/go";
import { BsHouseFill, BsEraserFill, BsFolderFill } from "react-icons/bs";

// components
import Bug from "../../components/Bug";
import PropertyCard from "../../components/PropertyCard";
import FolderCard from "../../components/FolderCard";
import Loading from "../../components/Loading";
import ConnectionLost from "../../components/ConnectionLost";
import NoRecords from "../../components/NoRecords";
import FolderModal from "../../components/FolderModal";

const Properties = () => {
  const [properties, setProperties] = React.useState([]);
  const [folders, setFolders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [connLost, setConnLost] = React.useState(false);
  const [gotBug, setGotBug] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [addFolder, setAddFolder] = React.useState(false);

  const navigate = useNavigate();

  function delProperties() {
    let folders = [];
    let properties = [];

    for (let sel in selected) {
      sel = selected[sel];

      if (sel.type === "fld") folders.push(sel.id);
      else if (sel.type === "prpt") properties.push(sel.id);
    }

    fetch(process.env.REACT_APP_BASE_URL + "/folder", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folders, properties }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
        }
      })
      .catch(() => {
        setLoading(false);
        setConnLost(true);
      });

    setLoading(true);
  }

  async function getProperties() {
    fetch(process.env.REACT_APP_BASE_URL + "/folder")
      .then((res) => {
        setConnLost(false);
        setLoading(false);
        if (res.status === 200)
          res
            .json()
            .then((data) => {
              setFolders(
                data[0].map((fld) => {
                  fld.type = "fld";
                  return fld;
                })
              );
              setProperties(
                data[1].map((prpt) => {
                  prpt.type = "prpt";
                  return prpt;
                })
              );
            })
            .catch(() => setGotBug(true));
      })
      .catch(() => {
        setConnLost(true);
        setLoading(false);
      });
  }

  function showData() {
    if (loading) return <Loading />;
    else if (connLost) return <ConnectionLost />;
    else if (gotBug) return <Bug />;
    else if (properties.length === 0 && folders.length === 0)
      return <NoRecords />;
    else
      return (
        <div className="d-flex flex-wrap w-100 p-3">
          {folders.map((data, i) => (
            <FolderCard key={i} {...{ data, selected, setSelected }} />
          ))}
          {properties.map((data, i) => (
            <PropertyCard key={i} {...{ data, selected, setSelected }} />
          ))}
        </div>
      );
  }

  React.useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      <nav>
        <InputGroup className="w-25 me-auto my-auto rounded-0 border-bottom">
          <InputGroup.Text className="bg-transparent border-0">
            <ImSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Search properties..."
            type="text"
            maxLength="100"
            className="bg-light shadow-none border-0"
          />
        </InputGroup>
        <Button variant="outline-primary" className="d-flex my-auto">
          <GoSettings />
        </Button>
        <Button
          variant="outline-primary"
          className="ms-3 my-auto d-flex align-items-center btn-sm"
          onClick={() => setAddFolder(true)}
        >
          <BsFolderFill className="me-1" />
          New Folder
        </Button>
        <Button
          className="ms-3 my-auto d-flex align-items-center btn-sm shadow"
          onClick={() => navigate("/property")}
        >
          <BsHouseFill className="me-1" />
          New Property
        </Button>
      </nav>
      <Row className="w-100">
        <Col lg="6" md="6" sm="12" className="d-flex align-items-center my-5">
          <img
            src={require("../../assets/svgs/properties.svg").default}
            alt="people"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              Properties
            </h1>
            <p className="text-secondary fw-light mb-0">
              Manage all properties
            </p>
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
              {folders.length}
            </h1>
            <p className="text-secondary">Folders</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {properties.length}
            </h1>
            <p className="text-secondary">Properties</p>
          </div>
        </Col>
      </Row>
      {selected.length > 0 && (
        <div className="w-100 px-3 d-flex align-items-center justify-content-between">
          <p className="m-2 fs-6 fw-bold">{selected.length} selected</p>
          <div className="d-flex">
            <Button
              variant="outline-primary"
              className="btn-sm my-auto d-flex align-items-center"
              onClick={() => setSelected([])}
            >
              <BsEraserFill className="me-2" />
              Unselect all
            </Button>
            <Button
              variant="primary"
              className="ms-2 my-auto btn-sm d-flex align-items-center shadow"
              onClick={delProperties}
            >
              <MdDeleteSweep className="me-2" />
              Delete Properties
            </Button>
          </div>
        </div>
      )}
      {showData()}
      <FolderModal show={addFolder} hide={() => setAddFolder(false)} />
    </>
  );
};

export default Properties;
