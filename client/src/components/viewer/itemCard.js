import React from "react";
import folder from "@public/assets/folder.png";
import file from "@public/assets/file.png";
import video from "@public/assets/video.png";
import picture from "@public/assets/picture.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import toast from "@src/toast/toast";
import utils from "@src/utils";
import apiWrapper from "@src/api_action_wrapper";

class ItemCard extends React.Component {
  get_img_src = (item) => {
    var extension = item.path.split(".").pop().toLowerCase();
    var img_src = null;

    switch (item.type) {
      case "dir":
        img_src = folder;
        break;

      case "other":
        img_src = file;
        break;

      case "video":
        img_src = video;
        break;

      case "image":
        if (item.image.status == 200) {
          img_src = `data:img/${exntension};base64, ${item.image.encodedImage}`;
        } else {
          img_src = picture;
          toast.error(
            `Error ${item.image.status}, message: ${item.image.message}, path: ${item.path}`
          );
        }
        break;

      case "detection":
        if (item.image.status == 200) {
          img_src = `data:img/${exntension};base64, ${item.image.encodedImage}`;
        } else {
          img_src = picture;
          toast.error(
            `Error ${item.image.status}, message: ${item.image.message}, path: ${item.path}`
          );
        }
        break;

      default:
        img_src = picture;
        break;
    }
    return img_src;
  };

  viewOriginalImage = (e) => {
    e.preventDefault();
    var img_path = e.target.getAttribute("data-path");
    var img_type = e.target.getAttribute("data-type");
    apiWrapper.load_original_image(img_path, img_type);
  };

  viewVideo = (e) => {
    e.preventDefault();
    var video_path = e.target.getAttribute("data-path");
    apiWrapper.load_video(video_path);
  };

  enterFolder = (e) => {
    e.preventDefault();
    var path = e.target.getAttribute("data-path");
    var path_base64 = utils.acsiiToBase64(path);
    this.props.history.push(`/view?dir=${path_base64}`);
  };

  onDoubleClickFuncMapping = (item_type) => {
    switch (item_type) {
      case "dir":
        return this.enterFolder;

      case "other":
        var extension = this.props.item.path.split(".").pop().toLowerCase();
        if (extension == "list" || extension == "tsv") {
          return this.enterFolder;
        } else {
          return null;
        }

      default:
        return null;
    }
  };

  onClickFuncMapping = (item_type) => {
    switch (item_type) {
      case "image":
        return this.viewOriginalImage;

      case "video":
        return this.viewVideo;

      case "detection":
        return this.viewOriginalImage;

      default:
        return null;
    }
  };

  render() {
    return (
      <div className="p-2 border text-center">
        <div>
          <img
            src={this.get_img_src(this.props.item)}
            className="object-grid-image image-fluid object-container"
            alt="item"
            data-path={this.props.item.path}
            data-type={this.props.item.type}
            onClick={this.onClickFuncMapping(this.props.item.type)}
            onDoubleClick={this.onDoubleClickFuncMapping(this.props.item.type)}
          />
        </div>
        <div className="object-name">
          <span>{this.props.item.basename}</span>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(ItemCard));
