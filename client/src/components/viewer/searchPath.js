import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import utils from "@src/utils";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class SearchPath extends React.Component {
  renderPath = () => {
    return this.props.path_split.map((item, idx) => {
      return (
        <span key={idx}>
          <span>/</span>
          <a href="#" data-idx={idx} onClick={this.changeDir}>
            {item}
          </a>
        </span>
      );
    });
  };

  changeDir = (e) => {
    e.preventDefault();
    var idx = parseInt(e.target.getAttribute("data-idx")) + 1;
    var comps = this.props.path_split.slice(0, idx);
    var path = "/" + comps.join("/");
    var path_base64 = utils.acsiiToBase64(path);
    this.props.history.push({
      pathname: "/view",
      search: `?dir=${path_base64}`,
    });
  };

  render() {
    return (
      <div>
        <span>Current search : </span>
        {this.renderPath()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.query.current_path == undefined) {
    var path_split = [];
  } else {
    var path_split = state.query.current_path.split("/");
    var path_split = path_split.filter((word) => word != "");
  }
  return { path_split: path_split };
};

export default withRouter(connect(mapStateToProps)(SearchPath));
