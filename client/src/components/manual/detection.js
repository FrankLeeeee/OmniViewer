import React from "react";
import detection_1 from "@public/manual_image/detection_1.png";

export default class FileSystem extends React.Component {
  render() {
    return (
      <div>
        <div className="tab-pane container " id="detection" role="tabpanel ">
          <div className="mb-5 ">
            <h1>Detection</h1>
          </div>
          <div className="text-center ">
            <img src={detection_1} width="30% " />
            <figcaption>detection json</figcaption>
          </div>
          <br />
          <p>
            文件为一个后缀必须为detn的list文件，文件里的每一行为一个json文件的路径，json文件必须遵循上图的格式。
          </p>
        </div>
      </div>
    );
  }
}
