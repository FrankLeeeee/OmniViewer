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

export default class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    var query = this.getDirFromUrlSearch(props.location.search);

    this.state = {
      current_search: query,
      total_page: 0,
      current_page: 1,
      mode: "",
    };
  }

  componentWillMount() {
    utils.getToken();
    this.init();
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      var query = this.getDirFromUrlSearch(location.search);
      console.log(query);
      this.setState({
        current_search: query,
      });
    });
  }

  getDirFromUrlSearch = (urlSearch) => {
    const queryBase64 = utils.parseQueryString(urlSearch).dir;

    if (queryBase64 == undefined) {
      this.props.history.push("/error?status=405");
    } else {
      return utils.base64ToAscii(queryBase64);
    }
  };

  init = () => {
    fetch("http://127.0.0.1:8000/api/init/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_search: this.state.current_search,
        token: sessionStorage.token,
      }),
      mode: "cors",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.code != 200) {
          history.push(`/error?status=${res.code}`);
        } else {
          this.setState({
            total_page: res.data.totol_page,
            mode: res.data.mode,
          });
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
                          <SearchPath path={this.state.current_search} />
                          <KeywordFilter />
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
