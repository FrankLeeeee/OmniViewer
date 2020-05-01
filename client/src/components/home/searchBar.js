import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import utils from "@src/utils";

class SearchBar extends React.Component {
  state = {
    query: "",
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    var path = utils.acsiiToBase64(this.state.query);
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
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="p-5">
              <form onSubmit={this.onFormSubmit}>
                <div className="p-1 rounded rounded-pill border border-primary shadow-sm">
                  <div className="input-group">
                    <input
                      required
                      type="search"
                      placeholder="Enter your search input"
                      aria-describedby="searchBtn"
                      className="rounded-pill form-control border-0 searchBar"
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
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
