import React from "react";
import list_1 from "@public/manual_image/list_1.png";

export default class ListAndTsv extends React.Component {
  render() {
    return (
      <div>
        <div className="tab-pane container " id="list-tsv" role="tabpanel ">
          <div className="mb-5 ">
            <h1>List & TSV</h1>
          </div>
          <div className="text-center ">
            <img src={list_1} width="60% " />
            <figcaption>list & tsv</figcaption>
          </div>
          <br />
          <p>
            文件为一个后缀为list或者tsv的文件，文件里的每一行为一张图片或者视频的路径，如果为tsv文件，可以点击stats这个tab来显示统计数据。
          </p>
        </div>
      </div>
    );
  }
}
