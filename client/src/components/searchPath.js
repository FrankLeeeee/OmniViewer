import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import utils from "../utils";
import { withRouter } from "react-router-dom";

class SearchPath extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path_split: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.path == undefined) {
      var path_split = [];
    } else {
      var path_split = nextProps.path.split("/");
      var path_split = path_split.filter((word) => word != "");
    }

    this.setState({
      path_split: path_split,
    });
  }

  render_path = () => {
    return this.state.path_split.map((item, idx) => {
      return (
        <span key={idx}>
          <span>/</span>
          <a type="btn" href="#" data-idx={idx} onClick={this.change_dir}>
            {item}
          </a>
        </span>
      );
    });
  };

  change_dir = (e) => {
    var idx = parseInt(e.target.getAttribute("data-idx")) + 1;
    var comps = this.state.path_split.slice(0, idx);
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
        {this.render_path()}
      </div>
    );
  }
}

export default withRouter(SearchPath);
