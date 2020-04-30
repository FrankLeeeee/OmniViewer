import React, { Component } from "react";
import getIcon from "./icons";

class Notice extends Component {
  render() {
    const { type, content } = this.props;
    return (
      <div className={`toast-notice`}>
        {getIcon(type)}
        <span>{content}</span>
      </div>
    );
  }
}

export default Notice;
