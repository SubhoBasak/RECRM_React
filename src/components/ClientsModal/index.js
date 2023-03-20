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
          {clients.length === 0 ? (
            <NoRecords />
          ) : (
            <>
              <Row className="text-black-50 fw-bold">
                <Col lg="3" className="d-none d-lg-block">
                  Name
                </Col>
                <Col lg="2" className="d-none d-lg-block">
                  Phone
                </Col>
                <Col lg="2" className="d-none d-lg-block">
                  Email
                </Col>
                <Col lg="3" className="d-none d-lg-block">
                  Address
                </Col>
                <Col lg="1" className="d-none d-lg-block" />
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
