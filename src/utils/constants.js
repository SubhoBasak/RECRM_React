export const VIEWSTATE = {
  none: 0,
  loading: 1,
  clear: 2,
  cancel: 3,
  delete: 4,
  connLost: 5,
  serverError: 6,
  showDetails: 7,
};

// permissions
export const AGENT_PERMISSION = {
  ADD_AGENT: 1 << 1,
  EDT_AGENT: 1 << 2,
  DEL_AGENT: 1 << 3,

  ADD_AGENT_NOTE: 1 << 4,
  DEL_AGENT_NOTE: 1 << 5,
};

export const CLIENT_PERMISSION = {
  ADD_CLIENT: 1 << 1,
  EDT_CLIENT: 1 << 2,
  DEL_CLIENT: 1 << 3,

  ADD_CLIENT_NOTE: 1 << 4,
  DEL_CLIENT_NOTE: 1 << 5,
};

export const COMPANY_PERMISSION = {
  ADD_COMPANY: 1 << 1,
  EDT_COMPANY: 1 << 2,
  DEL_COMPANY: 1 << 3,

  ADD_COMPANY_NOTE: 1 << 4,
  DEL_COMPANY_NOTE: 1 << 5,
};

export const REQUIREMENT_PERMISSION = {
  ADD_CLIENT_REQM: 1 << 1,
  EDT_CLIENT_REQM: 1 << 2,
  DEL_CLIENT_REQM: 1 << 3,

  ADD_COMPANY_REQM: 1 << 4,
  EDT_COMPANY_REQM: 1 << 5,
  DEL_COMPANY_REQM: 1 << 6,
};

export const CALL_PERMISSION = {
  ADD_CLIENT_CALL: 1 << 1,
  EDT_CLIENT_CALL: 1 << 2,
  DEL_CLIENT_CALL: 1 << 3,

  ADD_COMPANY_CALL: 1 << 4,
  EDT_COMPANY_CALL: 1 << 5,
  DEL_COMPANY_CALL: 1 << 6,
};

export const PROPERTY_PERMISSION = {
  ADD_FOLDER: 1 << 1,
  EDT_FOLDER: 1 << 2,
  DEL_FOLDER: 1 << 3,

  ADD_PROPERTY: 1 << 4,
  EDT_PROPERTY: 1 << 5,
  DEL_PROPERTY: 1 << 6,
};

export const OTHER_PERMISSION = {
  ADD_REPRESENTATIVE: 1 << 1,
  EDT_REPRESENTATIVE: 1 << 2,
  DEL_REPRESENTATIVE: 1 << 3,

  EDT_STAGE: 1 << 4,
};

export const USER_PERMISSION = {
  VEW_USER: 1 << 1,
  ADD_USER: 1 << 2,
  EDT_USER: 1 << 3,
  DEL_USER: 1 << 4,
};
