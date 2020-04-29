import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import utils from "../utils";

class Pagination extends React.Component {
  state = {
    jump_page: null,
  };

  create_pagination(current_page, total_page) {
    var lower_bound = Math.max(1, current_page - 2);
    var upper_bound = Math.min(total_page, current_page + 2);
    var pagination = [];
    for (var i = lower_bound; i >= lower_bound && i <= upper_bound; i++) {
      if (i == current_page) {
        var active = "active";
      } else {
        var active = "";
      }

      pagination.push(
        <li className={`page-item text-primary ${active}`}>
          <a className="page-link btn" onClick={this.change_page} data-page={i}>
            {i}
          </a>
        </li>
      );
    }

    return pagination;
  }

  go_to_start = (e) => {
    e.preventDefault();
    this.go_to_new_page(1);
  };

  go_to_end = (e) => {
    e.preventDefault();
    this.go_to_new_page(this.props.total_page);
  };

  change_page = (e) => {
    e.preventDefault();
    var page = parseInt(e.target.getAttribute("data-page"));
    this.go_to_new_page(page);
  };

  go_to_new_page = (page_number) => {
    var url = utils.parseQueryString(this.props.history.location.search);
    url.page = page_number;

    this.props.history.push({
      pathname: "/view",
      search: `?dir=${url.dir}&page=${url.page}&keyword=${url.keyword}`,
    });
  };

  handleInputChange = (event) => {
    this.setState({ jump_page: parseInt(event.target.value) });
  };

  jump_page = (e) => {
    e.preventDefault();
    var page = this.state.jump_page;

    if (
      page == "" ||
      page == null ||
      page == undefined ||
      page == "undefined" ||
      page < 0 ||
      page > this.props.total_page
    ) {
      console.log("Page number out of range");
    } else {
      this.go_to_new_page(page);
    }
  };

  render() {
    return (
      <div>
        {/* page footer */}
        <nav aria-label="page-footer" className="mt-5">
          <ul className="pagination justify-content-center" id="page-counter">
            <li className="page-item">
              <a
                className="page-link text-primary btn"
                onClick={this.go_to_start}
              >
                ...
              </a>
            </li>
            {this.create_pagination(
              this.props.current_page,
              this.props.total_page
            ).map((item, idx) => (
              <div key={idx}>{item}</div>
            ))}
            <li className="page-item">
              <a
                className="page-link text-primary btn"
                onClick={this.go_to_end}
              >
                ...
              </a>
            </li>
          </ul>
        </nav>

        {/* page jump */}
        <div className="container w-400">
          <form className="form-inline text-center" onSubmit={this.jump_page}>
            <div className="input-group w-100">
              <input
                type="number"
                className="form-control"
                placeholder={`Enter a page number (total:${this.props.total_page})`}
                onChange={this.handleInputChange}
              />
              <button className="btn btn-outline-primary ml-2" type="submit">
                Go
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    total_page: state.total_page,
    current_page: state.query.current_page,
  };
};

export default withRouter(connect(mapStateToProps)(Pagination));
