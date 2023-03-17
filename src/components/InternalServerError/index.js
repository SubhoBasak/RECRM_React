import React from "react";
import { Button } from "react-bootstrap";

// icons
import { HiOutlineRefresh } from "react-icons/hi";

const InternalServerError = ({ retry, cancel }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/server.svg").default}
        alt="server"
      />
      <h3>Internal Server Error!!!</h3>
      <p>Something went wrong! Please try again.</p>
      <div className="d-flex justify-content-center align-items-center">
        {cancel && (
          <Button
            variant="outline-primary"
            className="btn-sm me-2"
            onClick={cancel}
          >
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

export default InternalServerError;
