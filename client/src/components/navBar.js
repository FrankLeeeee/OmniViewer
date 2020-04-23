import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import brand from "@/assets/brand.png";

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img
            src={brand}
            height="30"
            className="d-inline-block align-top mr-2"
            alt="Logo"
          />
          OmniViewer
        </a>
      </nav>
    );
  }
}
