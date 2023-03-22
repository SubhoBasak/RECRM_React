import React from "react";

const Deleted = ({ msg }) => {
  return (
    <div className="d-flex flex-column align-items-center my-3">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/deleted.svg").default}
        alt="empty"
        className="mb-3"
      />
      <h3 className="text-primary">Deleted!!!</h3>
      <p className="text-black-50 text-center" style={{ maxWidth: 300 }}>
        {msg}
      </p>
    </div>
  );
};

export default Deleted;
