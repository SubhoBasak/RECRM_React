import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

// icons
import { HiOutlineRefresh } from "react-icons/hi";

const ConnectionLost = ({ retry, cancel }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/lost.svg").default}
        alt="connection"
      />
      <h3>Connection Lost!!!</h3>
      <p>Please check your network and try again.</p>
      <div className="d-flex justify-content-center align-items-center">
        {cancel && (
          <Button variant="outline-primary" className="btn-sm me-2" onClick={cancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="primary"
          className="btn-sm shadow d-flex align-items-center"
          onClick={retry || (() => window.location.reload())}
        >
          <HiOutlineRefresh className="me-2" />
          Retry Now
        </Button>
      </div>
    </div>
  );
};

export default ConnectionLost;
