import React from "react";
import { Col, Row } from "react-bootstrap";

// icons
import { AiFillDelete } from "react-icons/ai";

// components
import DeleteModal from "../../components/DeleteModal";

const NoteCard = ({ data, url, remove }) => {
  const [deleteIt, setDeleteIt] = React.useState(false);

  return (
    <>
      <div className="bg-white rounded-3 p-3 mb-3">
        <Row>
          <Col lg="11" md="11" sm="11" xs="11" className="d-flex flex-column">
            <p className="text-primary fs-5 fw-light mb-0">Subho Basak</p>
            <p className="text-secondary" style={{ fontSize: "12px" }}>
              {new Date(data.createdAt).toLocaleDateString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </Col>
          <Col lg="1" md="1" sm="1" xs="1" className="d-flex">
            <AiFillDelete
              size="18px"
              className="text-black-50 ms-auto mb-auto"
              onClick={() => setDeleteIt(true)}
            />
          </Col>
        </Row>
        <p>{data.note}</p>
      </div>
      <DeleteModal
        show={deleteIt}
        hide={() => setDeleteIt(false)}
        url={url}
        body={{ id: data._id }}
        remove={() => {
          remove();
          setDeleteIt(false);
        }}
        msg="Do you really want to delete the note?"
      />
    </>
  );
};

export default NoteCard;
