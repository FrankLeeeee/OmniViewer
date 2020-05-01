import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from "react-router-dom";
import utils from "@src/utils";
import { connect } from "react-redux";

class KeywordFilter extends React.Component {
  state = {
    keyword: this.props.keyword,
  };

  onKeywordChange = (e) => {
    e.preventDefault();
    var keyword = e.target.value;

    if (keyword != undefined) {
      this.setState({
        keyword: keyword,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.keyword !== this.state.keyword) {
      this.setState({ keyword: nextProps.keyword });
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    var keyword = this.state.keyword;

    var keywordBase64 = utils.acsiiToBase64(keyword);
    var pathname = this.props.location.pathname;
    var search = utils.parseQueryString(this.props.location.search);
    search.keyword = keywordBase64;
    var search_string = "?" + utils.stringifyUrlQuery(search);
    this.props.history.push({ pathname: pathname, search: search_string });
  };

  render() {
    return (
      <form className="form-inline" onSubmit={this.onFormSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Enter keyword"
          value={this.state.keyword}
          onChange={this.onKeywordChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Filter
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  var keyword = state.query.keyword;

  if (keyword == undefined || keyword == "undefined") {
    keyword = "";
  }

  return { keyword: keyword };
};

export default withRouter(connect(mapStateToProps)(KeywordFilter));
