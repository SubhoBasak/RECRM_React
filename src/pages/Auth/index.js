import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Modal,
  FloatingLabel,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { VIEWSTATE } from "../../utils/constants";

// components
import ConnectionLostModal from "../../components/ConnectionLostModal";
import InternalServerErrorModal from "../../components/InternalServerErrorModal";

const Auth = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [viewState, setViewState] = React.useState(VIEWSTATE.none);
  const [validated, setValidated] = React.useState(false);
  const [otpSend, setOtpSend] = React.useState(false);
  const [email, setEmail] = React.useState(localStorage.getItem("email") || "");
  const [otp, setOtp] = React.useState("");

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }
    setValidated(false);

    localStorage.setItem("email", email);

    fetch(process.env.REACT_APP_BASE_URL + "/auth", {
      method: otpSend ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
      credentials: "include",
    })
      .then((res) => {
        setViewState(VIEWSTATE.none);
        if (res.status === 200) {
          if (otpSend) {
            navigate(state?.next || "/");
          } else {
            setOtpSend(true);
          }
        } else if (res.status === 401) {
        } else if (res.status === 404) {
        } else if (res.status === 500) setViewState(VIEWSTATE.serverError);
      })
      .catch(() => setViewState(VIEWSTATE.connLost));

    setViewState(VIEWSTATE.loading);
    setOtpSend(true);
  }

  return (
    <>
      <Modal show={true} fullscreen className="d-flex bg-white">
        <Row className="w-100 m-0 p-0">
          <Col
            lg="7"
            className="d-flex flex-column align-items-center justify-content-center py-5"
          >
            <img
              className="mb-3"
              src={require("../../assets/images/auth.jpg")}
              width="70%"
              alt="auth"
            />
            <h1 className="display-1 text-center">
              Real Estate <span className="text-primary fw-bold">CRM</span>
            </h1>
          </Col>
          <Col
            lg="5"
            className="bg-light d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <h2 className="my-5 display-5 text-black-50">
              <span className="text-secondary fw-bold">@ </span>
              <strong className="fw-bold text-black">Login </strong>Now
            </h2>
            <Alert variant="warning" className="w-75 rounded-3 mb-5">
              Don't need to remember any hanky panky password. Just enter your
              registerd email and verify through the OTP and boom, you are good
              to go!
            </Alert>
            <Form
              className="w-75 d-flex flex-column align-items-center justify-content-center"
              onSubmit={formSubmitHandler}
              validated={validated}
              noValidate
            >
              <Form.Group className="mb-3 w-100">
                <FloatingLabel label="Email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={otpSend}
                    disabled={otpSend}
                    autoFocus
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the registerd email!
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              {otpSend && (
                <>
                  <Form.Group className="mb-3 w-100">
                    <FloatingLabel label="OTP">
                      <Form.Control
                        type="text"
                        maxLength={100}
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        readOnly={!otpSend}
                        disabled={!otpSend}
                        autoFocus
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <p
                    className="text-black-50 w-100"
                    onClick={() => {
                      setOtpSend(false);
                      setValidated(false);
                      setViewState(VIEWSTATE.none);
                    }}
                  >
                    Wrong email?{" "}
                    <span className="text-primary">Change now</span>
                  </p>
                </>
              )}
              <div className="w-100 d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="btn-sm shadow mb-5"
                >
                  {viewState === VIEWSTATE.loading && (
                    <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                  )}
                  Verify Now
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal>
      <ConnectionLostModal
        show={viewState === VIEWSTATE.connLost}
        hide={() => setViewState(VIEWSTATE.none)}
      />
      <InternalServerErrorModal
        show={viewState === VIEWSTATE.serverError}
        hide={() => setViewState(VIEWSTATE.none)}
      />
    </>
  );
};

export default Auth;
