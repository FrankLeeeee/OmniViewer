import React from "react";
import * as actions from "@src/redux/actions";
import loader from "@public/assets/loader.svg";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";

class VideoModel extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  hideModal = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.show_video_modal(false));
    this.props.dispatch(actions.set_video_url_in_modal(""));
    this.videoRef.current.pause();
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.video_url != "" && nextProps.video_url != undefined) {
      this.videoRef.current.load();
    }
  }

  render() {
    if (this.props.show_video) {
      var display = "block";
    } else {
      var display = "none";
    }
    return (
      <div className="speical-modal">
        <div
          className="modal text-center video-modal"
          style={{ display: `${display}` }}
        >
          <div className="text-white container">
            <div className="video-name"></div>
          </div>
          <span className="video-close" onClick={this.hideModal}>
            &times;
          </span>

          <div className="container">
            <video
              className="ml-auto mr-auto video-player"
              width="80%"
              controls
              preload="auto"
              poster="//vjs.zencdn.net/v/oceans.png"
              data-setup="{}"
              ref={this.videoRef}
            >
              <source
                src={this.props.video_url}
                type="video/mp4"
                className="video-source"
              ></source>
            </video>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    video_url: state.video_modal.video_url,
    show_video: state.video_modal.show_video,
  };
};

export default connect(mapStateToProps)(VideoModel);
