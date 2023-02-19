import React from "react";
import { Button } from "react-bootstrap";
import "./style.css";

// icons
import { HiOutlineRefresh } from "react-icons/hi";

const ConnectionLost = ({ retry }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/lost.svg").default}
        alt="connection"
      />
      <h3>Connection Lost!!!</h3>
      <p>Please check your connection and try again.</p>
      <Button
        variant="primary"
        className="btn-sm shadow d-flex align-items-center"
        onClick={() => window.location.reload()}
      >
        <HiOutlineRefresh className="me-2" />
        Retry Now
      </Button>
    </div>
  );
};

export default ConnectionLost;
