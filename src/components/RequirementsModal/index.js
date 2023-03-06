import React from "react";
import { Modal } from "react-bootstrap";
import Loading from "../Loading";

const RequirementModal = ({ show, hide }) => {
  const [rqmns, setRqmns] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  function getRqmns() {
    fetch(process.env.REACT_APP_BASE_URL + "/rqmn")
      .then((res) => {
        setLoading(false);
        if (res.status === 200)
          res
            .json()
            .then((data) => setRqmns(data))
            .catch();
      })
      .catch(() => {
        setLoading(false);
      });

    setLoading(true);
  }

  function showData() {
    return rqmns.map(data => {
        
    })
  }

  return (
    <Modal className="modal-lg" show={show} onHide={hide}>
      <Modal.Header className="py-1" closeButton>
        <Modal.Title>Requirements</Modal.Title>
      </Modal.Header>
      <Modal.Body>{loading ? <Loading /> : showData()}</Modal.Body>
    </Modal>
  );
};

export default RequirementModal;
