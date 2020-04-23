import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@/assets/logo.png";
import "../static/style.css";

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="container home-logo">
        <div className="row">
          <div className="col">
            <div className="text-center">
              <img src={logo} width="300" alt="home_logo" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
