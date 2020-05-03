import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import NavBar from "@src/components/common/navBar";
import SearchBarOnViewer from "@src/components/viewer/searchBarOnViewer";
import TabContainer from "@src/components/viewer/tabContainer";
import ErrorContainer from "@src/components/error/errorContainer";
import utils from "@src/utils";
import { connect } from "react-redux";
import apiWrapper from "@src/api_action_wrapper";
import { set_query } from "@src/redux/actions";
import urlListener from "@src/urlListener";

class ViewerPage extends React.Component {
  componentWillMount() {
    var query = utils.parseURL(this.props.location.search);
    this.props.dispatch(set_query(query.dir, query.page, query.keyword));

    apiWrapper
      .getToken()
      .then(apiWrapper.init_server)
      .catch((err) => console.log(err))
      .then(apiWrapper.filter_by_keyword)
      .then(apiWrapper.get_page_items);

    // listen for url change
    this.unlisten = this.props.history.listen((location, action) => {
      if (location.pathname == "/view") {
        urlListener(location.search);
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="fluid-container mt-3">
          <div>
            <SearchBarOnViewer />
          </div>
          <div className="m-3">
            {this.props.error_code == -1 && <TabContainer />}

            {this.props.error_code != -1 && (
              <ErrorContainer error_code={this.props.error_code} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error_code: state.error_code,
  };
};

export default connect(mapStateToProps)(ViewerPage);
