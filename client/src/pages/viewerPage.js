import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBarOnViewer from "../components/searchBarOnViewer";
import SearchPath from "../components/searchPath";
import Pagination from "../components/pagination";
import ItemGrid from "../components/itemGrid";
import KeywordFilter from "../components/keywordFilter";
import utils from "../utils";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import apiWrapper from "../api_action_wrapper";
import { set_query } from "../redux/actions";
import urlListener from "../urlListener";

class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    // set state based on url
    var query = utils.parseURL(props.location.search);
    props.dispatch(set_query(query.dir, query.page, query.keyword));
  }

  componentWillMount() {
    apiWrapper.getToken();
    apiWrapper.init_server();
    apiWrapper.get_page_items();

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
                      <Row>
                        <Col>
                          <SearchPath />
                        </Col>
                      </Row>
                      <ItemGrid />
                      <Pagination />
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
