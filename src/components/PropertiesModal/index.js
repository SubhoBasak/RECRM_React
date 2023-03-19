import React from "react";
import { Modal } from "react-bootstrap";

const PropertiesModal = ({ show, hide, properties }) => {
  const [selected, setSelected] = React.useState([]);

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header className="py-2" closeButton>
        <Modal.Title>Select properties</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default PropertiesModal;
