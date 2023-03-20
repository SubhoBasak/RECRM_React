import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

// icons
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="sidebar bg-white">
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
        width="144"
        height="144"
      />
      <h1 className="fs-5 mb-5 mx-auto text-center">Subho</h1>
      <Link to="/" className={pathname === "/" ? "active" : ""}>
        <MdSpaceDashboard />
        Dashboard
      </Link>
      <Link
        to="/all_contacts"
        className={
          pathname === "/all_contacts" ||
          pathname.startsWith("/client_details") ||
          pathname.startsWith("/company_details") ||
          pathname.startsWith("/agent_details")
            ? "active"
            : ""
        }
      >
        <FaUserFriends />
        Contacts
      </Link>
      <Link
        to="/properties"
        className={
          pathname === "/properties" || pathname.startsWith("/property")
            ? "active"
            : ""
        }
      >
        <RiBuilding2Fill />
        Properties
      </Link>
      <Link
        to="/leads"
        className={
          pathname === "/leads" ||
          pathname.startsWith("/requirement") ||
          pathname.startsWith("/companyRequirement")
            ? "active"
            : ""
        }
      >
        <BsFileEarmarkBarGraphFill />
        LEAD
      </Link>
      <Link
        to="/users"
        className={
          pathname === "/users" || pathname.startsWith("/user_details")
            ? "active"
            : ""
        }
      >
        <FaUsers />
        Users
      </Link>
    </div>
  );
};

export default Sidebar;
