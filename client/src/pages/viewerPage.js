import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBarOnViewer from "../components/searchBarOnViewer";
import SearchPath from "../components/searchPath";
import KeywordFilter from "../components/keywordFilter";
import utils from "../utils";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { set_token, set_query } from "../redux/actions";

class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    // set state based on url
    var query = this.parseURL(props.location.search);
    props.dispatch(set_query(query.dir, query.page, query.keyword));
  }

  componentDidMount() {
    // init token and path info when first loaded
    utils.getToken((tk) => {
      this.props.dispatch(set_token(tk));
    });

    // this.init_server();
    this.unlisten = this.props.history.listen((location, action) => {
      var query = this.parseURL(location.search);

      // if visiting a new path
      var current_state = window.store.getState();
      if (query.dir != current_state.query.current_path) {
        this.props.dispatch(set_query(query.dir, 0, ""));
      }
    });
  }

  parseURL = (urlSearch) => {
    // get state from url

    const query = utils.parseQueryString(urlSearch);
    var res = {};

    if (query.dir == undefined) {
      res.dir = "";
    } else {
      res.dir = utils.base64ToAscii(query.dir);
    }

    if (query.keyword == undefined) {
      res.keyword = "";
    } else {
      res.keyword = utils.base64ToAscii(query.keyword);
    }

    if (query.page == undefined) {
      res.page = 1;
    } else {
      res.page = parseInt(query.page);
    }

    return res;
  };

  // init_server = () => {
  //   // set up path content on server side

  //   fetch("http://127.0.0.1:8000/api/init/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       current_search: this.state.current_search,
  //       token: sessionStorage.token,
  //     }),
  //     mode: "cors",
  //     cache: "no-cache",
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log(res);
  //       if (res.code != 200) {
  //         // this.props.history.push(`/error?status=${res.code}`);
  //       } else {
  //         this.setState({
  //           total_page: res.data.totol_page,
  //         });
  //       }
  //     });
  // };

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
