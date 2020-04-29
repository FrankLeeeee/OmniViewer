import React from "react";

class ItemGrid extends React.Component {
  render() {
    return (
      <div class="fluid-container image-grid mt-4" id="image-grid">
        <div class="container text-center" id="grid-spinner">
          <div class="spinner-border float-center" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div class="row" id="image-row"></div>
      </div>
    );
  }
}

// To-do
// complete load images
