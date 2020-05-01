import React from "react";
import SearchPath from "./searchPath";
import Pagination from "./pagination";
import ItemGrid from "./itemGrid";
import KeywordFilter from "./keywordFilter";
import ImageModal from "./imageModal";
import VideoModal from "./videoModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ViewerContainer extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <div className="float-left">
              <SearchPath />
            </div>
          </Col>
          <Col>
            <div className="float-right">
              <KeywordFilter />
            </div>
          </Col>
        </Row>
        <ItemGrid />
        <Pagination />
        <ImageModal />
        <VideoModal />
      </div>
    );
  }
}

export default ViewerContainer;
