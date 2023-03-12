import React from "react";
import { Button } from "react-bootstrap";

// icons
import { HiOutlineRefresh } from "react-icons/hi";

const Bug = () => {
  return (
    <div className="my-5 d-flex flex-column w-100 justify-content-center align-items-center">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/error.svg").default}
        alt="bug"
      />
      <h3>Bad Response!!!</h3>
      <p>Something went wrong! Please try again</p>
      <Button
        variant="primary"
        className="btn-sm d-flex align-items-center"
        onClick={() => window.location.reload()}
      >
        <HiOutlineRefresh className="me-2" />
        Retry Now
      </Button>
    </div>
  );
};

export default Bug;
