import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import logo from "@/assets/logo.png";

class SearchBarOnViewer extends React.Component {
  state = {
    query: "",
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    var path = new Buffer(this.state.query).toString("base64");
    var url = `/view?dir=${path}#`;
    this.props.history.push(url);
  };

  onInputChange = (e) => {
    var query = e.target.value;
    this.setState({
      query: query,
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col ml-3">
          <img src={logo} width="48" alt="home_logo" className="float-left" />
          <form onSubmit={this.onFormSubmit} className="float-left ml-2">
            <div className="p-1 bg-white rounded rounded-pill border border-primary">
              <div className="input-group w-400">
                <input
                  required
                  type="search"
                  placeholder="Enter your search input"
                  aria-describedby="searchBtn"
                  className="rounded-pill form-control border-0 searchBar"
                  name="search_query"
                  id="searchContent"
                  onChange={this.onInputChange}
                />
                <div className="input-group-append">
                  <button
                    id="searchBtn"
                    type="submit"
                    className="btn btn-link text-primary"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBarOnViewer);
