import React from "react";
import folder from "@/assets/folder.png";
import file from "@/assets/file.png";
import video from "@/assets/video.png";
import picture from "@/assets/picture.png";
import { connect } from "react-redux";

String.format = function () {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
    var reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
};

class ItemCard extends React.Component {
  get_img_src = (item) => {
    var extension = item.path.split(".").pop().toLowerCase();
    img_src = null;

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
          img_src = String.format(
            "data:img/{0};base64, {1}",
            extension,
            item.image.encodedImage
          );
        } else {
          img_src = picture;
          console.log("image failed to load");
          //   notify(
          //     `AJAX Error ${path_list[i]["image"]["status"]}`,
          //     `: ${path_list[i]["image"]["message"]} - ${path_list[i]["path"]}`,
          //     "danger"
          //   );
        }
        break;

      case "detection":
        if (item.image.status == 200) {
          img_src = String.format(
            "data:img/{0};base64, {1}",
            extension,
            item.image.encodedImage
          );
        } else {
          img_src = "../static/images/picture.png";
          console.log("image failed to load");
        }
        break;
    }
    return img_src;
  };

  viewOriginalImage = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div class="p-2 border text-center">
        <div>
          <img
            src={this.get_img_src(this.props.item)}
            className="object-grid-image image-fluid object-container"
            alt="${path_list[i].path}"
            data-type="${path_list[i].type}"
            onClick={this.viewOriginalImage}
          />
        </div>
        <div class="object-name">
          <span>{this.props.item.basename}</span>
        </div>
      </div>
    );
  }
}

export default connect()(ItemCard);
