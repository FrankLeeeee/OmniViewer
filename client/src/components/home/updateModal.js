import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import toast from "@src/toast/toast";

export default class UpdateModal extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false,
      version: "",
      new_features: [],
      optimization: [],
      bug_fix: [],
      showAgain: true,
    };
  }

  componentWillMount() {
    fetch("http://wxrg0340:8000/api/update", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 200) {
        toast.error("获取更新信息失败。");
      } else {
        res.json().then((res) => {
          var showAgain = localStorage.showAgain;
          var version = localStorage.version;

          if (
            version != res.version ||
            showAgain == undefined ||
            showAgain == "true"
          ) {
            this.setState({
              show: true,
              version: res.version,
              new_features: res.update_log.new_features,
              optimization: res.update_log.optimization,
              bug_fix: res.update_log.bug_fix,
            });
            localStorage.setItem("version", res.version);
          }
        });
      }
    });
  }

  hide = (e) => {
    e.preventDefault();

    this.setState({
      show: false,
    });

    localStorage.setItem("showAgain", this.state.showAgain);
  };

  handleCheckbox = (e) => {
    // e.preventDefault();
    var showAgain = !e.target.checked;
    this.setState({
      showAgain: showAgain,
    });
  };

  render_lines = (lst) => {
    return lst.map((item, idx) => {
      return (
        <span key={idx}>
          {item}
          <br />
        </span>
      );
    });
  };

  render() {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            更新-Version {this.state.version}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          新增：
          <br />
          {this.render_lines(this.state.new_features)}
          <br />
          优化：
          <br />
          {this.render_lines(this.state.optimization)}
          <br />
          修复：
          <br />
          {this.render_lines(this.state.bug_fix)}
        </Modal.Body>
        <Modal.Footer>
          <label className="checkbox-inline ml-3">
            <input
              type="checkbox"
              value="false"
              className="mr-2"
              id="show_again_checkbox"
              onChange={this.handleCheckbox}
            />
            不再显示
          </label>
          <Button onClick={this.hide}>关闭</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
