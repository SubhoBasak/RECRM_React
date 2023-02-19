import React from "react";
import "./style.css";

const ConnectionLost = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/empty.svg").default}
        alt="connection"
      />
      <h3>No Records Found!!!</h3>
      <p>Add new records by clicking the add button</p>
    </div>
  );
};

export default ConnectionLost;
