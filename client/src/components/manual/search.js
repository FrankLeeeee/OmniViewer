import React from "react";
import search_1 from "@public/manual_image/search_1.png";

export default class Search extends React.Component {
  render() {
    return (
      <div>
        <div className="mb-5">
          <h1>Search</h1>
        </div>
        <div className="text-center">
          <img src={search_1} width="60%" />
          <figcaption>search page</figcaption>
        </div>
        <br />
        <div>
          <p>
            用户界面设计为一个搜索页面，用户可以搜索访问任何有权限和路径和媒体文件。
          </p>
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">输入路径</th>
                <th scope="col">规则</th>
                <th scope="col">例子</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">文件夹</th>
                <td>必须是绝对路径</td>
                <td>/home/shenggui</td>
              </tr>
              <tr>
                <th scope="row">图片文件</th>
                <td>
                  必须是绝对路径，后缀名为"jpg", "jpeg", "png", "tiff", "gif",
                  "webp"
                </td>
                <td>/home/shenggui/sample.jpg</td>
              </tr>
              <tr>
                <th scope="row">视频文件</th>
                <td>必须是绝对路径，后缀名为“mp4”</td>
                <td>/home/shenggui/sample.mp4</td>
              </tr>
              <tr>
                <th scope="row">list文件</th>
                <td>
                  必须是绝对路径，后缀名为"list”， 文件里的每一个行为一个路径
                </td>
                <td>/home/shenggui/sample.list</td>
              </tr>
              <tr>
                <th scope="row">tsv文件</th>
                <td>必须是绝对路径，后缀名为"tsv"，通常用于分类问题</td>
                <td>/home/shenggui/sample.tsv</td>
              </tr>
              <tr>
                <th scope="row">detn文件</th>
                <td>
                  必须是绝对路径，后缀名为"detn",
                  文件里的每一行为一个json的detection标注文件路径
                </td>
                <td>/home/shenggui/sample.detn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
