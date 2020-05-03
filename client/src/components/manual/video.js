import React from "react";
import video_1 from "@public/manual_image/video_1.png";
import video_2 from "@public/manual_image/video_2.png";

export default class Detection extends React.Component {
  render() {
    return (
      <div>
        <div className="tab-pane container " id="video" role="tabpanel ">
          <div className="mb-5 ">
            <h1>Video</h1>
          </div>
          <div className="text-center ">
            <img src={video_1} width="60% " />
            <figcaption>thumbnail</figcaption>
          </div>
          <div className="text-center ">
            <img src={video_2} width="60% " />
            <figcaption>watch video</figcaption>
          </div>
          <br />
          <p>
            MP4格式的视频文件有一个统一的图标，双击可以进行播放视频。视频以数据流的形式播放，占用带宽低。点击右上角的X关闭视频。
          </p>
        </div>
      </div>
    );
  }
}
