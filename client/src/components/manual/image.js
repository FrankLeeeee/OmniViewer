import React from "react";
import image_1 from "@public/manual_image/image_1.png";
import image_2 from "@public/manual_image/image_2.png";

export default class Image extends React.Component {
  render() {
    return (
      <div>
        <div className="tab-pane container" id="image" role="tabpanel">
          <div className="mb-5">
            <h1>Image</h1>
          </div>
          <div className="text-center">
            <img src={image_1} width="60%" />
            <figcaption>thumbnail</figcaption>
          </div>
          <div className="text-center">
            <img src={image_2} width="60% " />
            <figcaption>original image</figcaption>
          </div>
          <br />
          <p>
            对于支持格式的图片，网页会先显示缩略图。双击可以看大图，并且进行缩放以及下载。在看大图时点击图片关闭。
          </p>
        </div>
      </div>
    );
  }
}
