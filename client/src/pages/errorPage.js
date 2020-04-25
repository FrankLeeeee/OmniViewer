import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBarOnViewer from "../components/searchBarOnViewer";
import queryString from "query-string";
import errorImg from "@/assets/error.png";

export default class ViewerPage extends React.Component {
  constructor(props) {
    super(props);

    var status_mapping = {
      400: "Bad request",
      401: "Unauthrozed",
      403: "Forbidden",
      404: "Not found",
      405: "Method not allowed",
      406: "Not acceptable",
      500: "Internal Server Error",
      501: "Not implemented",
      502: "Bad gateway",
      503: "Service unavailable",
      504: "Gateway timeout",
      505: "HTTP Version Not Supported",
    };

    const queryErrorCode = queryString.parse(location.search).status;

    if (queryErrorCode == undefined) {
      var errorCode = -1;
    } else {
      var errorCode = queryErrorCode;
    }

    this.state = {
      errorCode: errorCode,
      status_mapping: status_mapping,
    };
  }

  render() {
    if (this.state.status_mapping.hasOwnProperty(this.state.errorCode)) {
      var msg = this.state.status_mapping[this.state.errorCode];
    } else {
      var msg = "Unknown error";
    }

    return (
      <div>
        <NavBar />
        <div className="fluid-container mt-3">
          <SearchBarOnViewer />
          <div className="container home-logo">
            <div className="row">
              <div className="col">
                <div className="text-center">
                  <img src={errorImg} width="300" alt="home_logo" />
                </div>
                <div className="container text-center mt-4">
                  <span>
                    Error {this.state.errorCode} : {msg}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
