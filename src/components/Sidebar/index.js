import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

// icons
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const Sidebar = () => {
  const [curSel, setCurSel] = React.useState(0);

  return (
    <div className="sidebar d-flex flex-column">
      <img
        className="my-3 mx-auto rounded-3"
        src={require("../../assets/svgs/logo.svg").default}
        height="24"
        alt="logo"
      />
      <img
        className="mt-5 mb-3 mx-auto rounded-circle"
        src="https://picsum.photos/512"
        alt="Contacts"
        width="128"
        height="128"
      />
      <h1 className="fs-5 mb-5 mx-auto text-center">Subho</h1>
      <Link
        to="/"
        className={curSel === 0 ? "active" : ""}
        onClick={() => setCurSel(0)}
      >
        <MdSpaceDashboard />
        Dashboard
      </Link>
      <Link
        to="/all_contacts"
        className={curSel === 1 ? "active" : ""}
        onClick={() => setCurSel(1)}
      >
        <FaUserFriends />
        Contacts
      </Link>
      <Link
        to="/properties"
        className={curSel === 2 ? "active" : ""}
        onClick={() => setCurSel(2)}
      >
        <RiBuilding2Fill />
        Properties
      </Link>
      <Link
        to="/lead"
        className={curSel === 3 ? "active" : ""}
        onClick={() => setCurSel(3)}
      >
        <BsFileEarmarkBarGraphFill />
        LEADs
      </Link>
    </div>
  );
};

export default Sidebar;
