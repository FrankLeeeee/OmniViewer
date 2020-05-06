import React from "react";
import { connect } from "react-redux";
import Table from "./table";
import DoughnutChart from "./doughnutChart";

class StatsContainer extends React.Component {
  render() {
    return (
      <div className="fluid-container">
        <div className="row justify-content-center">
          <div className="col-6 text-center">
            <Table img_count={this.props.img_count} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mt-3 text-center">
            <div className="p-2 border">
              <DoughnutChart
                chart_title={"图片格式分布"}
                data={this.props.img_format}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 mt-3 text-center">
            <div className="p-2 border">
              <DoughnutChart
                chart_title={"图片类别分布"}
                data={this.props.img_cls}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const generate_dynamic_color = () => {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

const processRawList = (raw_list) => {
  var counts = {};

  for (var i = 0; i < raw_list.length; i++) {
    var data = raw_list[i];

    if (data != null && data != undefined) {
      data = data.toLowerCase();
    }
    counts[data] = counts[data] ? counts[data] + 1 : 1;
  }

  var dataset = [];
  var labels = [];
  var colors = [];

  Object.keys(counts).map(function (key, keyIndex) {
    labels.push(key);
    dataset.push(counts[key]);
    colors.push(generate_dynamic_color());
  });

  return {
    labels: labels,
    datasets: [
      {
        data: dataset,
        backgroundColor: colors,
      },
    ],
  };
};

const mapStateToProps = (state) => {
  return {
    img_count: state.stats.img_count,
    img_format: processRawList(state.stats.img_format),
    img_cls: processRawList(state.stats.img_cls),
  };
};

export default connect(mapStateToProps)(StatsContainer);
