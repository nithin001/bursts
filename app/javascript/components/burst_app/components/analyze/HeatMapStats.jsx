import React from "react";
import moment from "moment";

import { withFauxDOM } from "react-faux-dom";
import createHeatMap from "./heatmap";

class HeatmapStats extends React.Component {
  componentDidMount() {
    const chart = this.props.connectFauxDOM("div", "chart");
    const months = this.props.connectFauxDOM("div", "months");
    const startDate = moment().subtract(1, "years").startOf("week").toDate();
    const endDate = moment().toDate();
    const dates = this.props.graph.reduce((acc, stat) => {
      acc[stat.date] = {...stat};
      return acc;
    }, {});
    const maxCount = Math.max(...this.props.graph.map((stat) => stat.time_spent));
    const data = {
      dates,
      maxCount,
      startDate,
    };
    createHeatMap(chart, months, data, startDate, endDate);
  }

  componentDidUpdate(){
    $('[data-toggle="tooltip"]').tooltip();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 justify-content-end align-items-end">
            <div className="d-flex flex-row-reverse" style={{ overflow: "hidden" }}>
              <div className="legend">{this.props.months}</div>
            </div>
            <div className="d-flex flex-row-reverse" style={{ overflow: "hidden" }}>
              <div className="chart">{this.props.chart}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeatmapStats.defaultProps = {
  chart: "loading",
};

export default withFauxDOM(HeatmapStats);
