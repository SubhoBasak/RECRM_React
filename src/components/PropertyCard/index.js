import React from "react";
import { Card, Alert, FormCheck } from "react-bootstrap";
import "./style.css";

const PropertyCard = ({ data, selected, setSelected }) => {
  function categoryName(c) {
    switch (c) {
      case 1:
        return "Residential";
      case 2:
        return "Commercial";
      case 3:
        return "Other";
      default:
        return "Category not mentioned";
    }
  }

  function selectContact() {
    let indx = selected.findIndex(
      (prpt) => prpt.id === data._id && prpt.type === 1
    );

    if (indx > -1)
      setSelected(
        selected.filter((prpt) => !(prpt.id === data._id && prpt.type === 1))
      );
    else setSelected([...selected, { id: data._id, type: 1 }]);
  }

  return (
    <Card className="mt-4 ms-4 border-0" style={{ width: "260px" }} draggable>
      <FormCheck
        checked={
          selected.findIndex(
            (prpt) => prpt.id === data._id && prpt.type === 1
          ) > -1
        }
        className="position-absolute top-0 m-1 shadow"
        onChange={selectContact}
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
      />
      <Card.Body>
        <Card.Title className="text-center">{data.title}</Card.Title>
        <Alert
          variant="warning"
          className="p-0 px-2 mx-auto"
          style={{ fontSize: "12px", maxWidth: "fit-content" }}
        >
          {categoryName(data.category)}
        </Alert>
        <div className="d-flex justify-content-between">
          <p className="text-primary me-2" style={{ fontSize: "12px" }}>
            {data.price ? data.price + " /-" : "Price not mentioned"}
          </p>
          <p className="text-secondary text-right" style={{ fontSize: "12px" }}>
            {data.area ? data.area + " sqft" : "Area not mentioned"}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold d-flex flex-column align-items-center p-2 me-2 border-end">
            25
            <span
              className="fw-light text-black-50"
              style={{ fontSize: "10px" }}
            >
              Looking
            </span>
          </p>
          <p className="fw-light mb-auto" style={{ fontSize: "12px" }}>
            {data.address1}
            {data.address2 ? ", " + data.address2 : ""}
            {data.city ? ", " + data.city : ""}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PropertyCard;
