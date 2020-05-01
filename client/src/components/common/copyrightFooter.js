import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import githubLogo from "@public/assets/github-logo.png";

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="text-center mt-5">
        <p>&copy; Li Shenggui</p>
        <a href="https://github.com/FrankLeeeee/OmniViewer">
          <img className="mb-5" src={githubLogo} height="20px" />
        </a>
      </div>
    );
  }
}
