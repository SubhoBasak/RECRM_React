import React from "react";
import { Alert, Dropdown } from "react-bootstrap";
import "./style.css";

// icons
import { BsThreeDotsVertical } from "react-icons/bs";

const WorkspaceCard = ({ data, deleteIt }) => {
  return (
    <div className="workspace-card rounded p-3 bg-white w-100">
      <div className="d-flex justify-content-between">
        <h2>{data.title}</h2>

        <Dropdown>
          <Dropdown.Toggle
            variant="outline-secondary"
            className="bg-transparent p-0 border-0"
          >
            <BsThreeDotsVertical className="text-black-50" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-3">Open</Dropdown.Item>
            <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
            <Dropdown.Item onClick={deleteIt}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex flex-wrap">
        {data.tags.map((tag, i) => (
          <Alert key={i} variant="warning" className="px-2 py-0 me-2">
            {tag}
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCard;
