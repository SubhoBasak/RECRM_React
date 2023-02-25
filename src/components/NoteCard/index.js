import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import "./style.css";

// icons
import { AiFillDelete } from "react-icons/ai";

const NoteCard = ({ data, url, remove }) => {
  const [loading, setLoading] = React.useState(false);

  function delNote() {
    fetch(process.env.REACT_APP_BASE_URL + url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: data._id }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) remove();
      })
      .catch(() => {
        setLoading(false);
      });

    setLoading(true);
  }

  return (
    <div className="bg-white rounded-4 p-3 mb-3">
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
              onClick={delNote}
            />
          )}
        </Col>
      </Row>
      <p>{data.note}</p>
    </div>
  );
};

export default NoteCard;
