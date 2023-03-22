import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FloatingLabel,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

// utils
import {
  AGENT_PERMISSION,
  CALL_PERMISSION,
  CLIENT_PERMISSION,
  COMPANY_PERMISSION,
  OTHER_PERMISSION,
  PROPERTY_PERMISSION,
  REQUIREMENT_PERMISSION,
  USER_PERMISSION,
  VIEWSTATE,
} from "../../utils/constants";

// icons
import { IoIosSave } from "react-icons/io";
import { TbArrowBack } from "react-icons/tb";

// components
import PermissionToggle from "../../components/PermissionToggle";

const UserModal = () => {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const { id } = useParams();

  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [validated, setValidated] = React.useState(false);
  const [name, setName] = React.useState(state?.name || "");
  const [email, setEmail] = React.useState(state?.email || "");
  const [active, setActive] = React.useState(state?.active || false);
  const [agentPermission, setAgentPermission] = React.useState(
    state?.agentPermission || 0
  );
  const [clientPermission, setClientPermission] = React.useState(
    state?.clientPermission || 0
  );
  const [companyPermission, setCompanyPermission] = React.useState(
    state?.companyPermission || 0
  );
  const [propertyPermission, setPropertyPermission] = React.useState(
    state?.propertyPermission || 0
  );
  const [requirementPermission, setRequirementPermission] = React.useState(
    state?.requirementPermission || 0
  );
  const [callPermission, setCallPermission] = React.useState(
    state?.callPermission || 0
  );
  const [otherPermission, setOtherPermission] = React.useState(
    state?.otherPermission || 0
  );
  const [userPermission, setUserPermission] = React.useState(
    state?.userPermission || 0
  );

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    let tmpData = {
      name,
      email,
      agent_permission: agentPermission,
      client_permission: clientPermission,
      company_permission: companyPermission,
      property_permission: propertyPermission,
      requirement_permission: requirementPermission,
      call_permission: callPermission,
      other_permission: otherPermission,
      user_permission: userPermission,
    };

    id && (tmpData.id = id);

    fetch(process.env.REACT_APP_BASE_URL + "/user", {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) {
          if (id) {
          } else navigate("/users");
        } else if (res.status === 401)
          return navigate("/auth", { state: { next: pathname } });
        else setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));
    setViewState(VIEWSTATE.loading);
  }

  React.useEffect(() => {
    async function getData() {
      fetch(
        process.env.REACT_APP_BASE_URL + "/user?" + new URLSearchParams({ id })
      ).then((res) => {
        if (res.status === 200)
          res
            .json()
            .then((data) => {
              setEmail(data.email || "");
              setActive(data.active || false);
              setAgentPermission(data.agent_permission || 0);
              setClientPermission(data.client_permission || 0);
              setCompanyPermission(data.company_permission || 0);
              setRequirementPermission(data.requirement_permission || 0);
              setCallPermission(data.call_permission || 0);
              setPropertyPermission(data.property_permission || 0);
              setUserPermission(data.user_permission || 0);
              setOtherPermission(data.other_permission || 0);
            })
            .catch();
        else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      });
    }

    getData();
  }, [id]);

  return (
    <>
      <nav>
        <p className="text-primary me-auto">Manage user</p>
        <Button
          className="my-auto d-flex align-items-center btn-sm shadow"
          onClick={() =>
            id ? navigate("/users") : setViewState(VIEWSTATE.cancel)
          }
        >
          <TbArrowBack className="me-2" />
          {id ? "Return" : "Cancel"}
        </Button>
      </nav>
      <Row className="w-100 m-0 p-0 d-none d-md-flex">
        <Col lg="6" md="6" sm="12" className="d-flex align-items-center my-5">
          <img
            src={require("../../assets/svgs/people.svg").default}
            alt="people"
            width="128"
            height="128"
            className="mx-5"
          />
          <div>
            <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
              User Details
            </h1>
            <p className="text-secondary fw-light mb-0">
              View and edit user details
            </p>
          </div>
        </Col>
        {id && (
          <Col
            lg="6"
            md="6"
            sm="12"
            className="d-flex justify-content-center align-items-center"
          >
            <div className="p-2 px-4 d-flex flex-column align-items-center">
              <h1 className="fs-1" style={{ fontFamily: "pacifico" }}>
                100
              </h1>
              <p className="text-secondary">Requirements</p>
            </div>
          </Col>
        )}
      </Row>
      <Row className="w-100 m-0 p-0">
        <Col lg="9">
          <Form
            className="rounded-3 bg-white p-3 mb-4"
            onSubmit={formSubmitHandler}
            validated={validated}
            noValidate
          >
            <Form.Group className="mb-3">
              <FloatingLabel label="Name">
                <Form.Control
                  type="text"
                  maxLength="100"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field is required!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Email">
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email!
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <p className="text-primary mt-3 mb-0">Permissions</p>
            <Row>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Agent related permissions
                  </p>
                  <PermissionToggle
                    label="Can add agent"
                    permissionSet={agentPermission}
                    thisPermission={AGENT_PERMISSION.ADD_AGENT}
                    setPermissionSet={setAgentPermission}
                  />
                  <PermissionToggle
                    label="Can edit agent"
                    permissionSet={agentPermission}
                    thisPermission={AGENT_PERMISSION.EDT_AGENT}
                    setPermissionSet={setAgentPermission}
                  />
                  <PermissionToggle
                    label="Can delete agent"
                    permissionSet={agentPermission}
                    thisPermission={AGENT_PERMISSION.DEL_AGENT}
                    setPermissionSet={setAgentPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can add agent note"
                    permissionSet={agentPermission}
                    thisPermission={AGENT_PERMISSION.ADD_AGENT_NOTE}
                    setPermissionSet={setAgentPermission}
                  />
                  <PermissionToggle
                    label="Can delete agent note"
                    permissionSet={agentPermission}
                    thisPermission={AGENT_PERMISSION.DEL_AGENT_NOTE}
                    setPermissionSet={setAgentPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Client related permissions
                  </p>
                  <PermissionToggle
                    label="Can add client"
                    permissionSet={clientPermission}
                    thisPermission={CLIENT_PERMISSION.ADD_CLIENT}
                    setPermissionSet={setClientPermission}
                  />
                  <PermissionToggle
                    label="Can edit client"
                    permissionSet={clientPermission}
                    thisPermission={CLIENT_PERMISSION.EDT_CLIENT}
                    setPermissionSet={setClientPermission}
                  />
                  <PermissionToggle
                    label="Can delete client"
                    permissionSet={clientPermission}
                    thisPermission={CLIENT_PERMISSION.DEL_CLIENT}
                    setPermissionSet={setClientPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can add client note"
                    permissionSet={clientPermission}
                    thisPermission={CLIENT_PERMISSION.ADD_CLIENT_NOTE}
                    setPermissionSet={setClientPermission}
                  />
                  <PermissionToggle
                    label="Can delete client note"
                    permissionSet={clientPermission}
                    thisPermission={CLIENT_PERMISSION.DEL_CLIENT_NOTE}
                    setPermissionSet={setClientPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Company related permissions
                  </p>
                  <PermissionToggle
                    label="Can add company"
                    permissionSet={companyPermission}
                    thisPermission={COMPANY_PERMISSION.ADD_COMPANY}
                    setPermissionSet={setCompanyPermission}
                  />
                  <PermissionToggle
                    label="Can edit company"
                    permissionSet={companyPermission}
                    thisPermission={COMPANY_PERMISSION.EDT_COMPANY}
                    setPermissionSet={setCompanyPermission}
                  />
                  <PermissionToggle
                    label="Can delete company"
                    permissionSet={companyPermission}
                    thisPermission={COMPANY_PERMISSION.DEL_COMPANY}
                    setPermissionSet={setCompanyPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can add company note"
                    permissionSet={companyPermission}
                    thisPermission={COMPANY_PERMISSION.ADD_COMPANY_NOTE}
                    setPermissionSet={setCompanyPermission}
                  />
                  <PermissionToggle
                    label="Can delete company note"
                    permissionSet={companyPermission}
                    thisPermission={COMPANY_PERMISSION.DEL_COMPANY_NOTE}
                    setPermissionSet={setCompanyPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Property related permissions
                  </p>
                  <PermissionToggle
                    label="Can add property"
                    permissionSet={propertyPermission}
                    thisPermission={PROPERTY_PERMISSION.ADD_PROPERTY}
                    setPermissionSet={setPropertyPermission}
                  />
                  <PermissionToggle
                    label="Can edit property"
                    permissionSet={propertyPermission}
                    thisPermission={PROPERTY_PERMISSION.EDT_PROPERTY}
                    setPermissionSet={setPropertyPermission}
                  />
                  <PermissionToggle
                    label="Can delete property"
                    permissionSet={propertyPermission}
                    thisPermission={PROPERTY_PERMISSION.DEL_PROPERTY}
                    setPermissionSet={setPropertyPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can add property folder"
                    permissionSet={propertyPermission}
                    thisPermission={PROPERTY_PERMISSION.ADD_FOLDER}
                    setPermissionSet={setPropertyPermission}
                  />
                  <PermissionToggle
                    label="Can edit property folder"
                    permissionSet={propertyPermission}
                    thisPermission={PROPERTY_PERMISSION.EDT_FOLDER}
                    setPermissionSet={setPropertyPermission}
                  />
                  <PermissionToggle
                    label="Can delete property folder"
                    permissionSet={propertyPermission}
                    thisPermission={PROPERTY_PERMISSION.DEL_FOLDER}
                    setPermissionSet={setPropertyPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Requirement related permissions
                  </p>
                  <PermissionToggle
                    label="Can add client requirement"
                    permissionSet={requirementPermission}
                    thisPermission={REQUIREMENT_PERMISSION.ADD_CLIENT_REQM}
                    setPermissionSet={setRequirementPermission}
                  />
                  <PermissionToggle
                    label="Can edit client requirement"
                    permissionSet={requirementPermission}
                    thisPermission={REQUIREMENT_PERMISSION.EDT_CLIENT_REQM}
                    setPermissionSet={setRequirementPermission}
                  />
                  <PermissionToggle
                    label="Can delete client requirement"
                    permissionSet={requirementPermission}
                    thisPermission={REQUIREMENT_PERMISSION.DEL_CLIENT_REQM}
                    setPermissionSet={setRequirementPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can add company requirement"
                    permissionSet={requirementPermission}
                    thisPermission={REQUIREMENT_PERMISSION.ADD_COMPANY_REQM}
                    setPermissionSet={setRequirementPermission}
                  />
                  <PermissionToggle
                    label="Can edit company requirement"
                    permissionSet={requirementPermission}
                    thisPermission={REQUIREMENT_PERMISSION.EDT_COMPANY_REQM}
                    setPermissionSet={setRequirementPermission}
                  />
                  <PermissionToggle
                    label="Can delete company requirement"
                    permissionSet={requirementPermission}
                    thisPermission={REQUIREMENT_PERMISSION.DEL_COMPANY_REQM}
                    setPermissionSet={setRequirementPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Call related permissions
                  </p>
                  <PermissionToggle
                    label="Can add client call"
                    permissionSet={callPermission}
                    thisPermission={CALL_PERMISSION.ADD_CLIENT_CALL}
                    setPermissionSet={setCallPermission}
                  />
                  <PermissionToggle
                    label="Can edit client call"
                    permissionSet={callPermission}
                    thisPermission={CALL_PERMISSION.EDT_CLIENT_CALL}
                    setPermissionSet={setCallPermission}
                  />
                  <PermissionToggle
                    label="Can delete client call"
                    permissionSet={callPermission}
                    thisPermission={CALL_PERMISSION.DEL_CLIENT_CALL}
                    setPermissionSet={setCallPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can add company call"
                    permissionSet={callPermission}
                    thisPermission={CALL_PERMISSION.ADD_COMPANY_CALL}
                    setPermissionSet={setCallPermission}
                  />
                  <PermissionToggle
                    label="Can edit company call"
                    permissionSet={callPermission}
                    thisPermission={CALL_PERMISSION.EDT_COMPANY_CALL}
                    setPermissionSet={setCallPermission}
                  />
                  <PermissionToggle
                    label="Can delete company call"
                    permissionSet={callPermission}
                    thisPermission={CALL_PERMISSION.DEL_COMPANY_CALL}
                    setPermissionSet={setCallPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    Other permissions
                  </p>
                  <PermissionToggle
                    label="Can add company representative"
                    permissionSet={otherPermission}
                    thisPermission={OTHER_PERMISSION.ADD_REPRESENTATIVE}
                    setPermissionSet={setOtherPermission}
                  />
                  <PermissionToggle
                    label="Can edit company representative"
                    permissionSet={otherPermission}
                    thisPermission={OTHER_PERMISSION.EDT_REPRESENTATIVE}
                    setPermissionSet={setOtherPermission}
                  />
                  <PermissionToggle
                    label="Can delete company representative"
                    permissionSet={otherPermission}
                    thisPermission={OTHER_PERMISSION.DEL_REPRESENTATIVE}
                    setPermissionSet={setOtherPermission}
                  />
                  <hr className="my-2" />
                  <PermissionToggle
                    label="Can edit stage"
                    permissionSet={otherPermission}
                    thisPermission={OTHER_PERMISSION.EDT_STAGE}
                    setPermissionSet={setOtherPermission}
                  />
                </div>
              </Col>
              <Col lg="6" sm="12" className="d-flex">
                <div className="w-100 bg-light rounded-3 px-3 py-1 mt-3 mb-2">
                  <p
                    className="text-secondary mb-0 mt-2"
                    style={{ fontSize: 14 }}
                  >
                    User related permissions
                  </p>
                  <PermissionToggle
                    label="Can add user"
                    permissionSet={userPermission}
                    thisPermission={USER_PERMISSION.ADD_USER}
                    setPermissionSet={setUserPermission}
                  />
                  <PermissionToggle
                    label="Can edit user"
                    permissionSet={userPermission}
                    thisPermission={USER_PERMISSION.EDT_USER}
                    setPermissionSet={setUserPermission}
                  />
                  <PermissionToggle
                    label="Can delete user"
                    permissionSet={userPermission}
                    thisPermission={USER_PERMISSION.DEL_USER}
                    setPermissionSet={setUserPermission}
                  />
                </div>
              </Col>
              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="btn-sm shadow my-3"
                >
                  {viewState === VIEWSTATE.loading ? (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                  ) : (
                    <IoIosSave className="me-2" />
                  )}
                  {id ? "Update" : "Add User"}
                </Button>
              </div>
            </Row>
          </Form>
        </Col>
        <Col lg="3" className={"order-1 order-lg-2" + (id ? "" : " d-none")}>
          <div className="d-flex flex-column align-items-center mb-5 position-sticky top-0 mx-auto">
            <img
              src={require("../../assets/svgs/person.svg").default}
              width="180"
              height="180"
              alt="person"
              className="my-3"
            />
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Login history
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              {active ? "Deactive" : "Active"}
            </Button>
            <Button variant="primary" className="btn-sm mt-3 w-75 shadow">
              Delete
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default UserModal;
