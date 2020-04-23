import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBarOnViewer from "../components/searchBarOnViewer";
import utils from "../utils";
import queryString from "query-string";

export default class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    const queryBase64 = queryString.parse(location.search).dir;

    if (queryBase64 == undefined) {
      this.props.history.push("/error?status=405");
    } else {
      var query = new Buffer(queryBase64, "base64").toString("ascii");
      this.state = {
        query: query,
      };
    }
  }

  componentWillMount() {
    utils.getToken();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="fluid-container mt-3">
          <SearchBarOnViewer />
        </div>
      </div>
    );
  }
}
