import React from "react";

class Table extends React.Component {
  render() {
    return (
      <div className="text-center">
        <span>Image Count</span>
        <table className="p-2 border table table-dark text-center float-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Count</th>
              <td id="image-count">{this.props.img_count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
