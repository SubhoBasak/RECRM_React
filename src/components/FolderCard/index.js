import React from "react";
import { Card, FormCheck, Modal } from "react-bootstrap";

const FolderCard = ({ data, selected, setSelected }) => {
  const [showPreview, setShowPreview] = React.useState(false);

  function selectFolder() {
    let indx = selected.findIndex(
      (prpt) => prpt.id === data._id && prpt.type === "fld"
    );

    if (indx > -1)
      setSelected(
        selected.filter(
          (prpt) => !(prpt.id === data._id && prpt.type === "fld")
        )
      );
    else setSelected([...selected, { id: data._id, type: "fld" }]);
  }

  return (
    <>
      <Card className="mt-4 ms-4 border-0" style={{ width: "260px" }} draggable>
        <FormCheck
          checked={
            selected.findIndex(
              (prpt) => prpt.id === data._id && prpt.type === "fld"
            ) > -1
          }
          className="position-absolute top-0 m-1 pb-0"
          onChange={selectFolder}
        />
        <Card.Img
          variant="top"
          src="https://picsum.photos/512"
          width="240"
          height="90"
          alt="property"
          style={{
            minHeight: "90px",
            maxHeight: "90px",
            minWidth: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          }}
          onClick={() => setShowPreview(true)}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-center">{data.name}</Card.Title>
          <div className="d-flex justify-content-between">
            <div
              className="my-2 py-2 d-flex flex-column justify-content-center align-items-center border-end"
              style={{ width: "33%" }}
            >
              <p className="text-primary fw-bold mb-0">128</p>
              <span className="text-black-50" style={{ fontSize: "10px" }}>
                Residential
              </span>
            </div>
            <div
              className="my-2 py-2 d-flex flex-column justify-content-center align-items-center border-end"
              style={{ width: "33%" }}
            >
              <p className="text-primary fw-bold mb-0">32</p>
              <span className="text-black-50" style={{ fontSize: "10px" }}>
                Commercial
              </span>
            </div>
            <div
              className="my-2 py-2 d-flex flex-column justify-content-center align-items-center"
              style={{ width: "33%" }}
            >
              <p className="text-primary fw-bold mb-0">17</p>
              <span className="text-black-50" style={{ fontSize: "10px" }}>
                Institutional
              </span>
            </div>
          </div>
          {data.info && (
            <p className="fw-light" style={{ fontSize: "12px" }}>
              {data.info}
            </p>
          )}
        </Card.Body>
      </Card>
      <Modal show={showPreview} onHide={() => setShowPreview(false)} centered>
        <img
          src="https://picsum.photos/512"
          alt="preview"
          className="rounded"
        />
      </Modal>
    </>
  );
};

export default FolderCard;
