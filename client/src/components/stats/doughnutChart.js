import React from "react";
import { Doughnut } from "react-chartjs-2";

class DoughnutChart extends React.Component {
  render() {
    return (
      <Doughnut
        data={this.props.data}
        options={{
          title: {
            display: true,
            text: this.props.chart_title,
          },
        }}
      />
    );
  }
}

export default DoughnutChart;
