import React from "react";
import file_system_1 from "@public/manual_image/file_system_1.png";

export default class FileSystem extends React.Component {
  render() {
    return (
      <div>
        <div className="tab-pane container" id="file-system" role="tabpanel">
          <div className="mb-5">
            <h1>File System</h1>
          </div>
          <div className="text-center">
            <img src={file_system_1} width="60%" />
            <figcaption>search results</figcaption>
          </div>
          <br />
          <p>
            在输入了路径之后，网页会显示当前路径下的文件。如果需要在当前路径下过滤一下搜索结果，可以在右上角filter处输入关键词过滤。
            双击可以直接打开文件夹，图片，mp4格式的视频，list和tsv后缀的文件。
          </p>
        </div>
      </div>
    );
  }
}
