import React from "react";
import * as actions from "@src/redux/actions";
import apiWrapper from "@src/api_action_wrapper";
import loader from "@public/assets/loader.svg";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "@static/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchMinus,
  faSearchPlus,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";

class ImageModal extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  hideModal = (e) => {
    e.preventDefault();
    this.props.dispatch(actions.show_image_modal(false));
    this.props.dispatch(actions.set_image_path_in_modal("image path"));
    this.props.dispatch(actions.set_image_content_in_modal(loader, -1, -1));
  };

  zoom_out = (e) => {
    e.preventDefault();
    var width = parseInt(this.imgRef.current.width);
    this.imgRef.current.style.width = `${width / 1.5}px`;
  };

  zoom_in = (e) => {
    e.preventDefault();
    var width = parseInt(this.imgRef.current.width);
    this.imgRef.current.style.width = `${width * 1.5}px`;
  };

  download = (e) => {
    apiWrapper.download_file(this.props.img_path);
  };

  render() {
    if (this.props.show_image) {
      var display = "block";
    } else {
      var display = "none";
    }
    return (
      <div className="speical-modal">
        <div className="modal text-center" style={{ display: `${display}` }}>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={this.zoom_out}
            >
              <FontAwesomeIcon icon={faSearchMinus} />
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={this.zoom_in}
            >
              <FontAwesomeIcon icon={faSearchPlus} />
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary m-2"
              onClick={this.download}
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>

          <div className="text-white container large-image-name">
            {this.props.img_path}
            <div className="mt-1 mb-2 large-image-size">
              {this.props.img_width} x {this.props.img_height}
            </div>
          </div>

          <div onClick={this.hideModal}>
            <img
              className="modal-content mb-3"
              ref={this.imgRef}
              src={this.props.img_encoded}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    show_image: state.image_modal.show_image,
    img_path: state.image_modal.img_path,
    img_encoded: state.image_modal.img_encoded,
    img_width: state.image_modal.img_width,
    img_height: state.image_modal.img_height,
  };
};

export default connect(mapStateToProps)(ImageModal);
