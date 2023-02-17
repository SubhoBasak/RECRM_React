import React from "react";
import { Col, Row } from "react-bootstrap";
import "./style.css";

// icons
import { AiFillDelete } from "react-icons/ai";

const RemarkCard = () => {
  return (
    <div className="bg-white rounded-4 p-3 mb-3">
      <Row>
        <Col lg="11" md="11" sm="11" xs="11" className="d-flex flex-column">
          <p className="text-primary fs-5 fw-light mb-0">Subho Basak</p>
          <p className="text-secondary" style={{ fontSize: "12px" }}>
            27 May 2001
          </p>
        </Col>
        <Col lg="1" md="1" sm="1" xs="1" className="d-flex">
          <AiFillDelete size="18px" className="text-black-50 ms-auto mb-auto" />
        </Col>
      </Row>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non mi
        iaculis, ullamcorper nisl in, tempus dolor. Aenean condimentum quam non
        tellus porta dignissim eu eu augue. Phasellus eu neque nulla. Nunc
        egestas lobortis ligula, ut fermentum dolor mollis vitae. Mauris nec leo
        elit. Aenean pellentesque euismod ex, sit amet accumsan urna iaculis in.
        Nullam nec dolor placerat, varius dui vel, venenatis sem. Etiam ultrices
        dictum ante, sit amet porttitor justo lacinia eu. Ut pulvinar turpis
        tortor, a viverra leo tristique vel. Morbi ut faucibus turpis.
        Pellentesque sagittis auctor pulvinar. Aliquam aliquet egestas leo eu
        suscipit. Etiam at faucibus diam. Mauris tellus neque, dapibus vel
        lectus eget, ullamcorper tincidunt dui. Mauris ultricies arcu sem, sit
        amet cursus justo tincidunt eget. Suspendisse luctus iaculis purus
        pharetra porta. Fusce est est, gravida eget nisi ut, blandit posuere
        nunc. Sed a purus lectus. Quisque nibh erat, suscipit vel sapien et,
        ullamcorper tincidunt massa. Suspendisse pulvinar vestibulum
        scelerisque. Mauris nec ipsum sed ligula porta viverra. Integer varius
        in turpis nec consequat. Sed gravida nunc vitae ornare suscipit. Ut
        dictum vulputate enim, at faucibus velit sagittis id.
      </p>
    </div>
  );
};

export default RemarkCard;
