import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Spinner } from "react-bootstrap";

// icons
import { AiFillDelete } from "react-icons/ai";

// components
import ConfirmModal from "../ConfirmModal";

const CompanyNoteCard = ({ data, remove }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [loading, setLoading] = React.useState(false);
  const [deleteIt, setDeleteIt] = React.useState(false);

  function deleteNote() {
    setDeleteIt(false);
    fetch(process.env.REACT_APP_BASE_URL + "/company/note", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: data._id }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) remove();
        else if (res.status === 401)
          navigate("/auth", { state: { next: pathname } });
      })
      .catch(() => {
        setLoading(false);
      });

    setLoading(true);
  }

  return (
    <>
      <div className="bg-white rounded-3 p-3 mb-3">
        <Row>
          <Col lg="11" md="11" sm="11" xs="11" className="d-flex flex-column">
            <p className="text-primary fs-5 fw-light mb-0">Subho Basak</p>
            <p className="text-secondary" style={{ fontSize: "12px" }}>
              27 May 2001
            </p>
          </Col>
          <Col lg="1" md="1" sm="1" xs="1" className="d-flex">
            {loading ? (
              <Spinner size="sm" className="text-black-50 ms-auto mb-auto" />
            ) : (
              <AiFillDelete
                size="18px"
                className="text-black-50 ms-auto mb-auto"
                onClick={() => setDeleteIt(true)}
              />
            )}
          </Col>
        </Row>
        <div className="d-flex flex-wrap">
          {/* {data.tagged.map((tag, i) => (
          <Alert
            variant="primary"
            onClick={() => navigate("/representative/" + tag.id)}
          >
            {tag.name}
          </Alert>
        ))} */}
        </div>
        <p>{data.note}</p>
      </div>
      <ConfirmModal
        show={deleteIt}
        hide={() => setDeleteIt(false)}
        msg="Do you really want to delete the note?"
        yes={deleteNote}
      />
    </>
  );
};

export default CompanyNoteCard;
