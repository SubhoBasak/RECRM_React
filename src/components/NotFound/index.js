import React from "react";

const NotFound = () => {
  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      <img
        width={240}
        height={240}
        src={require("../../assets/svgs/notFound.svg").default}
        alt="empty"
      />
      <h3>Not Found!!!</h3>
      <p className="text-center text-black-50" style={{ maxWidth: 300 }}>
        Couldn't found what are you looking for. Please try with some other
        keywords.
      </p>
    </div>
  );
};

export default NotFound;
