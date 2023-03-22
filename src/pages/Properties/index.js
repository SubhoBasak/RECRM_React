import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FormControl, Row, Col, InputGroup } from "react-bootstrap";
import "./style.css";

// utils
import { VIEWSTATE } from "../../utils/constants";

// icons
import { ImSearch } from "react-icons/im";
import { GoSettings } from "react-icons/go";
import { MdDeleteSweep } from "react-icons/md";
import { BsHouseFill, BsFolderFill } from "react-icons/bs";

// components
import Bug from "../../components/Bug";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import NoRecords from "../../components/NoRecords";
import FolderCard from "../../components/FolderCard";
import FolderModal from "../../components/FolderModal";
import ConfirmModal from "../../components/ConfirmModal";
import PropertyCard from "../../components/PropertyCard";
import ConnectionLost from "../../components/ConnectionLost";
import InternalServerError from "../../components/InternalServerError";

const Properties = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [properties, setProperties] = React.useState([]);
  const [addFolder, setAddFolder] = React.useState(false);
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  function delProperties() {
    let folders = [];
    let prpts = [];

    for (let sel in selected) {
      sel = selected[sel];

      if (sel.type === "fld") folders.push(sel.id);
      else prpts.push(sel.id);
    }

    let tmpData;
    if (folders.length > 0 && prpts.length > 0) {
      tmpData = { folders, properties: prpts };
    } else if (folders.length > 0) {
      tmpData = { folders };
    } else if (prpts.length > 0) {
      tmpData = { properties: prpts };
    }

    fetch(process.env.REACT_APP_BASE_URL + "/folder", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) {
          setProperties(
            properties.filter((tmp) => {
              for (let sel in selected) {
                sel = selected[sel];
                if (tmp._id === sel.id && tmp.type === sel.type) return false;
              }
              return true;
            })
          );
          setSelected([]);
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
    setViewState(VIEWSTATE.loading);
  }

  function showData() {
    if (viewState === VIEWSTATE.loading) return <Loading />;
    else if (viewState === VIEWSTATE.connLost) return <ConnectionLost />;
    else if (viewState === VIEWSTATE.serverError)
      return <InternalServerError />;
    else if (viewState === VIEWSTATE.bug) return <Bug />;
    else if (properties.length === 0) return <NoRecords />;

    let list = properties.map((data, i) => {
      let tmp = search.toLowerCase();

      if (
        tmp === "" ||
        data.title.toLowerCase().includes(tmp) ||
        data.info?.toLowerCase().includes(tmp) ||
        data.address1?.toLowerCase().includes(tmp) ||
        data.address2?.toLowerCase().includes(tmp) ||
        data.city?.toLowerCase().includes(tmp) ||
        data.state?.toLowerCase().includes(tmp) ||
        data.country?.toLowerCase().includes(tmp) ||
        data.zip?.toLowerCase().includes(tmp) ||
        data.landmark?.toLowerCase().includes(tmp) ||
        data.details?.toLowerCase().includes(tmp)
      )
        return data.type === "prpt" ? (
          <PropertyCard key={i} {...{ data, selected, setSelected }} />
        ) : (
          <FolderCard key={i} {...{ data, selected, setSelected }} />
        );
      return null;
    });

    if (list.every((i) => i === null)) return <NotFound />;
    else
      return (
        <div className="properties-canvas d-flex flex-wrap w-100 p-3">
          {list}
        </div>
      );
  }

  React.useEffect(() => {
    async function getProperties() {
      fetch(process.env.REACT_APP_BASE_URL + "/folder")
        .then((res) => {
          setViewState(VIEWSTATE.none);
          if (res.status === 200)
            res
              .json()
              .then((data) => {
                data[0] = data[0].map((fld) => {
                  fld.type = "fld";
                  return fld;
                });

                data[1] = data[1].map((prpt) => {
                  prpt.type = "prpt";
                  return prpt;
                });
                setProperties([...data[0], ...data[1]]);
              })
              .catch(() => setViewState(VIEWSTATE.bug));
          else if (res.status === 401)
            return navigate("/auth", { state: { next: pathname } });
          else return setViewState(VIEWSTATE.serverError);
        })
        .catch(() => setViewState(VIEWSTATE.connLost));
      setViewState(VIEWSTATE.loading);
    }

    getProperties();
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
              placeholder="Search properties..."
              type="text"
              maxLength="100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-light shadow-none border-0"
            />
          </InputGroup>
        </Col>
        <Col lg="6" sm="12" className="d-flex justify-content-end mt-3 m-md-0">
          <Button variant="outline-primary" className="d-flex my-auto">
            <GoSettings />
          </Button>
          <Button
            variant="outline-primary"
            className="ms-3 my-auto d-flex align-items-center btn-sm"
            onClick={() => setAddFolder(true)}
          >
            <BsFolderFill className="me-1 d-none d-md-block" />
            New Folder
          </Button>
          <Button
            className="ms-3 my-auto d-flex align-items-center btn-sm shadow"
            onClick={() => navigate("/property")}
          >
            <BsHouseFill className="me-1 d-none d-md-block" />
            New Property
          </Button>
        </Col>
      </nav>
      <Row className="w-100 m-0 p-0 d-none d-md-flex">
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
              {properties.filter((tmp) => tmp.type === "fld").length}
            </h1>
            <p className="text-secondary">Folders</p>
          </div>
          <div className="p-3 px-4 d-flex flex-column align-items-center">
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              {properties.filter((tmp) => tmp.type === "prpt").length}
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
              Unselect all
            </Button>
            <Button
              variant="primary"
              className="ms-2 my-auto btn-sm d-flex align-items-center shadow"
              onClick={() => setViewState(VIEWSTATE.delete)}
            >
              <MdDeleteSweep className="me-2 d-none d-md-block" />
              Delete
            </Button>
          </div>
        </div>
      )}
      {showData()}
      <FolderModal show={addFolder} hide={() => setAddFolder(false)} />
      <ConfirmModal
        show={viewState === VIEWSTATE.delete}
        hide={() => setViewState(VIEWSTATE.none)}
        msg="Do you really want to delete the selected properties?"
        yes={delProperties}
      />
    </>
  );
};

export default Properties;
