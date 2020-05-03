import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import errorImg from "@public/assets/error.png";

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

export default class ErrorContainer extends React.Component {
  render() {
    return (
      <div className="container home-logo">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <img src={errorImg} width="300" alt="home_logo" />
            </div>
            <div className="container text-center mt-4">
              <span>
                Error {this.props.error_code} :{" "}
                {status_mapping[this.props.error_code]}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
