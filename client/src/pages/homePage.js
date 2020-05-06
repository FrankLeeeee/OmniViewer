import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import NavBar from "../components/common/navBar";
import SearchBar from "../components/home/searchBar";
import CopyrightFooter from "../components/common/copyrightFooter";
import HomeLogo from "../components/home/homeLogo";
import UpdateModal from "../components/home/updateModal";
import apiWrapper from "../api_action_wrapper";

class HomePage extends React.Component {
  componentDidMount() {
    apiWrapper.get_token();
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
