import React from "react";

// icons
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

const PermissionToggle = ({
  label,
  permissionSet,
  thisPermission,
  setPermissionSet,
}) => {
  const value = (permissionSet & thisPermission) === thisPermission;

  return (
    <div className="d-flex align-items-center justify-content-between mb-0">
      <label className="text-black-50">{label}</label>
      <button
        type="button"
        className="bg-transparent border-0 fs-4"
        onClick={() =>
          setPermissionSet(
            value
              ? permissionSet ^ thisPermission
              : permissionSet | thisPermission
          )
        }
      >
        {value ? (
          <BsToggleOn className="text-primary" />
        ) : (
          <BsToggleOff className="text-black-50" />
        )}
      </button>
    </div>
  );
};

export default PermissionToggle;
