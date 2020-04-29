import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBarOnViewer from "../components/searchBarOnViewer";
import SearchPath from "../components/searchPath";
import Pagination from "../components/pagination";
import KeywordFilter from "../components/keywordFilter";
import utils from "../utils";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import {
  set_token,
  set_query,
  set_total_page,
  set_current_page,
} from "../redux/actions";

class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    // set state based on url
    var query = utils.parseURL(props.location.search);
    props.dispatch(set_query(query.dir, query.page, query.keyword));
  }

  componentWillMount() {
    // init token and path info when first loaded
    utils.getToken((tk) => {
      this.props.dispatch(set_token(tk));
    });

    this.init_server();

    this.unlisten = this.props.history.listen((location, action) => {
      var query = utils.parseURL(location.search);
      var current_state = window.store.getState();

      // if visiting a new path
      if (query.dir != current_state.query.current_path) {
        this.props.dispatch(set_query(query.dir, 1, ""));
        this.init_server();
      } else if (query.page != current_state.query.current_page) {
        this.props.dispatch(set_current_page(query.page));
      }
    });
  }

  init_server = () => {
    // set up path content on server side
    var store = window.store.getState();

    fetch("http://127.0.0.1:8000/api/init/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_search: store.query.current_path,
        token: store.token,
      }),
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code != 200) {
          alert(res.code);
          // this.props.history.push(`/error?status=${res.code}`);
        } else {
          this.props.dispatch(set_total_page(res.data.total_page));
        }
      });
  };

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
                          <Pagination />
                        </Col>
                      </Row>
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
