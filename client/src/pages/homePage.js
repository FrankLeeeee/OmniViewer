import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import NavBar from "../components/navBar";
import SearchBar from "../components/searchBar";
import CopyrightFooter from "../components/copyrightFooter";
import HomeLogo from "../components/homeLogo";
import UpdateModal from "../components/updateModal";
import utils from "../utils";
import { connect } from "react-redux";
import { set_token } from "../redux/actions";

class HomePage extends React.Component {
  componentDidMount() {
    utils.getToken((tk) => {
      this.props.dispatch(set_token(tk));
    });
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

export default connect()(HomePage);
