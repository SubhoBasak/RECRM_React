import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

// utils
import { VIEWSTATE } from "../../utils/constants";

// components
import NoRecords from "../NoRecords";
import DeleteModal from "../DeleteModal";
import ClientCard from "../ClientCard";

const ClientsModal = ({ show, hide, clients }) => {
  const [viewState, setViewState] = React.useState(VIEWSTATE.none);

  return (
    <>
      <Modal className="modal-lg" show={show} onHide={hide}>
        <Modal.Header className="modal-lg" closeButton>
          <Modal.Title>Clients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log(clients)}
          {clients.length === 0 ? (
            <NoRecords />
          ) : (
            <>
              <Row className="text-black-50 fw-bold">
                <Col lg="3">Name</Col>
                <Col lg="2">Phone</Col>
                <Col lg="2">Email</Col>
                <Col lg="3">Address</Col>
                <Col lg="1" />
              </Row>
              {clients.map((client, i) => (
                <ClientCard key={i} data={client} />
              ))}
            </>
          )}
        </Modal.Body>
      </Modal>
      <DeleteModal
        show={viewState === VIEWSTATE.delete}
        onHide={() => setViewState(VIEWSTATE.none)}
        msg="Do you really want to delete these clients?"
      />
    </>
  );
};

export default ClientsModal;
