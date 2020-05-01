import React from "react";
import ItemCard from "./itemCard";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ItemGrid extends React.Component {
  render() {
    return (
      <div className="fluid-container image-grid mt-4" id="image-grid">
        {this.props.item_initialized_on_server == false && (
          <div className="container text-center" id="grid-spinner">
            <div className="spinner-border float-center" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {}
        <div className="row" id="image-row">
          {this.props.item_initialized_on_server &&
            this.props.page_items.map((item, idx) => {
              return (
                <div
                  className="col-lg-2 col-md-3 col-sm-4 mb-2 text-center"
                  key={idx}
                >
                  <ItemCard item={item} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

// To-do
// complete load images
const mapStateToProps = (state) => {
  return {
    page_items: state.page_items,
    item_initialized_on_server: state.item_initialized_on_server,
  };
};

export default withRouter(connect(mapStateToProps)(ItemGrid));
