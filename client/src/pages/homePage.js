import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBar from "../components/searchBar";
import CopyrightFooter from "../components/copyrightFooter";
import HomeLogo from "../components/homeLogo";
import UpdateModal from "../components/updateModal";
import api_caller from "../api_action_wrapper";

class HomePage extends React.Component {
  componentDidMount() {
    api_caller.getToken();
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

export default HomePage;
