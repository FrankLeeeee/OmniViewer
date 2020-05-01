import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import NavBar from "@src/components/common/navBar";
import SearchBarOnViewer from "@src/components/viewer/searchBarOnViewer";
import ViewerContainer from "@src/components/viewer/viewerContainer";
import utils from "@src/utils";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import apiWrapper from "@src/api_action_wrapper";
import { set_query } from "@src/redux/actions";
import urlListener from "@src/urlListener";

class ViewerPage extends React.Component {
  componentWillMount() {
    var query = utils.parseURL(this.props.location.search);
    this.props.dispatch(set_query(query.dir, query.page, query.keyword));

    apiWrapper
      .getToken()
      .then(apiWrapper.init_server)
      .then(apiWrapper.filter_by_keyword)
      .then(apiWrapper.get_page_items);

    // listen for url change
    this.unlisten = this.props.history.listen((location, action) => {
      urlListener(location.search);
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="fluid-container mt-3">
          <div>
            <SearchBarOnViewer />
          </div>
          <div className="m-3">
            <Tab.Container defaultActiveKey="viewer">
              <Row>
                <Col>
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link eventKey="viewer">浏览</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="stats">统计</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/">用户手册</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <Tab.Content>
                    <Tab.Pane eventKey="viewer">
                      <ViewerContainer />
                    </Tab.Pane>
                    <Tab.Pane eventKey="stats">stats</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ViewerPage);
