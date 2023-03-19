import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

// icons
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { RiBuilding2Fill } from "react-icons/ri";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";

const BottomBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="bottom-bar bottom-0 position-fixed w-100 d-flex d-md-none align-items-center justify-content-around bg-white shadow">
      <Link to="/" className={pathname === "/" ? "active" : ""}>
        <MdSpaceDashboard />
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
      </Link>
    </div>
  );
};

export default BottomBar;
