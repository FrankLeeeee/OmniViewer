import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBarOnViewer from "../components/searchBarOnViewer";
import SearchPath from "../components/searchPath";
import utils from "../utils";
import queryString from "query-string";

export default class ViewerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_search: "",
      total_page: 0,
      mode: "",
    };
  }

  componentWillMount() {
    utils.getToken();
    this.init();
  }

  parseQuery = (url) => {
    const queryBase64 = queryString.parse(url).dir;

    if (queryBase64 == undefined) {
      this.props.history.push("/error?status=405");
    } else {
      return utils.base64ToAscii(queryBase64);
    }
  };

  init = () => {
    var query = this.parseQuery(this.props.location.search);

    fetch("http://127.0.0.1:8000/api/init/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        current_search: query,
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
            current_search: query,
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
          <SearchBarOnViewer />
          <div className="row">
            <div className="col float-left">
              <SearchPath path={this.state.current_search} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
