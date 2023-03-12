import React from "react";
import {
  Alert,
  Button,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";

// icons
import { MdClose } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { IoWarningOutline } from "react-icons/io5";

const WorkspaceModal = ({ show, hide, data, workspaces, setWorkspaces }) => {
  const [title, setTitle] = React.useState(data?.title || "");
  const [tags, setTags] = React.useState(data?.tags || []);
  const [tag, setTag] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [validated, setValidated] = React.useState(false);
  const [status, setStatus] = React.useState(0); // 0 - nothing, 1 - not unique, 2 - empty

  function addTag(e) {
    e.preventDefault();

    if (tag === "") return setStatus(2);

    let indx = tags.findIndex((t) => t === tag);
    if (indx === -1) {
      setTags([tag, ...tags]);
      setTag("");
      setStatus(0);
    } else setStatus(1);
  }

  function formSubmitHandler(e) {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return e.stopPropagation();
    }

    setValidated(false);

    let tmpData = { title };
    if (tags.length > 0) tmpData.tags = tags;
    if (data) tmpData.id = data.id;

    fetch(process.env.REACT_APP_BASE_URL + "/workspace", {
      method: data ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpData),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          if (data) {
          } else
            res
              .json()
              .then((resp) =>
                setWorkspaces([{ _id: resp.id, title, tags }, ...workspaces])
              );
          setTitle("");
          setTags([]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
    setLoading(true);
  }

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header className="py-2" closeButton>
        <Modal.Title>Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addTag} className="mt-0 mb-3">
          <p className="text-secondary mb-3">Tags</p>
          <div className="d-flex flex-wrap">
            {tags.length === 0 ? (
              <p className="text-black-50">No tag added!</p>
            ) : (
              tags.map((tag, i) => (
                <Alert
                  key={i}
                  variant="primary"
                  className="py-0 px-2 me-2"
                  style={{ width: "fit-content" }}
                >
                  {tag}
                  <MdClose
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                  />
                </Alert>
              ))
            )}
          </div>
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text"
                maxLength="50"
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                noValidate
              />
            </InputGroup>
            <Alert
              variant="warning"
              className="p-1 px-2 mt-2"
              style={{ display: status === 0 ? "none" : "block" }}
            >
              <IoWarningOutline />
              {status === 1 ? "Tag must be unique!" : "Tag can't be empty!"}
            </Alert>
          </Form.Group>
        </Form>
        <Form onSubmit={formSubmitHandler} validated={validated} noValidate>
          <Form.Group>
            <FloatingLabel label="Title">
              <Form.Control
                type="text"
                maxLength={100}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <div className="mt-3 d-flex justify-content-center">
            <Button type="submit" variant="primary" className="btn-sm shadow">
              {loading ? (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
              ) : (
                <TiTickOutline className="me-2" />
              )}
              {data ? "Update" : "Create Now"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WorkspaceModal;
