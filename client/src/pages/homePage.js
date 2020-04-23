import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBar from "../components/searchBar";
import CopyrightFooter from "../components/copyrightFooter";
import HomeLogo from "../components/homeLogo";
import UpdateModal from "../components/updateModal";
import utils from "../utils";

export default class HomePage extends React.Component {
  componentWillMount() {
    utils.getToken();
  }

  render() {
    return (
      <div>
        <NavBar />
        <HomeLogo />
        <SearchBar />
        <CopyrightFooter />
        <UpdateModal />
      </div>
    );
  }
}
